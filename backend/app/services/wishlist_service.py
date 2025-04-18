from sqlalchemy.orm import Session
from ..models.wishlist import WishlistItem
from fastapi import HTTPException, status

def get_user_wishlist(db: Session, user_id: int):
    return db.query(WishlistItem).filter(WishlistItem.user_id == user_id).all()

def add_to_wishlist(db: Session, user_id: int, product_id: int):
    exists = db.query(WishlistItem).filter(WishlistItem.user_id == user_id, WishlistItem.product_id == product_id).first()
    if exists:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Already in wishlist.")
    item = WishlistItem(user_id=user_id, product_id=product_id)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

def remove_from_wishlist(db: Session, user_id: int, product_id: int):
    item = db.query(WishlistItem).filter(WishlistItem.user_id == user_id, WishlistItem.product_id == product_id).first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not in wishlist.")
    db.delete(item)
    db.commit()
    return {"msg": "Removed from wishlist."}
