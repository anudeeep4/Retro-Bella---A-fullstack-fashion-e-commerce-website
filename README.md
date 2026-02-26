# Retro Bella - Modern Fashion Store

Retro Bella is a full-stack e-commerce application designed for a seamless fashion shopping experience. It features a modern user interface, secure authentication, and a robust backend for managing products, carts, and wishlists.

## 🚀 Features

- **User Authentication:** Secure signup and login using JWT (JSON Web Tokens) and bcrypt for password hashing.
- **Product Catalog:** Browse various categories including Men's Fashion, Women's Fashion, Kids' Wear, Cosmetics, Accessories, and Footwear.
- **Shopping Cart:** Add, remove, and manage items in your cart.
- **Wishlist:** Save your favorite items for later.
- **Responsive UI:** A clean, modern, and fully responsive design built with Bootstrap 5 and custom CSS.
- **Interactive Background:** A unique, animated "GitHub-style" contribution grid background on the login page.

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+), Bootstrap 5.3.3.
- **Backend:** Node.js, Express.js.
- **Database:** MySQL with Sequelize ORM.
- **Security:** JWT (Authentication), bcryptjs (Hashing).
- **Other Dependencies:** Cors, Dotenv.

## 📂 Project Structure

```text
fashion_store/
├── backend/
│   ├── config/          # Database configuration
│   ├── middleware/      # Authentication middleware
│   ├── models/          # Sequelize models (User, Product, Cart, Wishlist)
│   ├── routes/          # API endpoints
│   ├── seeder.js        # Script to populate initial product data
│   └── server.js        # Main entry point for the backend
└── frontend/
    ├── pics/            # Product images and assets
    ├── index.html       # Landing/Login page
    ├── home.html        # Main product browsing page
    ├── category.html    # Category-specific browsing
    ├── cart.html        # Shopping cart page
    ├── wishlist.html    # Wishlist page
    └── checkout.html    # Checkout interface
```

## ⚙️ Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) installed.
- [MySQL](https://www.mysql.com/) database server running.

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd fashion_store
```

### 2. Backend Configuration
Navigate to the `backend` folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add your credentials:
```env
PORT=5000
DB_NAME=fashion_store
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
JWT_SECRET=your_secret_key_here
```

### 3. Initialize Database & Seed Data
Run the seeder script to create tables and populate the initial products:
```bash
node seeder.js
```

### 4. Start the Server
```bash
npm start
# or
node server.js
```

### 5. Frontend Setup
The frontend is built with vanilla HTML/JS. You can serve it using any local web server (like VS Code's "Live Server" extension) or simply open `frontend/index.html` in your browser.

> **Note:** Ensure the backend is running on the port specified in your `.env` (default: 5000) for the frontend to communicate with the API.

## Project done by Anudeep R Gayakwad
