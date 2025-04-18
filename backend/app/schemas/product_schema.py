from pydantic import BaseModel, Field
from typing import Optional

class ProductCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    price: float = Field(..., gt=0)
    description: Optional[str] = Field(None, max_length=500)

class ProductOut(BaseModel):
    id: int
    name: str
    price: float
    description: Optional[str]

    class Config:
        orm_mode = True
