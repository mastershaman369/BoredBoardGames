from beanie import Document
from pydantic import Field
from typing import Optional, List
import uuid

class Category(Document):
    category_id: uuid.UUID = Field(default_factory=uuid.uuid4, unique=True)
    name: str = Field(..., max_length=100, unique=True, index=True)
    description: str = Field(default="", max_length=500)
    slug: str = Field(..., max_length=100)
    parent_id: Optional[uuid.UUID] = Field(default=None)
    image: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    custom_url: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    class Settings:
        name = "categories"
