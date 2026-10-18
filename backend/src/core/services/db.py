from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.settings import settings


DATABASE_URL = (
    f"postgresql+psycopg://{settings.DB_USERNAME}:{settings.DB_PASSWORD}"
    f"@{settings.DB_ADDR}:{settings.DB_PORT}/{settings.DB_NAME}"
    "?client_encoding=utf8"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()