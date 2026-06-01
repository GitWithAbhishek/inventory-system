from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Product, Customer, Order
from app.schemas import OrderCreate

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


# CREATE ORDER

@router.post("/")
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db)
):

    customer = db.query(Customer).filter(
        Customer.id == order.customer_id
    ).first()

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    product = db.query(Product).filter(
        Product.id == order.product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    if order.quantity <= 0:
        raise HTTPException(
            status_code=400,
            detail="Quantity must be greater than zero"
        )

    if product.quantity < order.quantity:
        raise HTTPException(
            status_code=400,
            detail="Insufficient inventory"
        )

    total_amount = (
        product.price * order.quantity
    )

    # Reduce Stock
    product.quantity -= order.quantity

    new_order = Order(
        customer_id=order.customer_id,
        product_id=order.product_id,
        quantity=order.quantity,
        total_amount=total_amount
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return {
        "message": "Order created successfully",
        "order": {
            "id": new_order.id,
            "customer": customer.full_name,
            "product": product.name,
            "quantity": new_order.quantity,
            "total_amount": new_order.total_amount
        }
    }


# GET ALL ORDERS

# GET ALL ORDERS (Indentation Fixed Here!)
@router.get("/")
def get_orders(
    db: Session = Depends(get_db)
):
    orders = db.query(Order).all()
    result = []

    for order in orders:
        result.append({
            "id": order.id,
            "customer": {
                "id": order.customer.id,
                "name": order.customer.full_name
            },
            "product": {
                "id": order.product.id,
                "name": order.product.name
            },
            "quantity": order.quantity,
            "total_amount": order.total_amount
        })

    return result

# GET ORDER BY ID

@router.get("/{order_id}")
def get_order(
    order_id: int,
    db: Session = Depends(get_db)
):

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return {
    "id": order.id,

    "customer": {
        "id": order.customer.id,
        "name": order.customer.full_name
    },

    "product": {
        "id": order.product.id,
        "name": order.product.name,
        "sku": order.product.sku
    },

    "quantity": order.quantity,

    "total_amount": order.total_amount
}


# DELETE ORDER

@router.delete("/{order_id}")
def delete_order(
    order_id: int,
    db: Session = Depends(get_db)
):

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    db.delete(order)
    db.commit()

    return {
        "message": "Order deleted successfully"
    }