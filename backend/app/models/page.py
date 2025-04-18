from sqlalchemy import Column, Integer, String, Boolean, Text
from ..database import Base

class Page(Base):
    __tablename__ = "pages"
    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(64), unique=True, index=True, nullable=False)
    title = Column(String(128), nullable=False)
    content = Column(Text, nullable=False)
    is_published = Column(Boolean, default=False)
