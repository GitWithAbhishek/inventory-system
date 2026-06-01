import { Link } from "react-router-dom";
import {
  FaBoxes,
  FaUsers,
  FaShoppingCart,
  FaWarehouse
} from "react-icons/fa";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow"
      style={{
        background: "linear-gradient(90deg, #2563eb, #1e40af)"
      }}
    >
      {/* Injecting a small, scoped CSS style block to safely handle 
        smooth custom transitions and pseudo hover effects.
      */}
      <style>
        {`
          .custom-nav-link {
            transition: all 0.2s ease-in-out !important;
          }
          .custom-nav-link:hover {
            background-color: rgba(255, 255, 255, 0.15);
            transform: translateY(-1px);
            color: #f8fafc !important;
          }
        `}
      </style>

      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          <FaWarehouse className="me-2" />
          InventoryPro
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Added 'gap-4' below to easily increase the spacing between links */}
          <ul className="navbar-nav ms-auto gap-3">
            <li className="nav-item">
              <Link
                className="nav-link custom-nav-link text-white fw-semibold px-3 py-2 rounded"
                to="/"
              >
                <FaBoxes className="me-2" />
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link custom-nav-link text-white fw-semibold px-3 py-2 rounded"
                to="/customers"
              >
                <FaUsers className="me-2" />
                Customers
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link custom-nav-link text-white fw-semibold px-3 py-2 rounded"
                to="/orders"
              >
                <FaShoppingCart className="me-2" />
                Orders
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;