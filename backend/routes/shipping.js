function shippingRoutes(server) {
  server.post("/shipping/calculate", (req, res) => {
    const { weight, items } = req.body;

    const shippingCost = weight * 10000 + items * 5000;

    res.json({
      shippingCost,
    });
  });
}

module.exports = shippingRoutes;
