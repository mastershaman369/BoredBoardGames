from fastapi import APIRouter, Query, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Product
from typing import List, Optional

router = APIRouter()

@router.get("/products/search")
def search_products(q: Optional[str] = Query(None), category: Optional[str] = Query(None), db: Session = Depends(get_db), limit: int = Query(10, ge=1, le=100), offset: int = Query(0, ge=0)):
    query = db.query(Product)
    if q:
        query = query.filter((Product.name.ilike(f"%{q}%")) | (Product.description.ilike(f"%{q}%")))
    if category:
        query = query.filter(Product.category == category)
    results = query.offset(offset).limit(limit).all()
    return [{"id": p.id, "name": p.name, "price": p.price, "category": getattr(p, "category", None)} for p in results]
