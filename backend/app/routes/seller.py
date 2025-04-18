from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Product, User
from ..dependencies.rbac import get_current_user

router = APIRouter()

@router.get("/seller/dashboard")
def seller_dashboard(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user or getattr(current_user, "role", None) != "seller":
        return {"error": "Seller access required."}
    products = db.query(Product).filter(Product.seller_id == current_user.id).all()
    return {"products": [p.name for p in products]}
