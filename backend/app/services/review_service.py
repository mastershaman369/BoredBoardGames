from sqlalchemy.orm import Session
from ..models.review import Review
from fastapi import HTTPException, status
from datetime import datetime

def get_reviews_for_product(db: Session, product_id: int, limit: int = 10, offset: int = 0):
    return db.query(Review).filter(Review.product_id == product_id).offset(offset).limit(limit).all()

def create_review(db: Session, product_id: int, user_id: int, data: dict):
    review = Review(product_id=product_id, user_id=user_id, rating=data['rating'], text=data.get('text'), created_at=datetime.utcnow())
    db.add(review)
    db.commit()
    db.refresh(review)
    return review
