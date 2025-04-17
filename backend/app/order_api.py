from fastapi import APIRouter, HTTPException, Depends, Body, status
from typing import List
from .order import Order, OrderItem
from .auth import get_current_user

router = APIRouter(prefix="/orders", tags=["orders"])

@router.get("/", response_model=List[Order])
async def list_orders(user=Depends(get_current_user)):
    # Optionally filter by user in the future
    return await Order.find_all().to_list()

@router.post("/", response_model=Order, status_code=status.HTTP_201_CREATED)
async def create_order(order: Order = Body(...), user=Depends(get_current_user)):
    await order.insert()
    return order

@router.get("/{order_id}", response_model=Order)
async def get_order(order_id: str, user=Depends(get_current_user)):
    db_order = await Order.find_one(Order.order_id == order_id)
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order

@router.delete("/{order_id}")
async def delete_order(order_id: str, user=Depends(get_current_user)):
    db_order = await Order.find_one(Order.order_id == order_id)
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    await db_order.delete()
    return {"ok": True}
