from sqlalchemy.orm import Session
from ..models.message import Message
from fastapi import HTTPException, status
from datetime import datetime

def get_inbox(db: Session, user_id: int):
    return db.query(Message).filter(Message.receiver_id == user_id).all()

def get_thread(db: Session, user_id: int, other_id: int):
    return db.query(Message).filter(((Message.sender_id == user_id) & (Message.receiver_id == other_id)) | ((Message.sender_id == other_id) & (Message.receiver_id == user_id))).order_by(Message.timestamp.asc()).all()

def send_message(db: Session, sender_id: int, receiver_id: int, content: str):
    msg = Message(sender_id=sender_id, receiver_id=receiver_id, content=content, is_read=False, timestamp=datetime.utcnow())
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg
