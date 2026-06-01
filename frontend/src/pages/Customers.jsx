import { useEffect, useState } from "react";
import api from "../services/api";

function Customers() {

  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {

      const res = await api.get("/customers");

      setCustomers(res.data);

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

      await api.post(
        "/customers/",
        formData
      );

      setFormData({
        full_name: "",
        email: "",
        phone: ""
      });

      fetchCustomers();

    } catch (error) {

      alert(
        error.response?.data?.detail ||
        "Error creating customer"
      );

    }

  };

  const deleteCustomer = async (id) => {

    try {

      await api.delete(`/customers/${id}`);

      fetchCustomers();

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="container-fluid py-4">
      {/* Top Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold text-dark m-0">Customers</h2>
          <p className="text-muted small m-0">Add, view, and manage your customer list.</p>
        </div>
        <span className="badge bg-primary px-3 py-2 fs-6 rounded-pill">
          Total Customers: {customers.length}
        </span>
      </div>

      <div className="row g-4">
        {/* Left Column: Form */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-header py-3 bg-light text-dark">
              <h5 className="card-title fw-bold m-0 fs-6">👤 Add New Customer</h5>
            </div>
            
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-semibold">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    placeholder="e.g., John Doe"
                    className="form-control form-control-lg fs-6 shadow-none"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary small fw-semibold">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g., john@example.com"
                    className="form-control form-control-lg fs-6 shadow-none"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-secondary small fw-semibold">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="e.g., 9876543210"
                    className="form-control form-control-lg fs-6 shadow-none"
                    value={formData.phone}
                    onChange={handleChange}
                    minLength="10"
                    maxLength="10"
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit mobile number (numbers only)."
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-success btn-lg fs-6 fw-semibold shadow-sm">
                    Save Customer
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
                    <th className="py-3 text-secondary text-uppercase fs-7">Customer Details</th>
                    <th className="py-3 text-secondary text-uppercase fs-7">Email</th>
                    <th className="py-3 text-secondary text-uppercase fs-7">Phone</th>
                    <th className="py-3 px-4 text-secondary text-uppercase fs-7 text-end" style={{ width: "120px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-5 text-muted">
                        No customers found. Add one on the left!
                      </td>
                    </tr>
                  ) : (
                    customers.map((customer) => (
                      <tr key={customer.id}>
                        <td className="px-4 text-muted">#{customer.id}</td>
                        <td>
                          <div className="fw-bold text-dark fs-6">{customer.full_name}</div>
                        </td>
                        <td>
                          <span className="text-secondary">{customer.email}</span>
                        </td>
                        <td>
                          <span className="text-dark font-monospace">{customer.phone}</span>
                        </td>
                        <td className="px-4 text-end">
                          <button
                            className="btn btn-outline-danger btn-sm rounded px-2.5 py-1"
                            onClick={() => deleteCustomer(customer.id)}
                          >
                            Delete
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

export default Customers;