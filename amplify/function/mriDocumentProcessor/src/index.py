import os
import io
import json
import boto3
import urllib
import traceback
import pdf2image
import datetime
from openai import OpenAI
from gpt_instructions.mri_instructions import get_entire_instructions
from pricing_tracker import pricing_tracker
from data_interface import dynamo_db_lib, s3_lib, cognito_interface
from invoice_generator import invoice_generator
from stripe_interface import stripe_lib
from botocore.exceptions import ClientError

s3 = boto3.client("s3", region_name="us-east-2")
textract = boto3.client("textract", region_name="us-east-2")
comprehendmedical = boto3.client("comprehendmedical", region_name="us-east-2")
client = OpenAI(api_key=os.environ['OPENAI_KEY'])

def handler(event, context):
    try:
        s3_interface = s3_lib.S3Interface()
        dynamo_db_interface = dynamo_db_lib.DynamoDBInterface()

        print('received event:', event)
        http_method = event['httpMethod']

        if http_method == 'POST':
            event_body = json.loads(event["body"])
            # bucket = event["Records"][0]["s3"]["bucket"]["name"]
            # key = event["Records"][0]["s3"]["object"]["key"]
            bucket = event_body["bucket"]
            key = event_body["key"]
            # getting pdf file
            key = urllib.parse.unquote_plus(key)
            pdf_bytes = s3_interface.download_pdf_from_s3(bucket, key)
            print('file downloaded')

            if pdf_bytes:
                try:
                    mri_processor = MriProcessor()
                    print('analyzing document')
                    mri_summary = mri_processor.generate_mri_summary(pdf_bytes)

                    print('uploading db to s3')
                    s3_filepath = s3_interface.upload_mri_report_to_s3(bucket, key, mri_summary)

                    # calculating cost of report
                    total_cost = mri_processor.pricing_tracker_instance.get_total_cost_in_dollars()
                    open_ai_prompt_cost = mri_processor.pricing_tracker_instance.get_open_ai_prompt_cost_in_dollars()
                    open_ai_completion_cost = mri_processor.pricing_tracker_instance.get_open_ai_completion_cost_in_dollars()
                    textract_cost = mri_processor.pricing_tracker_instance.get_textract_cost_in_dollars()
                    comprehend_medical_cost = mri_processor.pricing_tracker_instance.get_comprehend_medical_cost_in_dollars()

                    dynamo_db_interface.write_cost_to_dynamo(
                        original_filename=key, 
                        total_cost=total_cost, 
                        open_ai_prompt_cost=open_ai_prompt_cost,
                        open_ai_completion_cost=open_ai_completion_cost,
                        textract_cost=textract_cost,
                        comprehend_medical_cost=comprehend_medical_cost
                        )
                    print('updated cost tracker table')

                    # generate invoice
                    try:
                        print('creating invoice')
                        invoice_details = get_invoice_details(
                            invoice_cost=25.00, 
                            filename=key
                        )
                        html_invoice = invoice_generator.generate_invoice(data_to_update=invoice_details)
                        invoice_local_path = os.path.join('/tmp', f'invoice_{key.split("/")[-1]}')
                        invoice_generator.write_html_to_pdf(html_invoice, invoice_local_path)
                        invoice_s3_filepath = s3_interface.upload_invoice_file_to_s3(bucket, key, invoice_local_path)
                        print(f"UPLOADED TO {invoice_s3_filepath}")
                        print('invoice generation done')
                    except Exception as e:
                        print(str(e))
                        invoice_s3_filepath = None

                    # update stripe
                    stripe_customer_id = dynamo_db_interface.get_stripe_customer_id(
                        invoice_details['billing_email']
                    )
                    print(f'updating stripe for {stripe_customer_id}')
                    
                    # TODO: error handling for stripe
                    stripe_lib.update_stripe_usage(
                        1, stripe_customer_id, idempotency_key=key+"_mri"
                    )

                    dynamo_db_interface.update_user_data(
                        key, s3_filepath, 'COMPLETE', invoice_s3_filepath
                    )
                    print('dynamo updated')
                    # write_to_dynamo(key, s3_filepath, 'COMPLETE')

                except Exception as e:
                    print(f"Error: {traceback.format_exc()}")
                    dynamo_db_interface.update_user_data(key, None, 'ERROR', None)
                    raise ValueError(f"Error analyzing document: {e}")

            else:
                dynamo_db_interface.update_user_data(key, None, 'INVALID_DOCUMENT', None)
                raise ValueError("pdf_bytes is None. Could not download pdf from s3")

            return {
                "headers": {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                "statusCode": 200,
                "body": json.dumps("PDF analyzed and codes saved to S3."),
            }
        elif http_method == 'GET':
            # search for file in s3
            key = event["queryStringParameters"]["key"]
            bucket = event["queryStringParameters"]["bucket"]
            key = urllib.parse.unquote_plus(key)

            upload_path_list = key.split('/') # protected/<User private directory>

            filename = upload_path_list[-1].split('.')[0] + '.txt'
            final_filepath_list = upload_path_list[:-1] + ['report', filename]
            final_filepath = os.path.join(*final_filepath_list)

            try:
                pdf_bytes = s3_interface.download_pdf_from_s3(bucket, final_filepath)

                return {
                    "headers": {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                    },
                    "statusCode": 200,
                    "body": json.dumps({
                        "status": "SUCCESS",
                        "bucket": bucket,
                        "key": final_filepath
                    }),
                }
            except ValueError:
                return {
                    "headers": {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                    },
                    "statusCode": 404,
                    "body": json.dumps({
                        "status": "IN_PROGRESS",
                    }),
                }
            
    except Exception as e:
        print(f"Error: {traceback.format_exc()}")
        dynamo_db_interface.update_user_data(key, None, 'ERROR', None)
        return {
            "headers": {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
            "statusCode": 500,
            "body": json.dumps(f"Error: {e}"),
        }

def get_invoice_details(invoice_cost, filename):
    invoice_datetime = datetime.datetime.now()

    details_from_dynamo = dynamo_db_lib.get_details_for_invoice(filename)
    # print(details_from_dynamo)

    # getting user from cognito
    cognito_sub = details_from_dynamo['owner'].split('::')[-1]
    cog_interface = cognito_interface.CognitoInterface(cognito_sub)

    invoice_details = {
        "invoice_date": invoice_datetime.strftime('%m-%d-%Y'),
        # "patient_name": "Test Name", # from phi?
        "file_name": details_from_dynamo['name'], # from request/dynamo
        "mri_cost": f"${invoice_cost:.2f}",  # calculated internally
        "upload_time": details_from_dynamo['createdAt'],  # from dynamo
        "total_cost": f"${invoice_cost:.2f}", #  calculated internally,
        "billing_name": cog_interface.get_name_of_user(), # 
    #     "organization_name": 
        "billing_email": cog_interface.get_email_of_user() # dynamo/cognito
    #     "billing_address": 
    }
    return invoice_details

class MriProcessor:
    def __init__(self) -> None:
        self.pricing_tracker_instance = pricing_tracker.PricingTracker()
        self.pii_entities = None

    def generate_mri_summary(self, mri_filebytes):
        textract_ouput = self.analyze_document(mri_filebytes)
        all_mri_text = ' '.join(page_dict['page_text'] for page_dict in textract_ouput)
        clean_output, pii_entities = self.remove_pii(all_mri_text)
        # print(pii_entities)
        self.pii_entities = pii_entities
        self.pricing_tracker_instance.update_comprehend_units(all_mri_text)

        return self._generate_mri_summary(clean_output)

    def _generate_mri_summary(self, mri_text):
        entire_instructions = get_entire_instructions(mri_text)
        gpt_response = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {
                "role": "user",
                "content": entire_instructions
                }
            ],
            temperature=0,
            seed=42
        )
        # cost update
        self.pricing_tracker_instance.update_open_ai_tokens(gpt_response)

        return gpt_response.choices[0].message.content

    def analyze_document(self, document_bytes):
        # Convert PDF bytes to images
        print('converting to images')
        pdf_images = pdf2image.convert_from_bytes(document_bytes)

        data = []

        # Analyze each page image
        page_num = 0
        for page in pdf_images:
            print("Page " + str(page_num))
            page_num = page_num + 1
            with io.BytesIO() as output:
                page.save(output, format="JPEG")
                image_bytes = output.getvalue()

            request = {
                "Document": {"Bytes": image_bytes},
                "FeatureTypes": ["TABLES", "FORMS"],
            }
            print('sending request to textract')
            try:
                response = textract.analyze_document(**request)
            except Exception as e:
                raise ValueError(f"Error analyzing document: {e}")

            blocks = response["Blocks"]
            print('sending cleaning requests')

            page_text = ' '.join(block['Text'] for block in blocks if block['BlockType'] == 'LINE')
            # update characters 
            data.append(
                {
                    'page_text': page_text,
                    'page_num': page_num
                }
            )

        self.pricing_tracker_instance.update_number_of_pages(pdf_images)

        return data

    def remove_pii(self, text):
        pii_entities = comprehendmedical.detect_phi(
            Text=text
        )
        if 'Entities' in pii_entities:
            for entity in pii_entities['Entities']:
                text = text.replace(entity['Text'], '')

        return text, pii_entities
