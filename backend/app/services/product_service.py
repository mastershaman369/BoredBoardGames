from typing import List, Optional
from ..models import Product
from ..database import get_db
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

def get_product_by_id(db: Session, product_id: int) -> Optional[Product]:
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")
    return product

def list_products(db: Session, limit: int = 10, offset: int = 0) -> List[Product]:
    return db.query(Product).offset(offset).limit(limit).all()

def create_product(db: Session, product_data: dict) -> Product:
    product = Product(**product_data)
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

# Add more business logic as needed
