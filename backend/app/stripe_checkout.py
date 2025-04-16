import os
import stripe
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@router.post("/create-checkout-session")
async def create_checkout_session(request: Request):
    data = await request.json()
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=data["line_items"],
            mode="payment",
            success_url=os.getenv("STRIPE_SUCCESS_URL"),
            cancel_url=os.getenv("STRIPE_CANCEL_URL"),
            currency=os.getenv("STRIPE_CURRENCY", "usd"),
        )
        return JSONResponse({"id": session.id, "url": session.url})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
