const verifyToken = require("../middleware/auth");
const { v4: uuid } = require("uuid");

function cartRoutes(server, router) {
  server.get("/cart", verifyToken, (req, res) => {
    const userId = req.user.userId;

    const cart = router.db.get("carts").find({ userId }).value();

    res.json(cart || { items: [] });
  });

  server.post("/cart/add", verifyToken, (req, res) => {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    let cart = router.db.get("carts").find({ userId }).value();

    if (!cart) {
      cart = {
        id: uuid(),
        userId,
        items: [],
      };

      router.db.get("carts").push(cart).write();
    }

    cart.items.push({
      productId,
      quantity,
    });

    router.db.get("carts").find({ userId }).assign(cart).write();

    res.json(cart);
  });
}

module.exports = cartRoutes;
