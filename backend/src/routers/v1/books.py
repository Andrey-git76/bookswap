from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from src.core.services.db import get_db
from src.crud.books import get_book, get_books, create_book, update_book, delete_book
from src.schemas.books import BookCreate, BookUpdate, BookOut

router_books = APIRouter(prefix="/books", tags=["books"])

@router_books.get("/", response_model=List[BookOut])
def list_books(db: Session = Depends(get_db)):
    return get_books(db)

@router_books.get("/{book_id}", response_model=BookOut)
def read_book(book_id: int, db: Session = Depends(get_db)):
    book = get_book(db, book_id)
    if not book:
        raise HTTPException(404, "Book not found")
    return book

@router_books.post("/", response_model=BookOut, status_code=201)
def create_book_endpoint(data: BookCreate, db: Session = Depends(get_db)):
    return create_book(db, data)

@router_books.put("/{book_id}", response_model=BookOut)
def update_book_endpoint(book_id: int, data: BookUpdate, db: Session = Depends(get_db)):
    book = update_book(db, book_id, data)
    if not book:
        raise HTTPException(404, "Book not found")
    return book

@router_books.delete("/{book_id}", response_model=BookOut)
def delete_book_endpoint(book_id: int, db: Session = Depends(get_db)):
    book = delete_book(db, book_id)
    if not book:
        raise HTTPException(404, "Book not found")
    return book