from sqlalchemy import Column, Integer, String, Boolean
from ..database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(128), unique=True, nullable=False, index=True)
    password = Column(String(256), nullable=False)
    name = Column(String(128), nullable=False)
    role = Column(String(32), nullable=False, default="buyer")
    is_verified = Column(Boolean, nullable=False, default=False)
    email_token = Column(String(128), nullable=True)
    reset_token = Column(String(128), nullable=True)
