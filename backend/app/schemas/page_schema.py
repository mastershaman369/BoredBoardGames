from pydantic import BaseModel, Field
from typing import Optional

class PageBase(BaseModel):
    slug: str = Field(..., min_length=2, max_length=64)
    title: str = Field(..., min_length=2, max_length=128)
    content: str
    is_published: bool = False

class PageCreate(PageBase):
    pass

class PageOut(PageBase):
    id: int

    class Config:
        orm_mode = True
