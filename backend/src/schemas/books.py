from pydantic import BaseModel
from typing import Optional


class BookBase(BaseModel):
    title: str
    author: str
    description: Optional[str] = None
    status: str = "available"
    pickup_location: Optional[str] = None


class BookCreate(BookBase):
    owner_id: int


class BookUpdate(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    pickup_location: Optional[str] = None


class BookOut(BookBase):
    id: int
    owner_id: int

    model_config = {"from_attributes": True}