from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Product, User
from ..schemas.product_schema import ProductCreate, ProductOut
from ..dependencies.rbac import get_current_user
from typing import List

router = APIRouter()

@router.get("/seller/products", response_model=List[ProductOut])
def list_seller_products(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user or getattr(current_user, "role", None) != "seller":
        raise HTTPException(status_code=403, detail="Seller access required.")
    return db.query(Product).filter(Product.seller_id == current_user.id).all()

@router.post("/seller/products", response_model=ProductOut, status_code=status.HTTP_201_CREATED)
def create_seller_product(product: ProductCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user or getattr(current_user, "role", None) != "seller":
        raise HTTPException(status_code=403, detail="Seller access required.")
    db_product = Product(**product.dict(), seller_id=current_user.id)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.put("/seller/products/{product_id}", response_model=ProductOut)
def update_seller_product(product_id: int, product: ProductCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user or getattr(current_user, "role", None) != "seller":
        raise HTTPException(status_code=403, detail="Seller access required.")
    db_product = db.query(Product).filter(Product.id == product_id, Product.seller_id == current_user.id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found.")
    for k, v in product.dict().items():
        setattr(db_product, k, v)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.delete("/seller/products/{product_id}")
def delete_seller_product(product_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user or getattr(current_user, "role", None) != "seller":
        raise HTTPException(status_code=403, detail="Seller access required.")
    db_product = db.query(Product).filter(Product.id == product_id, Product.seller_id == current_user.id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found.")
    db.delete(db_product)
    db.commit()
    return {"msg": "Product deleted."}
