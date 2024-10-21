import os
import time
from openai import AzureOpenAI


class AzureOpenAIAssistant:
    def __init__(self) -> None:
        self.assistant_id = os.getenv("AZURE_OPENAI_ASSISTANT_ID")
        self.client = AzureOpenAI(
            api_key= os.getenv("AZURE_OPENAI_API_KEY"),
            api_version="2024-02-15-preview",
            azure_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
            )

    def generate_response(self, content):
        # Create a thread
        thread = self.client.beta.threads.create()

        # Add a user question to the thread
        message = self.client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content="Generate a summary for the following Lumbar Report: " + content # Replace this with your prompt
        )

        # Run the thread
        run = self.client.beta.threads.runs.create(
            thread_id=thread.id,
            assistant_id=self.assistant_id
        )
        return run, thread

    def get_response(self, run, thread):
        messages = None
        # Looping until the run completes or fails
        while run.status in ['queued', 'in_progress', 'cancelling']:
            time.sleep(0.5)
            run = self.client.beta.threads.runs.retrieve(
                thread_id=thread.id,
                run_id=run.id
            )

        if run.status == 'completed':
            messages = self.client.beta.threads.messages.list(
                thread_id=thread.id
            )
        elif run.status == 'requires_action':
            # the assistant requires calling some functions
            # and submit the tool outputs back to the run
            pass
        else:
            print(run.status)
        return messages, run, thread