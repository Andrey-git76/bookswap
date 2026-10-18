from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from src.core.services.db import get_db
from src.crud.bookings import get_user_bookings, create_booking, update_booking
from src.schemas.bookings import BookingCreate, BookingUpdate, BookingOut

router_bookings = APIRouter(prefix="/bookings", tags=["bookings"])

@router_bookings.get("/user/{user_id}", response_model=List[BookingOut])
def list_user_bookings(user_id: int, db: Session = Depends(get_db)):
    return get_user_bookings(db, user_id)

@router_bookings.post("/", response_model=BookingOut, status_code=201)
def create_booking_endpoint(data: BookingCreate, db: Session = Depends(get_db)):
    return create_booking(db, data)

@router_bookings.put("/{booking_id}", response_model=BookingOut)
def update_booking_endpoint(booking_id: int, data: BookingUpdate, db: Session = Depends(get_db)):
    booking = update_booking(db, booking_id, data)
    if not booking:
        raise HTTPException(404, "Booking not found")
    return booking