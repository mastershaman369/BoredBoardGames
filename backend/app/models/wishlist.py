from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint
from ..database import Base

class WishlistItem(Base):
    __tablename__ = "wishlist_items"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)

    __table_args__ = (UniqueConstraint('user_id', 'product_id', name='_user_product_uc'),)
