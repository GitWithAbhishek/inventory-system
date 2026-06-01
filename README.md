# 🛒 Inventory & Order Management System

A streamlined full-stack application designed to manage products, customer profiles, and order workflows. Built with a high-performance Python backend, a responsive React frontend, and a managed PostgreSQL database, the entire system is fully containerized for seamless development and deployment.

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, Bootstrap 5, Axios
* **Backend:** FastAPI (Python 3.13), SQLAlchemy, Pydantic v2
* **Database:** PostgreSQL 16
* **DevOps:** Docker, Docker Compose

---

## 🚀 Key Features

* **Product Management:** Complete CRUD system with unique SKU tracking and data guardrails to block negative prices or stock quantities.
* **Customer Management:** Centralized client profiles with automated validation for emails (`EmailStr`) and 10-digit phone formats.
* **Order Processing:** Atomic order placements that automatically verify stock availability, compute total amounts, and reduce warehouse inventory instantly upon creation.
* **Live-Reload Mirroring:** Equipped with Docker volume links so changes made to your local source code take effect immediately without restarting containers.

---

## 📂 Project Structure

```text
inventory-system/
├── backend/
│   ├── app/
│   │   ├── routes/          # API endpoints (product, customer, order)
│   │   ├── main.py          # FastAPI application entrypoint
│   │   ├── database.py      # SQLAlchemy setup & database retry connection loop
│   │   ├── models.py        # PostgreSQL ORM models
│   │   ├── schemas.py       # Pydantic data request/response validators
│   │   └── crud.py          # Database query execution logic
│   ├── Dockerfile           # Backend container environment
│   └── requirements.txt     # Python package dependencies
├── frontend/
│   ├── src/                 # React source files (pages, components, services)
│   ├── Dockerfile           # Frontend runtime environment
│   └── package.json         # Node.js dependencies
└── docker-compose.yml       # Multi-service container orchestration

```
---

## ⚡ Running Locally

Because the entire stack is dockerized, you do not need to manually install Python, Node.js, or PostgreSQL on your computer.

### Prerequisites
Ensure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### Step-by-Step Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/GitWithAbhishek/inventory-system.git](https://github.com/GitWithAbhishek/inventory-system.git)
   cd inventory-system


2.  **🚀 Launch the Application:**
Run the following command in your terminal to build the images and spin up your containers:

```bash
docker-compose up --build
```
---
3. **🔗 Access the Platform Links**
Once the startup logs stabilize, open your browser and access the services:

* **Frontend Interface:** [http://localhost:5173](http://localhost:5173)
* **Interactive API Documentation (Swagger UI):** [http://localhost:8000/docs](http://localhost:8000/docs)
* **PostgreSQL Database:** Accessible internally on port `5432`

---

4. **Useful Commands:**
   * **Stop the application:** Press `Ctrl + C` in your running terminal, or execute `docker-compose down` in a separate window.
   * **Quick Restart (No Rebuild):** If you just need to cycle the network without changing structural configuration files or packages, run:
     ```bash
     docker-compose up
     ```
