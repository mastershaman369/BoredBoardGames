# Product models and logic for MVP
from beanie import Document, Link
from pydantic import Field
from typing import Optional
import uuid

class Product(Document):
    product_id: uuid.UUID = Field(default_factory=uuid.uuid4, unique=True)
    name: str = Field(..., max_length=200)
    description: str = Field(default="", max_length=2000)
    price: float = Field(..., ge=0)
    image_url: Optional[str] = None
    category_id: Optional[uuid.UUID] = Field(default=None)
    # Future: vendor_id, stock, etc.

    class Settings:
        name = "products"
