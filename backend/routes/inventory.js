const verifyToken = require("../middleware/auth");

function inventoryRoutes(server, router) {
  server.get("/inventory/product/:id", verifyToken, (req, res) => {
    const productId = Number(req.params.id);

    const inventory = router.db.get("inventory").find({ productId }).value();

    res.json(inventory || { productId, stock: 0 });
  });

  server.post("/inventory/reserve", verifyToken, (req, res) => {
    const { productId, quantity } = req.body;

    const item = router.db.get("inventory").find({ productId }).value();

    if (!item) {
      router.db.get("inventory").push({ productId, stock: -quantity }).write();
    } else {
      router.db
        .get("inventory")
        .find({ productId })
        .assign({ stock: item.stock - quantity })
        .write();
    }

    res.json({ message: "Stock reserved" });
  });

  server.post("/inventory/release", verifyToken, (req, res) => {
    const { productId, quantity } = req.body;

    const item = router.db.get("inventory").find({ productId }).value();

    router.db
      .get("inventory")
      .find({ productId })
      .assign({ stock: item.stock + quantity })
      .write();

    res.json({ message: "Stock released" });
  });
}

module.exports = inventoryRoutes;
