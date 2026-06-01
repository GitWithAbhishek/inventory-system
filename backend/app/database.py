import os
import time
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = (
    f"postgresql://{os.getenv('DB_USER')}:"
    f"{os.getenv('DB_PASSWORD')}@"
    f"{os.getenv('DB_HOST')}:"
    f"{os.getenv('DB_PORT')}/"
    f"{os.getenv('DB_NAME')}"
)

# Try connecting up to 5 times before giving up
for i in range(5):
    try:
        engine = create_engine(DATABASE_URL)
        # Test if the database is awake and accepting connections
        with engine.connect() as connection:
            print("Database connected successfully!")
            break
    except Exception as e:
        if i == 4:  # If it still fails on the 5th try, throw the error
            raise e
        print("Database is not ready yet. Waiting 3 seconds...")
        time.sleep(3)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()