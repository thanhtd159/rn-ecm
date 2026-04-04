const jsonServer = require("json-server");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");

const wishlistRoutes = require("./routes/wishlist");
const orderRoutes = require("./routes/order");
const paymentRoutes = require("./routes/payment");
const reviewRoutes = require("./routes/review");
const adminRoutes = require("./routes/admin");
const couponRoutes = require("./routes/coupon");
const shippingRoutes = require("./routes/shipping");
const inventoryRoutes = require("./routes/inventory");
const analyticsRoutes = require("./routes/analytics");
const dev1000Routes = require("./routes/dev1000");

const server = jsonServer.create();
const router = jsonServer.router("db.json");

server.use(cors());
server.use(bodyParser.json());

authRoutes(server, router);
productRoutes(server, router);
cartRoutes(server, router);

wishlistRoutes(server, router);
orderRoutes(server, router);
paymentRoutes(server, router);
reviewRoutes(server, router);
adminRoutes(server, router);
couponRoutes(server, router);
shippingRoutes(server, router);
inventoryRoutes(server, router);
analyticsRoutes(server, router);
dev1000Routes(server, router);

server.use(router);

server.listen(3000, () => {
  console.log("Mock API running on 3000");
});
