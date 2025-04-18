from fastapi import APIRouter, HTTPException
from .product import Product
from .category import Category
from .settings import Settings
from .stripe_checkout import router as stripe_router
#from .order import router as order_router, Order
from fastapi import Body
from typing import List, Optional
from beanie import PydanticObjectId
from fastapi import status

router = APIRouter()

# --- Settings ---
@router.get("/settings", response_model=Settings)
async def get_settings():
    settings = await Settings.find_one()
    if not settings:
        settings = Settings()
        await settings.insert()
    return settings

@router.put("/settings", response_model=Settings)
async def update_settings(data: dict = Body(...)):
    settings = await Settings.find_one()
    if not settings:
        settings = Settings()
    if "layaway_enabled" in data:
        settings.layaway_enabled = bool(data["layaway_enabled"])
    await settings.save()
    return settings

# --- Products ---
@router.get("/products", response_model=List[Product])
async def get_products(category_id: Optional[str] = None):
    if category_id:
        return await Product.find(Product.category_id == category_id).to_list()
    return await Product.find_all().to_list()

@router.post("/products", response_model=Product, status_code=status.HTTP_201_CREATED)
async def create_product(product: Product = Body(...)):
    await product.insert()
    return product

@router.put("/products/{product_id}", response_model=Product)
async def edit_product(product_id: str, product: Product = Body(...)):
    db_product = await Product.find_one(Product.id == product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    update_data = product.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_product, field, value)
    await db_product.save()
    return db_product

@router.delete("/products/{product_id}")
async def remove_product(product_id: str):
    db_product = await Product.find_one(Product.id == product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    await db_product.delete()
    return {"ok": True}

@router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    # Attempt to find by slug first
    db_product = await Product.find_one(Product.slug == product_id)
    if not db_product:
        # Fallback: treat param as ObjectId
        try:
            db_product = await Product.find_one(Product.id == PydanticObjectId(product_id))
        except Exception:
            db_product = None
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

# --- Categories ---
@router.get("/categories", response_model=List[Category])
async def get_categories():
    return await Category.find_all().to_list()

@router.post("/categories", response_model=Category, status_code=status.HTTP_201_CREATED)
async def create_category(category: Category = Body(...)):
    await category.insert()
    return category

@router.put("/categories/{category_id}", response_model=Category)
async def edit_category(category_id: str, category: Category = Body(...)):
    db_category = await Category.find_one(Category.id == category_id)
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    update_data = category.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_category, field, value)
    await db_category.save()
    return db_category

@router.delete("/categories/{category_id}")
async def remove_category(category_id: str):
    db_category = await Category.find_one(Category.id == category_id)
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    await db_category.delete()
    return {"ok": True}

router.include_router(stripe_router, prefix="/stripe")
#router.include_router(order_router, prefix="/orders")
