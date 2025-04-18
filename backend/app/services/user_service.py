from typing import Optional
from ..models import User
from ..database import get_db
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    return user

def create_user(db: Session, user_data: dict) -> User:
    user = User(**user_data)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

# Add more business logic as needed
