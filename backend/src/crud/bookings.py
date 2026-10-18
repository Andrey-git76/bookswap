from sqlalchemy.orm import Session
from src.models.booking import Booking
from src.schemas.bookings import BookingCreate, BookingUpdate


def get_booking(db: Session, booking_id: int) -> Booking | None:
    return db.get(Booking, booking_id)


def get_user_bookings(db: Session, user_id: int) -> list[Booking]:
    return db.query(Booking).filter(Booking.user_id == user_id).all()


def create_booking(db: Session, data: BookingCreate) -> Booking:
    booking = Booking(**data.model_dump())
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking


def update_booking(db: Session, booking_id: int, data: BookingUpdate) -> Booking | None:
    obj = get_booking(db, booking_id)
    if not obj:
        return None
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj