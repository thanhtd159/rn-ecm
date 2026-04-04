const verifyToken = require("../middleware/auth");

function wishlistRoutes(server, router) {
  server.get("/wishlist", verifyToken, (req, res) => {
    const userId = req.user.userId;

    const items = router.db.get("wishlist").filter({ userId }).value();

    res.json(items);
  });

  server.post("/wishlist/add", verifyToken, (req, res) => {
    const userId = req.user.userId;
    const { productId } = req.body;

    const item = {
      id: Date.now(),
      userId,
      productId,
    };

    router.db.get("wishlist").push(item).write();

    res.json(item);
  });

  server.delete("/wishlist/:id", verifyToken, (req, res) => {
    const id = Number(req.params.id);

    router.db.get("wishlist").remove({ id }).write();

    res.json({ message: "removed" });
  });
}

module.exports = wishlistRoutes;
