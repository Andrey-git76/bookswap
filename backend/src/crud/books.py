from sqlalchemy.orm import Session
from src.models.book import Book
from src.schemas.books import BookCreate, BookUpdate


def get_book(db: Session, book_id: int) -> Book | None:
    return db.get(Book, book_id)


def get_books(db: Session, skip: int = 0, limit: int = 100) -> list[Book]:
    return db.query(Book).offset(skip).limit(limit).all()


def create_book(db: Session, data: BookCreate) -> Book:
    book = Book(**data.model_dump())
    db.add(book)
    db.commit()
    db.refresh(book)
    return book


def update_book(db: Session, book_id: int, data: BookUpdate) -> Book | None:
    obj = get_book(db, book_id)
    if not obj:
        return None
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj


def delete_book(db: Session, book_id: int) -> Book | None:
    obj = get_book(db, book_id)
    if not obj:
        return None
    db.delete(obj)
    db.commit()
    return obj