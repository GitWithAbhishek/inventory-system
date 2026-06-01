from pydantic import BaseModel, EmailStr, Field

# ------------------
# PRODUCT SCHEMAS
# ------------------

class ProductCreate(BaseModel):
    name: str
    sku: str
    price: float = Field(gt=0, description="Price must be a positive number greater than 0")
    quantity: int = Field(ge=0, description="Stock quantity cannot be negative")


class ProductResponse(BaseModel):
    id: int
    name: str
    sku: str
    price: float
    quantity: int

    class Config:
        from_attributes = True


# ------------------
# CUSTOMER SCHEMAS
# ------------------

class CustomerCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str = Field(min_length=10, max_length=10, pattern=r"^\d{10}$", description="Phone number must be exactly 10 digits")


class CustomerResponse(BaseModel):
    id: int
    full_name: str
    email: str
    phone: str

    class Config:
        from_attributes = True


# ------------------
# ORDER SCHEMAS
# ------------------

class OrderCreate(BaseModel):
    customer_id: int
    product_id: int
    quantity: int = Field(gt=0, description="Order quantity must be at least 1 item")


class OrderResponse(BaseModel):
    id: int
    customer_id: int
    product_id: int
    quantity: int
    total_amount: float

    class Config:
        from_attributes = True