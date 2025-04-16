from fastapi import APIRouter
from .product import products, Product
from .stripe_checkout import router as stripe_router
from .order import router as order_router

router = APIRouter()

@router.get("/products", response_model=list[Product])
def get_products():
    return products

router.include_router(stripe_router, prefix="/stripe")
router.include_router(order_router, prefix="/orders")
