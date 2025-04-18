from pydantic import BaseModel, Field
from typing import Optional, List

class UserProfileBase(BaseModel):
    display_name: str = Field(..., min_length=2, max_length=128)
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    badges: Optional[List[str]] = []

class UserProfileCreate(UserProfileBase):
    pass

class UserProfileUpdate(UserProfileBase):
    pass

class UserProfileOut(UserProfileBase):
    user_id: int
    class Config:
        orm_mode = True
