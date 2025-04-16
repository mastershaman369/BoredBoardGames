# Product models and logic for MVP
from pydantic import BaseModel
from typing import List

class Product(BaseModel):
    id: str
    name: str
    description: str
    price: float
    image_url: str

# In-memory product list for MVP demo
products = [
    Product(id="1", name="Catan", description="Trade, build, and settle.", price=44.99, image_url="/images/catan.jpg"),
    Product(id="2", name="Ticket to Ride", description="Build your railroad empire.", price=39.99, image_url="/images/ticket.jpg"),
]
