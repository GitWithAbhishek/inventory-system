import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    customer_id: "",
    product_id: "",
    quantity: ""
  });

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post("/orders/", {
        customer_id: Number(formData.customer_id),
        product_id: Number(formData.product_id),
        quantity: Number(formData.quantity)
      });

      setFormData({
        customer_id: "",
        product_id: "",
        quantity: ""
      });

      fetchOrders();
      fetchProducts();

      alert("Order Created Successfully");

    } catch (error) {

      alert(
        error.response?.data?.detail ||
        "Failed to create order"
      );

    }

  };

  const deleteOrder = async (id) => {

    try {

      await api.delete(`/orders/${id}`);

      fetchOrders();

    } catch (error) {
      console.log(error);
    }

  };

  return (
   <div className="container-fluid py-4">
    {/* Top Header */}
    <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
      <div>
        <h2 className="fw-bold text-dark m-0">Orders</h2>
        <p className="text-muted small m-0">Create new orders and view past transactions.</p>
      </div>
      <span className="badge bg-primary px-3 py-2 fs-6 rounded-pill">
        Total Orders: {orders.length}
      </span>
    </div>

    <div className="row g-4">
      {/* Left Column: Form */}
      <div className="col-12 col-lg-4">
        <div className="card shadow-sm border-0 rounded-3">
          <div className="card-header py-3 bg-light text-dark">
            <h5 className="card-title fw-bold m-0 fs-6">🛒 Create New Order</h5>
          </div>
          
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-secondary small fw-semibold">Choose Customer</label>
                <select
                  name="customer_id"
                  className="form-select form-select-lg fs-6 shadow-none"
                  value={formData.customer_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                      {customer.full_name} (ID: {customer.id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary small fw-semibold">Choose Product</label>
                <select
                  name="product_id"
                  className="form-select form-select-lg fs-6 shadow-none"
                  value={formData.product_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a product</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id} disabled={product.quantity <= 0}>
                      {product.name} {product.quantity <= 0 ? "(Out of Stock)" : `(Available: ${product.quantity})`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary small fw-semibold">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="How many items?"
                  min="1"
                  className="form-control form-control-lg fs-6 shadow-none"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg fs-6 fw-semibold shadow-sm">
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Column: Table */}
      <div className="col-12 col-lg-8">
        <div className="card shadow-sm border-0 rounded-3">
          <div className="table-responsive" style={{ maxHeight: "650px" }}>
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light sticky-top">
                <tr>
                  <th className="py-3 px-4 text-secondary text-uppercase fs-7" style={{ width: "80px" }}>ID</th>
                  <th className="py-3 text-secondary text-uppercase fs-7">Customer</th>
                  <th className="py-3 text-secondary text-uppercase fs-7">Product</th>
                  <th className="py-3 text-secondary text-uppercase fs-7 text-center">Quantity</th>
                  <th className="py-3 text-secondary text-uppercase fs-7 text-end">Total Price</th>
                  <th className="py-3 px-4 text-secondary text-uppercase fs-7 text-end" style={{ width: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      No orders placed yet.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-4 text-muted">#{order.id}</td>
                      <td><div className="fw-bold text-dark fs-6">{order.customer?.name || order.customer || "Unknown"}</div></td>
                      <td><span className="text-secondary fw-semibold">{order.product?.name || order.product || "Deleted Item"}</span></td>
                      <td className="text-center"><span className="badge bg-light text-dark border px-2 py-1">{order.quantity} items</span></td>
                      <td className="text-end fw-bold text-success fs-6">₹{Number(order.total_amount).toLocaleString("en-IN")}</td>
                      <td className="px-4 text-end">
                        <button className="btn btn-outline-danger btn-sm rounded px-2.5 py-1" onClick={() => deleteOrder(order.id)}>
                          Cancel Order
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Orders;