# 🍔 Food Cart - MERN Stack Application

A modern full-stack food delivery and e-commerce application built with the MERN (MongoDB, Express, React, Node.js) stack. This application allows users to browse food items, manage shopping carts, place orders, and communicate with administrators in real-time.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Frontend Pages](#frontend-pages)
- [Database Models](#database-models)
- [Real-time Features](#real-time-features)
- [Contributing](#contributing)

## ✨ Features

### User Features

- **Authentication**: User registration and login with JWT tokens
- **Product Browsing**: Browse food items by category with detailed product information
- **Shopping Cart**: Add/remove items, manage quantities, view cart total
- **Favorites/Wishlist**: Save favorite items for later
- **Order Management**: Place orders, view order history, track order status
- **Reviews & Ratings**: Leave reviews and ratings for products
- **User Settings**: Update profile information and delivery address
- **Real-time Chat**: Communicate with administrators via socket.io
- **Responsive Design**: Fully responsive UI using Tailwind CSS

### Admin Features

- **Dashboard**: View order statistics and analytics
- **Product Management**: Add, edit, delete products
- **Order Management**: View and manage customer orders
- **Chat**: Respond to customer inquiries in real-time
- **Cart Management**: View customer shopping carts
- **Favorites Management**: Track popular items

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB with Mongoose v8.14.3
- **Authentication**: JWT (jsonwebtoken v9.0.2)
- **Password Hashing**: bcryptjs v3.0.2
- **Real-time**: Socket.io v4.8.1
- **Email**: Nodemailer v7.0.5
- **Development**: Nodemon v3.1.10
- **CORS**: CORS middleware v2.8.5

### Frontend

- **Library**: React v19.1.0
- **Language**: TypeScript
- **Build Tool**: Vite v6.3.5
- **Routing**: React Router DOM v7.6.0
- **State Management**: React Context API
- **Styling**: Tailwind CSS v3.4.17
- **Forms**: React Hook Form v7.56.3
- **Animations**: Framer Motion v12.11.0
- **HTTP Client**: Axios v1.9.0
- **Real-time**: Socket.io-client v4.8.1
- **Notifications**: React Toastify v11.0.5
- **Icons**: React Icons v5.5.0, Heroicons v2.2.0
- **Carousel**: React Responsive Carousel v3.2.23
- **Ratings**: React Star Ratings v2.3.0

## 📁 Project Structure

```
food_cart/
├── backend/                    # Node.js + Express server
│   ├── controllers/           # Request handlers
│   │   ├── authController.js          # User auth logic
│   │   ├── cartController.js          # Cart management
│   │   ├── favController.js           # Favorites management
│   │   ├── orderController.js         # Order processing
│   │   ├── productController.js       # Product operations
│   │   ├── reviewController.js        # Review management
│   │   └── Admin/                     # Admin-specific controllers
│   ├── models/                 # Mongoose schemas
│   │   ├── User.js            # User schema
│   │   ├── Product.js         # Product schema
│   │   ├── Cart.js            # Shopping cart schema
│   │   ├── Order.js           # Order schema
│   │   ├── Fav.js             # Favorites schema
│   │   ├── review.js          # Review schema
│   │   ├── adminUser.js       # Admin user schema
│   │   └── chatServiceModel/
│   │       └── Chat.js        # Chat messages schema
│   ├── routes/                 # API route definitions
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── favRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── fetchAdmin.js
│   │   └── Admin/              # Admin routes
│   ├── middleware/             # Custom middleware
│   │   ├── auth.js            # JWT authentication
│   │   ├── sendEmail.js       # Email sending
│   │   └── Admin/
│   │       └── auth.js        # Admin authentication
│   ├── chatServiceController/  # Chat functionality
│   │   ├── chatService.js
│   │   └── fetchAdmin.js
│   ├── server.js              # Express server setup + Socket.io
│   ├── package.json           # Dependencies
│   └── .env                   # Environment variables (create this)
│
└── Food-cart/                 # React + TypeScript frontend (primary)
    ├── src/
    │   ├── pages/             # Page components
    │   │   ├── Home.tsx               # Dashboard/home page
    │   │   ├── LandingPage.tsx        # Landing page (public)
    │   │   ├── Login.tsx              # Login page
    │   │   ├── Register.tsx           # Registration page
    │   │   ├── ProductPage.tsx        # Single product detail
    │   │   ├── CategoryPage.tsx       # Products by category
    │   │   ├── Cart.tsx               # Shopping cart
    │   │   ├── Checkout.tsx           # Checkout process
    │   │   ├── Favourite.tsx          # Wishlist
    │   │   ├── Settings.tsx           # User settings
    │   │   ├── Review.tsx             # Reviews page
    │   │   ├── ChatPage.tsx           # Chat with admin
    │   │   └── PageNotFound.tsx       # 404 page
    │   ├── components/         # Reusable components
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   ├── Layout.tsx
    │   │   ├── Product.tsx
    │   │   ├── cartProduct.tsx
    │   │   ├── AdminList.tsx
    │   │   ├── HomePageComp/
    │   │   ├── OrdersComp/
    │   │   ├── SettingsComp/
    │   │   └── utils/
    │   ├── context/            # State management (Context API)
    │   │   ├── authStore.tsx          # Auth state
    │   │   ├── cartStore.tsx          # Cart state
    │   │   ├── favouriteStore.tsx     # Favorites state
    │   │   ├── orderStore.tsx         # Orders state
    │   │   ├── productStore.tsx       # Products state
    │   │   ├── reviewStore.tsx        # Reviews state
    │   │   └── store.tsx
    │   ├── lib/
    │   │   └── api.ts          # API client configuration
    │   ├── types/              # TypeScript definitions
    │   │   └── types.ts
    │   ├── ProtectedRoutes/    # Route protection
    │   │   └── ProtectedRoutes.tsx
    │   ├── assets/             # Images, videos, GIFs
    │   ├── App.tsx             # Main app component
    │   ├── main.tsx            # React entry point
    │   └── index.css
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    └── tailwind.config.js
│
└── frontend/                  # Alternative frontend (secondary)
    └── [Similar structure to Food-cart]

└── food_cart_data.json        # Sample product data
```

## 📦 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local instance or MongoDB Atlas cloud database)
- **Git** (optional)

## 🚀 Installation

### 1. Clone or Extract the Repository

```bash
cd d:\MERN\Food-cart
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../Food-cart
npm install
```

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/food_cart
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/food_cart

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Admin JWT Secret (if different)
ADMIN_JWT_SECRET=your_admin_jwt_secret_key_here

# Email Configuration (for Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@foodcart.com

# Server Port
PORT=5000

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

### Frontend Configuration

The frontend API endpoint is configured in `Food-cart/src/lib/api.ts`. Ensure the backend server URL matches your backend configuration.

## 🎯 Running the Application

### Start the Backend Server

```bash
cd backend
npm start
```

The server will run on `http://localhost:5000` and watch for file changes with nodemon.

### Start the Frontend Development Server

Open a new terminal:

```bash
cd Food-cart
npm run dev
```

The frontend will typically run on `http://localhost:5173`.

### Build for Production

**Frontend Build:**

```bash
cd Food-cart
npm run build
```

**Linting:**

```bash
npm run lint
```

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /register` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /profile` - Get user profile (protected)
- `PUT /profile` - Update user profile (protected)

### Product Routes (`/api/products`)

- `GET /` - Get all products
- `GET /:id` - Get single product
- `GET /category/:name` - Get products by category
- `POST /` - Create product (admin)
- `PUT /:id` - Update product (admin)
- `DELETE /:id` - Delete product (admin)

### Cart Routes (`/api/cart`)

- `GET /` - Get user's cart (protected)
- `POST /add` - Add item to cart (protected)
- `PUT /update/:productId` - Update cart item quantity (protected)
- `DELETE /:productId` - Remove item from cart (protected)
- `DELETE /` - Clear cart (protected)

### Order Routes (`/api/orders`)

- `GET /` - Get user's orders (protected)
- `POST /` - Create new order (protected)
- `GET /:id` - Get order details (protected)
- `PUT /:id` - Update order status (admin)
- `DELETE /:id` - Cancel order (protected)

### Favorites Routes (`/api/favorites`)

- `GET /` - Get user's favorites (protected)
- `POST /add` - Add to favorites (protected)
- `DELETE /:productId` - Remove from favorites (protected)

### Review Routes (`/api/reviews`)

- `GET /product/:productId` - Get reviews for product
- `POST /` - Create review (protected)
- `PUT /:id` - Update review (protected)
- `DELETE /:id` - Delete review (protected)

### Admin Routes (`/api/admin`)

- `POST /auth/login` - Admin login
- `GET /dashboard` - Dashboard stats (admin)
- `GET /orders` - All orders (admin)
- `GET /products` - All products (admin)
- `GET /users` - All users (admin)

### Chat Routes

- Socket.io events: `join`, `chatMessage`, `disconnect`

## 📄 Frontend Pages

| Page           | Route                     | Protected | Description                     |
| -------------- | ------------------------- | --------- | ------------------------------- |
| Landing        | `/`                       | No        | Homepage with featured items    |
| Login          | `/login`                  | No        | User login page                 |
| Register       | `/register`               | No        | User registration page          |
| Dashboard      | `/dashboard`              | Yes       | Main user dashboard             |
| Product Detail | `/products/:productId`    | Yes       | Single product page             |
| Category       | `/category/:categoryName` | Yes       | Products filtered by category   |
| Cart           | `/cart`                   | Yes       | Shopping cart page              |
| Checkout       | `/checkout`               | Yes       | Order checkout page             |
| Favorites      | `/favourites`             | Yes       | Wishlist/favorites page         |
| Settings       | `/settings`               | Yes       | User profile settings           |
| Chat           | `/chat`                   | Yes       | Chat with admin (commented out) |
| 404            | `*`                       | No        | Page not found                  |

## 💾 Database Models

### User Schema

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, minlength: 6),
  address: String,
  phone: String,
  createdAt: Date (default: now)
}
```

### Product Schema

```javascript
{
  name: String (required),
  description: String,
  price: Number (required, min: 0),
  image: String (required),
  category: String (required),
  rating: Number (default: 0, min: 0, max: 5),
  timestamps: true
}
```

### Cart Schema

- User reference
- Product reference
- Quantity

### Order Schema

- User reference
- Items array (product + quantity)
- Total price
- Status (pending, processing, delivered, cancelled)
- Delivery address
- Order date and timestamps

### Favorites Schema

- User reference
- Array of product references

### Review Schema

- User reference
- Product reference
- Rating (1-5)
- Comment
- Timestamps

### Chat Schema

- From (user ID)
- From Model (User/AdminUser)
- To (user ID)
- To Model (User/AdminUser)
- Message text
- Timestamp

## 🔄 Real-time Features

The application uses **Socket.io** for real-time communication:

### Chat Features

- Users can chat with administrators
- Messages are stored in MongoDB
- Real-time notification delivery
- User identification and role-based messaging

### Socket.io Events

- `join` - User joins chat (sends userId and role)
- `chatMessage` - Send/receive messages
- `disconnect` - User disconnects

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **User Registration/Login**: JWT token issued on successful auth
2. **Token Storage**: Tokens stored in context (authStore)
3. **Protected Routes**: Routes require valid token via ProtectedRoutes component
4. **Middleware Protection**: API routes have auth middleware checks
5. **Admin Authentication**: Separate authentication for admin users

## 📧 Email Notifications

Nodemailer is configured to send:

- Order confirmation emails
- Order status update emails
- Password reset emails (if implemented)

## 🎨 Frontend Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Animations**: Smooth animations using Framer Motion
- **Form Handling**: React Hook Form for efficient form management
- **Notifications**: React Toastify for user feedback
- **Carousel**: Product carousel on homepage
- **Star Ratings**: Interactive star rating system for reviews
- **Icons**: Comprehensive icon library from React Icons and Heroicons

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📝 Notes

- The `frontend/` folder is an alternative frontend setup; the primary frontend is in `Food-cart/`
- The `food_cart_data.json` contains sample product data for seeding
- Socket.io chat feature is currently commented out in some places but fully implemented
- Some pages like ChatPage are commented out in routing

## 🐛 Troubleshooting

- **MongoDB Connection Issue**: Ensure MongoDB is running or check MONGODB_URI in .env
- **Port Already in Use**: Change PORT in .env (default: 5000)
- **CORS Errors**: Verify CLIENT_URL in backend .env matches frontend URL
- **Module Not Found**: Run `npm install` again in both backend and frontend directories
- **TypeScript Errors**: Ensure TypeScript version is compatible, run `npm install` to update

## 📄 License

This project is licensed under the ISC License.

## ✉️ Support

For issues or questions, please check the code comments and model definitions for more details about specific implementations.

---

**Happy Coding!** 🍕🍔🍜
