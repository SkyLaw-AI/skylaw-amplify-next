import math
from . import pricing_config

class PricingTracker:
    def __init__(self,
                 prompt_token_price=pricing_config.OPEN_AI_COST_PER_INPUT_TOKEN, 
                 completion_token_price=pricing_config.OPEN_AI_COST_PER_COMPLETION_TOKEN,
                 comprehend_medical_num_character_price=pricing_config.COMPREHEND_MEDICAL_COST_PER_UNIT,
                 textract_num_page_price=pricing_config.TEXTRACT_COST_PER_PAGE
                 ) -> None:
        # usage related variables
        self.open_ai_completion_tokens = 0
        self.open_ai_prompt_tokens = 0
        self.comprehend_units = 0
        self.pages_sent_to_textract = 0

        # cost variables
        self.prompt_token_price = prompt_token_price
        self.completion_token_price = completion_token_price
        self.comprehend_medical_num_character_price = comprehend_medical_num_character_price
        self.textract_num_page_price = textract_num_page_price

    def _get_open_ai_num_tokens(self, open_ai_response):
        # get the number of tokens from the response
        prompt_tokens = open_ai_response.usage.prompt_tokens
        completion_tokens = open_ai_response.usage.completion_tokens

        return {"prompt_tokens": prompt_tokens, "completion_tokens": completion_tokens}

    def _get_number_units_for_comprehend(self, text):
        num_characters = len(text)
        num_units = math.ceil(num_characters/100) # rounding up to get num of units
        if num_units < 1:
            # minimum 3 unit charge
            num_units = 1

        return num_units

    def update_number_of_pages(self, images_list):
        # get the number of pages from the pdf images
        self.pages_sent_to_textract += len(images_list)

    def update_comprehend_units(self, text):
        self.comprehend_units = self._get_number_units_for_comprehend(text)

    def update_open_ai_tokens(self, open_ai_response):
        open_ai_token_dict = self._get_open_ai_num_tokens(open_ai_response)
        self.open_ai_prompt_tokens += open_ai_token_dict['prompt_tokens']
        self.open_ai_completion_tokens += open_ai_token_dict['completion_tokens']

    def get_open_ai_completion_cost_in_dollars(self):
        return self.completion_token_price*self.open_ai_completion_tokens
    
    def get_open_ai_prompt_cost_in_dollars(self):
        return self.prompt_token_price*self.open_ai_prompt_tokens

    def get_open_ai_cost_in_dollars(self):
        return self.get_open_ai_completion_cost_in_dollars() + \
            self.get_open_ai_prompt_cost_in_dollars()

    def get_textract_cost_in_dollars(self):
        return self.textract_num_page_price*self.pages_sent_to_textract

    def get_comprehend_medical_cost_in_dollars(self):
        return self.comprehend_units * self.comprehend_medical_num_character_price

    def get_total_cost_in_dollars(self):
        total_cost = 0
        total_cost += self.get_textract_cost_in_dollars() 
        total_cost += self.get_comprehend_medical_cost_in_dollars()
        total_cost += self.get_open_ai_cost_in_dollars()

        return total_cost
