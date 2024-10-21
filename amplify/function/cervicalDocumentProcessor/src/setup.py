from distutils.core import setup

setup(
    name='src', 
    version='1.0',
    py_modules=['index'],
    packages=['data_interface', 'pricing_tracker', 'gpt_instructions', 'invoice_generator', 'stripe_interface'],
)
