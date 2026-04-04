const verifyToken = require("../middleware/auth");

function reviewRoutes(server, router) {
  server.post("/reviews", verifyToken, (req, res) => {
    const userId = req.user.userId;
    const { productId, rating, comment } = req.body;

    const review = {
      id: Date.now(),
      userId,
      productId,
      rating,
      comment,
      createdAt: new Date(),
    };

    router.db.get("reviews").push(review).write();

    updateRating(router, productId);

    res.json(review);
  });

  server.get("/reviews/:productId", (req, res) => {
    const productId = Number(req.params.productId);

    const reviews = router.db.get("reviews").filter({ productId }).value();

    res.json(reviews);
  });

  function updateRating(router, productId) {
    const reviews = router.db.get("reviews").filter({ productId }).value();

    const avg = reviews.reduce((a, b) => a + b.rating, 0) / reviews.length;

    router.db
      .get("products")
      .find({ id: productId })
      .assign({ rating: avg })
      .write();
  }

  // PRODUCT VARIANTS

  server.get("/products/:id/variants", (req, res) => {
    const productId = Number(req.params.id);

    const variants = router.db.get("variants").filter({ productId }).value();

    res.json(variants);
  });

  server.post("/products/:id/variants", verifyToken, (req, res) => {
    const productId = Number(req.params.id);

    const variant = {
      id: Date.now(),
      productId,
      size: req.body.size,
      color: req.body.color,
      price: req.body.price,
      stock: req.body.stock,
    };

    router.db.get("variants").push(variant).write();

    res.json(variant);
  });

  server.patch("/variants/:id", verifyToken, (req, res) => {
    const id = Number(req.params.id);

    router.db.get("variants").find({ id }).assign(req.body).write();

    res.json({
      message: "Variant updated",
    });
  });
}

module.exports = reviewRoutes;
