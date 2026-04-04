const verifyToken = require("../middleware/auth");

function analyticsRoutes(server, router) {
  server.get("/analytics/sales", verifyToken, (req, res) => {
    const orders = router.db.get("orders").value();

    const revenue = orders.reduce((a, b) => a + b.total, 0);

    res.json({
      totalOrders: orders.length,
      totalRevenue: revenue,
    });
  });

  server.get("/analytics/top-products", verifyToken, (req, res) => {
    const orders = router.db.get("orders").value();

    const map = {};

    orders.forEach((o) => {
      o.items.forEach((i) => {
        map[i.productId] = (map[i.productId] || 0) + i.quantity;
      });
    });

    res.json(map);
  });

  server.get("/analytics/orders", verifyToken, (req, res) => {
    const orders = router.db.get("orders").value();

    const completed = orders.filter((o) => o.status === "completed").length;
    const cancelled = orders.filter((o) => o.status === "cancelled").length;

    res.json({
      total: orders.length,
      completed,
      cancelled,
    });
  });
}

module.exports = analyticsRoutes;
