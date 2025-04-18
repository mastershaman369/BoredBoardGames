from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..services.message_service import get_inbox, get_thread, send_message
from ..schemas.message_schema import MessageCreate, MessageOut
from ..dependencies.rbac import get_current_user
from typing import List

router = APIRouter()

@router.get("/messages", response_model=List[MessageOut])
def inbox(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated.")
    return get_inbox(db, current_user.id)

@router.get("/messages/{user_id}", response_model=List[MessageOut])
def thread(user_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated.")
    return get_thread(db, current_user.id, user_id)

@router.post("/messages", response_model=MessageOut)
def send(db: Session = Depends(get_db), data: MessageCreate = None, current_user=Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated.")
    return send_message(db, current_user.id, data.receiver_id, data.content)
