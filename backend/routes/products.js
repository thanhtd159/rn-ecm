const verifyToken = require("../middleware/auth");

function productRoutes(server, router) {
  server.get("/products", verifyToken, (req, res) => {
    let products = router.db.get("products").value();

    const { page = 1, limit = 10, search, category } = req.query;

    if (search) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category) {
      products = products.filter((p) => p.category === category);
    }

    const start = (page - 1) * limit;
    const end = start + Number(limit);

    const result = products.slice(start, end);

    res.json({
      data: result,
      total: products.length,
      page: Number(page),
      limit: Number(limit),
    });
  });

  server.post("/products", verifyToken, (req, res) => {
    const product = req.body;

    router.db.get("products").push(product).write();

    res.json(product);
  });

  server.put("/products/:id", verifyToken, (req, res) => {
    const id = Number(req.params.id);

    router.db.get("products").find({ id }).assign(req.body).write();

    res.json({ message: "updated" });
  });

  server.delete("/products/:id", verifyToken, (req, res) => {
    const id = Number(req.params.id);

    router.db.get("products").remove({ id }).write();

    res.json({ message: "deleted" });
  });
}

module.exports = productRoutes;
