const verifyToken = require("../middleware/auth");

function orderRoutes(server, router) {
  server.post("/checkout", verifyToken, (req, res) => {
    const userId = req.user.userId;

    const cart = router.db.get("carts").find({ userId }).value();

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }

    const order = {
      id: Date.now(),
      userId,
      items: cart.items,
      status: "pending",
      createdAt: new Date(),
    };

    router.db.get("orders").push(order).write();

    res.json(order);
  });

  server.get("/orders", verifyToken, (req, res) => {
    const userId = req.user.userId;

    const orders = router.db.get("orders").filter({ userId }).value();

    res.json(orders);
  });

  server.get("/orders/:id", verifyToken, (req, res) => {
    const id = Number(req.params.id);

    const order = router.db.get("orders").find({ id }).value();

    res.json(order);
  });
}

module.exports = orderRoutes;
