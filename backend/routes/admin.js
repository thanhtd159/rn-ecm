const verifyToken = require("../middleware/auth");

function adminRoutes(server, router) {
  server.get("/admin/dashboard", verifyToken, (req, res) => {
    const products = router.db.get("products").value();
    const orders = router.db.get("orders").value();
    const users = router.db.get("users").value();

    const totalRevenue = orders
      .filter((o) => o.status === "paid")
      .reduce((sum, order) => {
        const total = order.items.reduce((s, i) => s + i.price * i.quantity, 0);

        return sum + total;
      }, 0);

    res.json({
      totalUsers: users.length,

      totalProducts: products.length,

      totalOrders: orders.length,

      revenue: totalRevenue,
    });
  });
}

module.exports = adminRoutes;
