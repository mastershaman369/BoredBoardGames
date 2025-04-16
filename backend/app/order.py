import os
from pydantic import BaseModel
from typing import List
from fastapi import APIRouter, HTTPException
from dotenv import load_dotenv

load_dotenv()

class Order(BaseModel):
    id: int
    items: list
    user_email: str
    status: str  # 'pending_layaway' or 'paid'

orders: List[Order] = []

router = APIRouter()

LAYAWAY_ENABLED = os.getenv("LAYAWAY_ENABLED", "false").lower() == "true"

@router.post("/orders")
def create_order(order: Order):
    order.id = len(orders) + 1
    if order.status == "pending_layaway":
        if not LAYAWAY_ENABLED:
            raise HTTPException(status_code=403, detail="Layaway is currently disabled.")
    orders.append(order)
    return {"order_id": order.id, "status": order.status}

@router.get("/orders")
def list_orders():
    return orders

@router.get("/settings/layaway")
def get_layaway_setting():
    return {"layaway_enabled": LAYAWAY_ENABLED}
