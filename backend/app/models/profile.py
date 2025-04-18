from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class UserProfile(Base):
    __tablename__ = "user_profiles"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    display_name = Column(String(128), nullable=False)
    bio = Column(String(512))
    avatar_url = Column(String(256))
    badges = Column(String(512), default="")  # Comma-separated

    user = relationship("User", backref="profile", uselist=False)
