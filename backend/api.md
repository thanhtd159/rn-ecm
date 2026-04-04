ext:
Rest client
json-server

start: node server.js
npm install json-server jsonwebtoken cors body-parser uuid

API Flow cho React Native
Auth
POST /auth/login
POST /auth/refresh

Product
GET /products
GET /products/:id
POST /products
PUT /products/:id
DELETE /products/:id

Wishlist
GET /wishlist
POST /wishlist/add
DELETE /wishlist/:id

Cart
GET /cart
POST /cart/add
DELETE /cart/item

Order + Checkout
POST /checkout
GET /orders
GET /orders/:id

Payment
POST /payment

Review
POST /reviews
GET /reviews/:productId

Admin
GET /admin/dashboard

API structure:
POST /auth/login
POST /auth/refresh

GET /products
GET /products/:id
POST /products
PUT /products/:id
DELETE /products/:id

GET /cart
POST /cart/add
DELETE /cart/item

---

Auth
Products
Cart
Wishlist
Checkout
Payment
Reviews
Admin dashboard
Product variants
Coupon engine
Shipping calculation
Inventory system
Analytics
Seed 1000 products
