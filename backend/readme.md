# E-Commerce Mock Backend (json-server)

Mock backend REST API cho ứng dụng e-commerce dùng để test frontend (React Native / React / Angular).

## Features

- JWT Authentication
- Refresh Token
- CRUD Products
- Cart
- Wishlist
- Checkout
- Orders
- Payment Mock
- Product Review + Rating
- Pagination
- Filter
- Search
- Admin Dashboard

---

# 1. Tech Stack

- Node.js
- json-server
- jsonwebtoken
- cors
- body-parser
- uuid

---

# 2. Project Structure

```
backend
│
├── db.json
├── server.js
├── package.json
│
├── middleware
│   └── auth.js
│
├── routes
│   ├── auth.js
│   ├── products.js
│   ├── cart.js
│   ├── wishlist.js
│   ├── order.js
│   ├── payment.js
│   ├── review.js
│   └── admin.js
│
└── api.http
```

---

# 3. Create Project

```
mkdir backend
cd backend
npm init -y
```

---

# 4. Install Dependencies

```
npm install json-server@0.17.4 jsonwebtoken cors body-parser uuid
npm install nodemon --save-dev
```

---

# 5. Setup package.json

```
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js"
}
```

---

# 6. Database

Create file:

```
db.json
```

Example data:

```json
{
  "users": [
    {
      "id": 1,
      "username": "admin",
      "password": "123456",
      "role": "admin"
    }
  ],
  "products": [],
  "carts": [],
  "wishlist": [],
  "orders": [],
  "reviews": [],
  "payments": []
}
```

---

# 7. Auth Middleware

File:

```
middleware/auth.js
```

```javascript
const jwt = require("jsonwebtoken");

const SECRET = "ACCESS_SECRET";

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token invalid" });
    }

    req.user = user;
    next();
  });
}

module.exports = verifyToken;
```

---

# 8. Server Setup

File:

```
server.js
```

```javascript
const jsonServer = require("json-server");
const bodyParser = require("body-parser");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json");

server.use(cors());
server.use(bodyParser.json());

require("./routes/auth")(server, router);
require("./routes/products")(server, router);
require("./routes/cart")(server, router);
require("./routes/wishlist")(server, router);
require("./routes/order")(server, router);
require("./routes/payment")(server, router);
require("./routes/review")(server, router);
require("./routes/admin")(server, router);

server.use(router);

server.listen(3000, () => {
  console.log("Mock API running on 3000");
});
```

---

# 9. Run Backend

```
npm run dev
```

API base URL

```
http://localhost:3000
```

---

# 10. Authentication API

## Login

```
POST /auth/login
```

```
{
 "username":"admin",
 "password":"123456"
}
```

Response

```
{
 "accessToken":"",
 "refreshToken":""
}
```

---

## Refresh Token

```
POST /auth/refresh
```

---

# 11. Product API

## Get products

```
GET /products?page=1&limit=10
```

## Search

```
GET /products?search=iphone
```

## Filter

```
GET /products?category=phone
```

## Create product

```
POST /products
```

## Update

```
PUT /products/:id
```

## Delete

```
DELETE /products/:id
```

---

# 12. Cart API

```
GET /cart
POST /cart/add
DELETE /cart/item/:id
```

Example

```
POST /cart/add
```

```
{
 "productId":1,
 "quantity":2
}
```

---

# 13. Wishlist API

```
GET /wishlist
POST /wishlist/add
DELETE /wishlist/:id
```

---

# 14. Checkout + Orders

Checkout cart

```
POST /checkout
```

Orders

```
GET /orders
GET /orders/:id
```

---

# 15. Payment Mock

```
POST /payment
```

Example

```
{
 "orderId":1,
 "method":"momo"
}
```

Methods:

- credit_card
- momo
- zalopay
- cod

---

# 16. Product Review

Create review

```
POST /reviews
```

```
{
 "productId":1,
 "rating":5,
 "comment":"Great product"
}
```

Get reviews

```
GET /reviews/:productId
```

---

# 17. Admin Dashboard

```
GET /admin/dashboard
```

Response

```
{
 totalUsers:10,
 totalProducts:100,
 totalOrders:50,
 revenue:120000000
}
```

---

# 18. Pagination

```
GET /products?page=2&limit=10
```

---

# 19. Search

```
GET /products?search=iphone
```

---

# 20. Filter

```
GET /products?category=phone
```

---

# 21. Test API in VS Code

Install extension:

REST Client

Create file:

```
api.http
```

Example

```
POST http://localhost:3000/auth/login
Content-Type: application/json

{
 "username":"admin",
 "password":"123456"
}
```

Click

```
Send Request
```

---

# 22. Full API List

Auth

```
POST /auth/login
POST /auth/refresh
```

Products

```
GET /products
GET /products/:id
POST /products
PUT /products/:id
DELETE /products/:id
```

Cart

```
GET /cart
POST /cart/add
DELETE /cart/item/:id
```

Wishlist

```
GET /wishlist
POST /wishlist/add
DELETE /wishlist/:id
```

Orders

```
POST /checkout
GET /orders
GET /orders/:id
```

Payment

```
POST /payment
```

Review

```
POST /reviews
GET /reviews/:productId
```

Admin

```
GET /admin/dashboard
```

---

# 23. E-Commerce Flow

```
Login
   ↓
Browse Products
   ↓
Add Cart
   ↓
Checkout
   ↓
Create Order
   ↓
Payment
   ↓
Order Paid
   ↓
Review Product
```

---

# 24. Run Full System

Start backend

```
npm run dev
```

Test API

```
api.http
```

Frontend (React Native)

```
fetch("http://localhost:3000/products")
```

---

# 25. Next Improvements

Possible extensions:

- product image upload
- product variants
- coupon system
- shipping fee
- order tracking
- notification
- analytics

---

# STEP 26–40: Advanced E-Commerce Mock Backend

Các bước này mở rộng mock backend để gần giống **production backend** hơn, phục vụ training cho React Native / Redux / Saga.

Bao gồm:

- 1000 products seed data
- product variants (size/color)
- coupon + discount engine
- shipping calculation
- inventory system
- analytics API

---

# STEP 26 – Seed 1000 Products

Tạo file:

```
scripts/seed-products.js
```

```javascript
const fs = require("fs");

const products = [];

const categories = ["phone", "laptop", "tablet", "accessory"];

for (let i = 1; i <= 1000; i++) {
  products.push({
    id: i,
    name: `Product ${i}`,
    price: Math.floor(Math.random() * 1000) + 100,
    category: categories[Math.floor(Math.random() * categories.length)],
    stock: Math.floor(Math.random() * 100),
    rating: 0,
  });
}

const db = require("../db.json");

db.products = products;

fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

console.log("Seeded 1000 products");
```

Run:

```
node scripts/seed-products.js
```

---

# STEP 27 – Product Variants

Database update

```
products
productVariants
```

Example:

```json
{
  "productVariants": [
    {
      "id": 1,
      "productId": 1,
      "size": "M",
      "color": "Red",
      "price": 120,
      "stock": 50
    }
  ]
}
```

---

# STEP 28 – Variant API

Routes:

```
GET /products/:id/variants
POST /variants
PUT /variants/:id
DELETE /variants/:id
```

Example response:

```json
[
  {
    "size": "M",
    "color": "Black",
    "stock": 20
  }
]
```

---

# STEP 29 – Coupon Database

Add table:

```
coupons
```

Example:

```json
{
  "coupons": [
    {
      "code": "SALE10",
      "type": "percent",
      "value": 10,
      "expireAt": "2026-12-31"
    }
  ]
}
```

---

# STEP 30 – Coupon Validation API

```
POST /coupon/validate
```

Body:

```json
{
  "code": "SALE10",
  "total": 100
}
```

Response:

```json
{
  "discount": 10,
  "finalTotal": 90
}
```

---

# STEP 31 – Discount Engine

Logic:

```
if coupon.type === percent
discount = total * value / 100

if coupon.type === fixed
discount = value
```

Apply during checkout.

---

# STEP 32 – Shipping Database

Add:

```
shippingZones
```

Example:

```json
{
  "shippingZones": [
    {
      "region": "HN",
      "fee": 2
    },
    {
      "region": "HCM",
      "fee": 3
    }
  ]
}
```

---

# STEP 33 – Shipping Calculation API

```
POST /shipping/calculate
```

Body:

```json
{
  "region": "HN",
  "weight": 2
}
```

Response:

```json
{
  "shippingFee": 4
}
```

Calculation:

```
shippingFee = baseFee * weight
```

---

# STEP 34 – Inventory Table

Add table:

```
inventory
```

Example:

```json
{
  "inventory": [
    {
      "productId": 1,
      "variantId": 1,
      "quantity": 100
    }
  ]
}
```

---

# STEP 35 – Inventory API

Routes:

```
GET /inventory
POST /inventory
PUT /inventory/:id
```

Admin only.

---

# STEP 36 – Auto Reduce Inventory

When order created:

```
inventory.quantity -= orderItem.quantity
```

Implement inside checkout route.

---

# STEP 37 – Order Status System

Order statuses:

```
pending
paid
shipping
completed
cancelled
```

Update API:

```
PUT /orders/:id/status
```

---

# STEP 38 – Analytics Database

Create data aggregation:

```
analytics
```

Data derived from orders.

---

# STEP 39 – Analytics API

Endpoints:

```
GET /analytics/revenue
GET /analytics/top-products
GET /analytics/orders-by-day
```

Example:

```
GET /analytics/revenue
```

Response:

```json
{
  "revenue": 120000
}
```

---

# STEP 40 – Top Products Analytics

```
GET /analytics/top-products
```

Response:

```json
[
  {
    "productId": 1,
    "sold": 120
  },
  {
    "productId": 2,
    "sold": 80
  }
]
```

---

# Final Backend Architecture

```
backend
│
├── auth
├── products
├── variants
├── cart
├── wishlist
├── orders
├── coupons
├── shipping
├── inventory
├── reviews
├── analytics
│
└── admin
```

Total APIs ~40+

---

# Full E-Commerce Flow

```
User Login
   ↓
Browse Products
   ↓
Select Variant
   ↓
Add Cart
   ↓
Apply Coupon
   ↓
Calculate Shipping
   ↓
Checkout
   ↓
Create Order
   ↓
Payment
   ↓
Update Inventory
   ↓
Analytics Update
```

---

# Recommended Next Features

Future extensions:

- product image upload
- product recommendations
- notification system
- search engine
- elasticsearch
- caching layer

---

END
