import os
import boto3
import datetime
from decimal import Decimal


class DynamoDBInterface:
    def write_cost_to_dynamo(self, original_filename, total_cost, open_ai_prompt_cost,
                              open_ai_completion_cost, textract_cost, comprehend_medical_cost):
        try:
            # Update the dynamodb table with the file name and set hasReport to true
            print('writing to dynamo')

            # setting the float values to Decimal for Dynamo
            total_cost = Decimal(f"{total_cost:.6f}")
            open_ai_prompt_cost = Decimal(f"{open_ai_prompt_cost:.6f}")
            open_ai_completion_cost = Decimal(f"{open_ai_completion_cost:.6f}")
            textract_cost = Decimal(f"{textract_cost:.6f}")
            comprehend_medical_cost = Decimal(f"{comprehend_medical_cost:.6f}")
            print('final price: ', total_cost)
            # getting table name
            table = boto3.resource('dynamodb').Table(os.environ['API_MRI_REPORTCOSTTABLE_NAME'])
            # query on id using filename
            response = table.put_item(Item={
                'documentKey': original_filename.split('/')[-1],
                'OpenAiPromptCost': open_ai_prompt_cost,
                'OpenAiCompletionCost': open_ai_completion_cost,
                'AwsTextractCost': textract_cost,
                'AwsComprehendMedicalCost': comprehend_medical_cost,
                'TotalCost': total_cost,
                'createdAt': datetime.datetime.now().strftime('%Y-%m-%d %X')
            })

            print(response)

        except Exception as e:
            raise ValueError(f"Error writing to dynamo: {e}")

    def update_user_data(self, original_filename, s3_filename, status, invoice_document_path):
        try:
            # Update the dynamodb table with the file name and set hasReport to true
            print('writing to dynamo')

            table = boto3.resource('dynamodb').Table(os.environ['API_MRI_CLAIMAINTTABLE_NAME'])
            # query on id using filename
            response = table.query(
                KeyConditionExpression='documentKey = :documentKey',
                ExpressionAttributeValues={':documentKey': original_filename.split('/')[-1]},
                ScanIndexForward=False,
                Limit=1
            )

            if response['Items']:
                print('response:', response['Items'])
                last_item = response['Items'][0]
                documentKey = last_item['documentKey']
                createdAt = last_item['createdAt']
                
                if invoice_document_path:
                    invoice_document_path = os.path.join(invoice_document_path.split('/')[-2], invoice_document_path.split('/')[-1])

                update_response = table.update_item(
                    Key={
                        'documentKey': documentKey,
                        'createdAt': createdAt
                    },
                    UpdateExpression='SET #reportKey = :reportFileName, #reportStatus = :reportStatus, #invoiceDocumentPath = :invoiceDocumentPath, #processingType = :processingType',
                    ExpressionAttributeNames={'#reportKey': 'reportKey', '#reportStatus': 'reportStatus', '#invoiceDocumentPath': 'invoiceDocumentPath', '#processingType': 'processingType'},
                    ExpressionAttributeValues={
                        ':reportFileName': os.path.join(s3_filename.split('/')[-2], s3_filename.split('/')[-1]),
                        ':invoiceDocumentPath': invoice_document_path,
                        ':reportStatus': status,
                        ':processingType': 'LUMBAR'},
                    ReturnValues='UPDATED_NEW'
                )
                
                print("Update Item succeeded:", update_response)
            else:
                print("No items found with the specified hash and sort key combination.")

        except Exception as e:
            raise ValueError(f"Error writing to dynamo: {e}")
    
    def get_stripe_customer_id(self, email):
        try:
            # Update the dynamodb table with the file name and set hasReport to true
            print('reading data from dynamo for stripe')
            print(email)
            table = boto3.resource('dynamodb').Table(os.environ['STRIPE_CUSTOMER_TABLE_NAME'])
            # query on id using filename
            response = table.query(
                KeyConditionExpression='email = :email',
                ExpressionAttributeValues={':email': email},
                ScanIndexForward=False,
                Limit=1
            )

            if response['Items']:
                print('response:', response['Items'])
                last_item = response['Items'][0]

                return last_item['customerId']

        except Exception as e:
            raise ValueError(f"Error writing to dynamo: {e}")


def get_details_for_invoice(original_filename):
    try:
        # Update the dynamodb table with the file name and set hasReport to true
        print('reading data from dynamo for invoice')

        table = boto3.resource('dynamodb').Table(os.environ['API_MRI_CLAIMAINTTABLE_NAME'])
        # query on id using filename
        response = table.query(
            KeyConditionExpression='documentKey = :documentKey',
            ExpressionAttributeValues={':documentKey': original_filename.split('/')[-1]},
            ScanIndexForward=False,
            Limit=1
        )

        if response['Items']:
            print('response:', response['Items'])
            last_item = response['Items'][0]
        
            return last_item

    except Exception as e:
        raise ValueError(f"Error writing to dynamo: {e}")
