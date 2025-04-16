from fastapi import APIRouter, HTTPException
from .product import (
    products, categories, Product, Category,
    add_product, update_product, delete_product,
    add_category, update_category, delete_category
)
from .stripe_checkout import router as stripe_router
from .order import router as order_router, Order, orders
from fastapi import Body
from typing import List

# --- In-memory site settings ---
settings = {"layaway_enabled": True}

router = APIRouter()

@router.get("/settings")
def get_settings():
    return settings

@router.put("/settings")
def update_settings(data: dict = Body(...)):
    if "layaway_enabled" in data:
        settings["layaway_enabled"] = bool(data["layaway_enabled"])
    return settings

@router.get("/products", response_model=List[Product])
def get_products(category_id: str = None):
    if category_id:
        return [p for p in products if p.category_id == category_id]
    return products

@router.post("/products", response_model=Product)
def create_product(product: Product = Body(...)):
    add_product(product)
    return product

@router.put("/products/{product_id}", response_model=Product)
def edit_product(product_id: str, product: Product = Body(...)):
    update_product(product_id, product)
    return product

@router.delete("/products/{product_id}")
def remove_product(product_id: str):
    delete_product(product_id)
    return {"ok": True}

@router.get("/products/{product_id}", response_model=Product)
def get_product(product_id: str):
    for p in products:
        if p.id == product_id:
            return p
    raise HTTPException(status_code=404, detail="Product not found")

@router.get("/categories", response_model=List[Category])
def get_categories():
    return categories

@router.post("/categories", response_model=Category)
def create_category(category: Category = Body(...)):
    add_category(category)
    return category

@router.put("/categories/{category_id}", response_model=Category)
def edit_category(category_id: str, category: Category = Body(...)):
    update_category(category_id, category)
    return category

@router.delete("/categories/{category_id}")
def remove_category(category_id: str):
    delete_category(category_id)
    return {"ok": True}

router.include_router(stripe_router, prefix="/stripe")
router.include_router(order_router, prefix="/orders")
