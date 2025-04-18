from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..services.wishlist_service import get_user_wishlist, add_to_wishlist, remove_from_wishlist
from ..schemas.wishlist_schema import WishlistItemOut
from ..dependencies.rbac import get_current_user
from typing import List

router = APIRouter()

@router.get("/wishlist", response_model=List[WishlistItemOut])
def get_wishlist(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated.")
    return get_user_wishlist(db, current_user.id)

@router.post("/wishlist/{product_id}", response_model=WishlistItemOut)
def add_wish(product_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated.")
    return add_to_wishlist(db, current_user.id, product_id)

@router.delete("/wishlist/{product_id}")
def remove_wish(product_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated.")
    return remove_from_wishlist(db, current_user.id, product_id)
