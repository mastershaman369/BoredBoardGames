# Product models and logic for MVP
from pydantic import BaseModel
from typing import List, Optional
from fastapi import HTTPException

class Category(BaseModel):
    id: str
    name: str

class Product(BaseModel):
    id: str
    name: str
    description: str
    price: float
    image_url: str
    category_id: Optional[str] = None

# In-memory product list for MVP demo
# Example categories
categories = [
    Category(id="1", name="Strategy"),
    Category(id="2", name="Family"),
]

# Example products
products = [
    Product(id="1", name="Catan", description="Trade, build, and settle.", price=44.99, image_url="/images/catan.jpg", category_id="1"),
    Product(id="2", name="Ticket to Ride", description="Build your railroad empire.", price=39.99, image_url="/images/ticket.jpg", category_id="2"),
]

# --- Admin CRUD helpers ---
def add_product(product: Product):
    if any(p.id == product.id for p in products):
        raise HTTPException(status_code=400, detail="Product ID already exists")
    products.append(product)

def update_product(product_id: str, update: Product):
    for i, p in enumerate(products):
        if p.id == product_id:
            products[i] = update
            return
    raise HTTPException(status_code=404, detail="Product not found")

def delete_product(product_id: str):
    for i, p in enumerate(products):
        if p.id == product_id:
            products.pop(i)
            return
    raise HTTPException(status_code=404, detail="Product not found")

def add_category(category: Category):
    if any(c.id == category.id for c in categories):
        raise HTTPException(status_code=400, detail="Category ID already exists")
    categories.append(category)

def update_category(category_id: str, update: Category):
    for i, c in enumerate(categories):
        if c.id == category_id:
            categories[i] = update
            return
    raise HTTPException(status_code=404, detail="Category not found")

def delete_category(category_id: str):
    for i, c in enumerate(categories):
        if c.id == category_id:
            categories.pop(i)
            return
    raise HTTPException(status_code=404, detail="Category not found")
