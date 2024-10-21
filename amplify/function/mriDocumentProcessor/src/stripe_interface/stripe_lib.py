import os
import stripe

stripe.api_key = os.environ['STRIPE_KEY']

def update_stripe_usage(value, customer_id, idempotency_key):
    created_meter = stripe.billing.MeterEvent.create(
        event_name="mri_upload",
        payload={"value": value, "stripe_customer_id": customer_id},
        idempotency_key=idempotency_key
    )
    print(created_meter)

    return True
