from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MessageBase(BaseModel):
    content: str

class MessageCreate(MessageBase):
    receiver_id: int

class MessageOut(MessageBase):
    id: int
    sender_id: int
    receiver_id: int
    is_read: bool
    timestamp: datetime
    class Config:
        orm_mode = True
