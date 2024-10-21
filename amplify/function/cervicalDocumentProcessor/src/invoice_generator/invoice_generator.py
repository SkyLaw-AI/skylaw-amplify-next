import os
import re
import pdfkit

DIR_PATH = os.path.dirname(os.path.abspath(__file__))
# class InvoiceGenerator:
#     def __init__(user_name, organization_name, user_email)


def generate_invoice(data_to_update):
    invoice_template = _read_invoice_template()

    # replace placeholders in invoice template with data
    final_template = _replace_data_in_template(invoice_template, data_to_update=data_to_update)

    # final_template = _remove_items_not_updated(final_template)

    return final_template

def _read_invoice_template():
    with open(os.path.join(DIR_PATH, 'invoice_template.html'), 'r') as fp:
        invoice_template = fp.read()
    return invoice_template

def _replace_data_in_template(invoice_template,data_to_update):
    # replace all kwargs keys in invoice template by values
    for k, v in data_to_update.items():
        invoice_template = invoice_template.replace(k, str(v))
    
    return invoice_template

def _remove_items_not_updated(updated_html):
    all_missing_placeholders = re.findall('<\w+>\w+_\w+</\w+>', updated_html)

    for missing_placeholder in all_missing_placeholders:
        updated_html = updated_html.replace(missing_placeholder, '')
    
    return updated_html

def write_html_to_pdf(html_invoice, write_path):
    try:
        config = pdfkit.configuration(wkhtmltopdf="/opt/bin/wkhtmltopdf")
        pdfkit.from_string(html_invoice, write_path, 
                           configuration=config, options={"enable-local-file-access": ""})
    except Exception as e:
        print(f"An error occurred while converting HTML to PDF: {e}")
    return True
