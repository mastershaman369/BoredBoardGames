from beanie import Document
from pydantic import Field, EmailStr
from datetime import datetime
from typing import Optional
import uuid

class User(Document):
    user_id: uuid.UUID = Field(default_factory=uuid.uuid4, unique=True)
    email: EmailStr = Field(..., unique=True, index=True)
    hashed_password: str
    is_admin: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    # Future: roles, profile fields, etc.

    class Settings:
        name = "users"
