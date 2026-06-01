from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.models import Base

# Import both your routers here
from app.routes.product import router as product_router
from app.routes.customer import router as customer_router
from app.routes.order import router as order_router

# This automatically ensures database tables are created on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Inventory Management API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register both routers so FastAPI exposes their endpoints
app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)

@app.get("/")
def root():
    return {
        "message": "Inventory API Running"
    }