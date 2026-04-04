const verifyToken = require("../middleware/auth");

function paymentRoutes(server, router) {
  server.post("/payment", verifyToken, (req, res) => {
    const { orderId, method } = req.body;

    const payment = {
      id: Date.now(),
      orderId,
      method,
      status: "success",
      transactionId: "TX" + Date.now(),
    };

    router.db.get("payments").push(payment).write();

    router.db
      .get("orders")
      .find({ id: orderId })
      .assign({ status: "paid" })
      .write();

    res.json(payment);
  });
}

module.exports = paymentRoutes;
