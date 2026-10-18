from pydantic import BaseModel
from datetime import date
from typing import Optional


class BookingBase(BaseModel):
    book_id: int
    user_id: int
    start_date: date
    end_date: date
    status: str = "active"


class BookingCreate(BookingBase):
    pass


class BookingUpdate(BaseModel):
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    status: Optional[str] = None


class BookingOut(BookingBase):
    id: int

    model_config = {"from_attributes": True}