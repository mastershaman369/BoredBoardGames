# Product models and logic for MVP
from beanie import Document, Link
from pydantic import Field
from typing import Optional, List, Dict, Any
import uuid

class Product(Document):
    product_id: uuid.UUID = Field(default_factory=uuid.uuid4, unique=True)
    name: str = Field(..., max_length=200)
    description: str = Field(default="", max_length=2000)
    price: float = Field(..., ge=0)
    sale_price: Optional[float] = Field(default=None, ge=0)
    images: List[str] = Field(default_factory=list)
    tags: List[str] = Field(default_factory=list)
    categories: List[str] = Field(default_factory=list)
    sku: Optional[str] = None
    inventory: Optional[int] = Field(default=None, ge=0)
    specs: Dict[str, Any] = Field(default_factory=dict)
    slug: str = Field(..., max_length=200)
    custom_url: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    class Settings:
        name = "products"
