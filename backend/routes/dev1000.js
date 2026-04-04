function dev1000Routes(server, router) {
  server.post("/dev/seed-products", (req, res) => {
    const { count } = req.body;

    const products = [];

    for (let i = 1; i <= count; i++) {
      products.push({
        id: Date.now() + i,
        name: "Product " + i,
        price: Math.floor(Math.random() * 1000000),
        stock: Math.floor(Math.random() * 100),
      });
    }

    router.db
      .get("products")
      .push(...products)
      .write();

    res.json({
      message: count + " products created",
    });
  });
}

module.exports = dev1000Routes;
