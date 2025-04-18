from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas.product_schema import ProductCreate, ProductOut
from ..services.product_service import get_product_by_id, list_products, create_product
from typing import List

router = APIRouter()

@router.get("/products", response_model=List[ProductOut])
def get_products(db: Session = Depends(get_db), limit: int = Query(10, ge=1, le=100), offset: int = Query(0, ge=0)):
    return list_products(db, limit=limit, offset=offset)

@router.get("/products/{product_id}", response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    return get_product_by_id(db, product_id)

@router.post("/products", response_model=ProductOut, status_code=status.HTTP_201_CREATED)
def create_new_product(product: ProductCreate, db: Session = Depends(get_db)):
    return create_product(db, product.dict())
