from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas.review_schema import ReviewCreate, ReviewOut
from ..services.review_service import get_reviews_for_product, create_review
from ..dependencies.rbac import get_current_user
from typing import List

router = APIRouter()

@router.get("/products/{product_id}/reviews", response_model=List[ReviewOut])
def get_product_reviews(product_id: int, db: Session = Depends(get_db), limit: int = Query(10, ge=1, le=100), offset: int = Query(0, ge=0)):
    return get_reviews_for_product(db, product_id, limit=limit, offset=offset)

@router.post("/products/{product_id}/reviews", response_model=ReviewOut, status_code=status.HTTP_201_CREATED)
def add_review(product_id: int, data: ReviewCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated.")
    return create_review(db, product_id, current_user.id, data.dict())
