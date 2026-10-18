from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from src.core.services.db import get_db
from src.crud.users import get_user_by_email, create_user, get_users, get_user
from src.schemas.users import UserCreate, UserOut

router_users = APIRouter(prefix="/users", tags=["users"])

@router_users.get("/", response_model=List[UserOut])
def list_users(db: Session = Depends(get_db)):
    return get_users(db)

@router_users.get("/{user_id}", response_model=UserOut)
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = get_user(db, user_id)
    if not user:
        raise HTTPException(404, "User not found")
    return user

@router_users.post("/", response_model=UserOut, status_code=201)
def register_user(data: UserCreate, db: Session = Depends(get_db)):
    if get_user_by_email(db, data.email):
        raise HTTPException(400, "Email already registered")
    return create_user(db, data)