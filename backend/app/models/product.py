from sqlalchemy import Column, Integer, String, Float, ForeignKey
from ..database import Base

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(128), nullable=False)
    price = Column(Float, nullable=False)
    description = Column(String(512))
    seller_id = Column(Integer, ForeignKey("users.id"), nullable=False)
