from beanie import Document
from pydantic import Field
from typing import List, Optional
from datetime import datetime
import uuid

class OrderItem(Document):
    product_id: uuid.UUID
    quantity: int = Field(..., ge=1)
    price_at_purchase: float = Field(..., ge=0)
    # Future: vendor_id, product_name snapshot, etc.

class Order(Document):
    order_id: uuid.UUID = Field(default_factory=uuid.uuid4, unique=True)
    items: List[OrderItem]
    user_email: str
    status: str = Field(..., pattern="^(pending_layaway|paid)$")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    # Future: customer_id, payment details, etc.

    class Settings:
        name = "orders"
