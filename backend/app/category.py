from beanie import Document
from pydantic import Field
import uuid

class Category(Document):
    category_id: uuid.UUID = Field(default_factory=uuid.uuid4, unique=True)
    name: str = Field(..., max_length=100, unique=True, index=True)
    description: str = Field(default="", max_length=500)

    class Settings:
        name = "categories"
