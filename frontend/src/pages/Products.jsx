import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

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
      if (editingId) {
        await api.put(`/products/${editingId}`, {
          ...formData,
          price: Number(formData.price),
          quantity: Number(formData.quantity)
        });
      } else {
        await api.post("/products/", {
          ...formData,
          price: Number(formData.price),
          quantity: Number(formData.quantity)
        });
      }

      handleCancelEdit(); // Resets fields cleanly
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.detail || "Operation Failed");
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editProduct = (product) => {
    setFormData({
      name: product.name,
      sku: product.sku,
      price: product.price,
      quantity: product.quantity
    });
    setEditingId(product.id);
  };

  const handleCancelEdit = () => {
    setFormData({ name: "", sku: "", price: "", quantity: "" });
    setEditingId(null);
  };

  return (
    <div className="container-fluid py-4">
    {/* Top Header */}
    <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
      <div>
        <h2 className="fw-bold text-dark m-0">Products</h2>
        <p className="text-muted small m-0">Add, view, and delete items in your inventory.</p>
      </div>
      <span className="badge bg-primary px-3 py-2 fs-6 rounded-pill">
        Total Items: {products.length}
      </span>
    </div>

    <div className="row g-4">
      {/* Left Column: Form */}
      <div className="col-12 col-lg-4">
        <div className={`card shadow-sm border-0 rounded-3 ${editingId ? 'border-start border-warning border-4' : ''}`}>
          <div className="card-header py-3 bg-light text-dark">
            <h5 className="card-title fw-bold m-0 fs-6">
              {editingId ? "✏️ Edit Product" : "➕ Add New Product"}
            </h5>
          </div>
          
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-secondary small fw-semibold">Product Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g., Laptop"
                  className="form-control form-control-lg fs-6 shadow-none"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary small fw-semibold">SKU Code</label>
                <input
                  type="text"
                  name="sku"
                  placeholder="e.g., LAP001"
                  className="form-control form-control-lg fs-6 text-uppercase shadow-none"
                  value={formData.sku}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row g-3 mb-4">
                <div className="col-6">
                  <label className="form-label text-secondary small fw-semibold">Price</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted fs-6">₹</span>
                    <input
                      type="number"
                      name="price"
                      placeholder="0"
                      min="0.01"
                      step="0.01"
                      className="form-control form-control-lg fs-6 shadow-none"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <label className="form-label text-secondary small fw-semibold">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    placeholder="0"
                    min="0"
                    step="1"
                    className="form-control form-control-lg fs-6 shadow-none"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="d-grid gap-2">
                <button 
                  type="submit" 
                  className={`btn btn-lg fs-6 fw-semibold shadow-sm ${editingId ? 'btn-warning text-dark' : 'btn-primary'}`}
                >
                  {editingId ? "Save Changes" : "Add Product"}
                </button>
                
                {editingId && (
                  <button 
                    type="button" 
                    onClick={handleCancelEdit} 
                    className="btn btn-link btn-sm text-secondary text-decoration-none mt-1"
                  >
                    Cancel Editing
                  </button>
                )}
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
                  <th className="py-3 text-secondary text-uppercase fs-7">Product Details</th>
                  <th className="py-3 text-secondary text-uppercase fs-7">SKU</th>
                  <th className="py-3 text-secondary text-uppercase fs-7 text-end">Price</th>
                  <th className="py-3 text-secondary text-uppercase fs-7 text-center">Stock</th>
                  <th className="py-3 px-4 text-secondary text-uppercase fs-7 text-end" style={{ width: "160px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      No products found. Add one on the left!
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className={editingId === product.id ? "table-warning bg-opacity-25" : ""}>
                      <td className="px-4 text-muted">#{product.id}</td>
                      <td><div className="fw-bold text-dark fs-6">{product.name}</div></td>
                      <td><span className="badge bg-light text-dark border px-2 py-1">{product.sku}</span></td>
                      <td className="text-end fw-bold text-dark">₹{Number(product.price).toLocaleString("en-IN")}</td>
                      <td className="text-center">
                        <span className={`badge rounded-pill px-3 py-1.5 fw-semibold ${
                          product.quantity > 20 ? "bg-success bg-opacity-10 text-success" : product.quantity > 0 ? "bg-warning bg-opacity-10 text-warning-emphasis" : "bg-danger bg-opacity-10 text-danger"
                        }`}>
                          {product.quantity} items
                        </span>
                      </td>
                      <td className="px-4 text-end">
                        <div className="btn-group shadow-sm rounded">
                          <button className="btn btn-white btn-sm text-warning border border-end-0 bg-white" onClick={() => editProduct(product)}>Edit</button>
                          <button className="btn btn-white btn-sm text-danger border bg-white" onClick={() => deleteProduct(product.id)}>Delete</button>
                        </div>
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

export default Products;