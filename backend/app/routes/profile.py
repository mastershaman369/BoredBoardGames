from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas.profile_schema import UserProfileOut, UserProfileUpdate
from ..services.profile_service import get_profile_by_user_id, update_profile
from ..dependencies.rbac import get_current_user
from ..models import UserProfile

router = APIRouter()

@router.get("/profiles/{user_id}", response_model=UserProfileOut)
def public_profile(user_id: int, db: Session = Depends(get_db)):
    return get_profile_by_user_id(db, user_id)

@router.put("/profiles/me", response_model=UserProfileOut)
def update_my_profile(data: UserProfileUpdate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated.")
    return update_profile(db, current_user.id, data.dict(exclude_unset=True))

@router.get("/profile/badges")
def get_my_badges(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found.")
    badges = profile.badges.split(",") if profile.badges else []
    return {"badges": badges}
