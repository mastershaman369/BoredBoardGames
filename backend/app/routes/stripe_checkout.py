from fastapi import APIRouter, HTTPException, status, Request
from pydantic import BaseModel
import os
import stripe
from ..settings import settings

router = APIRouter()

stripe.api_key = settings.STRIPE_SECRET_KEY

class CheckoutSessionRequest(BaseModel):
    product_id: int
    quantity: int

@router.post("/checkout-session")
def create_checkout_session(data: CheckoutSessionRequest):
    try:
        # You would fetch product info from DB in a real app
        # For MVP, we'll use static data
        product_lookup = {
            1: {"name": "Luxury Wooden Monopoly Board", "price": 79999},
            2: {"name": "Super Rubik's Cube", "price": 14999},
        }
        product = product_lookup.get(data.product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found.")
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": product["name"]},
                    "unit_amount": product["price"]
                },
                "quantity": data.quantity,
            }],
            mode="payment",
            success_url="https://yourdomain.com/success",
            cancel_url="https://yourdomain.com/cancel"
        )
        return {"checkout_url": session.url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
