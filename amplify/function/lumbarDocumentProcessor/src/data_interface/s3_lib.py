import os
import boto3
from datetime import datetime

s3 = boto3.client("s3", region_name="us-east-2")

class S3Interface:
    def _write_to_txt_file(self, text_to_write, input_filename):
            save_path = '/tmp/output'
            nowstr = datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
            save_path = save_path + "-" + nowstr + ".txt"
            with open(save_path, 'w+') as fp:
                fp.write(text_to_write)
            return save_path

    def upload_mri_report_to_s3(self, bucket_name, key, final_output):
        try:
            # protected/username/report/{fileName}-report
            filename = self._write_to_txt_file(final_output, os.path.join('/tmp', ))

            nowstr = datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
            upload_path_list = key.split('/')[0:2] # protected/<User private directory>
            upload_filename = key.split('/')[-1].split('.')[0]
            upload_path_list.extend(['report', upload_filename+'.txt'])
            final_filepath = os.path.join(*upload_path_list)
            print(filename)
            print(final_filepath)

            # Upload the DB file to S3
            s3.upload_file(filename, bucket_name, final_filepath)

            return final_filepath

        except Exception as e:
                raise ValueError(f"Error uploading db to s3: {e}")

    def download_pdf_from_s3(self, bucket_name, key):
        try:
            pdf_data = s3.get_object(Bucket=bucket_name, Key=key)
            return pdf_data["Body"].read()
        except Exception as e:
            raise ValueError(f"Error downloading pdf from s3: {e}")

    def upload_file_to_s3(self, bucket_name, key, local_filepath):
        upload_path_list = key.split('/')[0:2] # protected/<User private directory>
        upload_filename = local_filepath.split('/')[-1]
        upload_path_list.extend(['report', upload_filename])
        final_filepath = os.path.join(*upload_path_list)

        # Upload the DB file to S3
        s3.upload_file(local_filepath, bucket_name, final_filepath)

        return final_filepath
