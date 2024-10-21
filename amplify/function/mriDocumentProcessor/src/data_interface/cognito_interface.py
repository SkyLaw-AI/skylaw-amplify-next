import os
import boto3
from botocore.exceptions import ClientError

# Initialize a boto3 client for Cognito Identity Provider
client = boto3.client('cognito-idp')

class CognitoInterface:
    def __init__(self, sub) -> None:
        self.user_pool = os.environ['COGNITO_USER_POOL'] # for MRI Dev
        self.sub = sub
        self.user_details = None

    def _get_user_details(self):
        try:
            # List users in the user pool and filter by sub
            response = client.list_users(
                UserPoolId=self.user_pool,
                Filter=f'sub = "{self.sub}"'
            )

            # Check if any users are returned
            if response['Users']:
                user_details = response['Users'][0]
                print("User details:", user_details)

                user_details_dict = {}
                for att_dict in user_details['Attributes']:
                    user_details_dict[att_dict['Name']] = att_dict['Value']

                return user_details_dict
            else:
                print("No user found with the given sub.")

        except ClientError as e:
            print(f"An error occurred: {e}")
        return None
    
    def get_name_of_user(self):
        if not self.user_details:
            self.user_details = self._get_user_details()
        return self.user_details['name'].title()

    def get_email_of_user(self):
        if not self.user_details:
            self.user_details = self._get_user_details()
        return self.user_details['email']
