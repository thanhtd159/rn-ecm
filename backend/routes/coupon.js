const verifyToken = require("../middleware/auth");

function couponRoutes(server, router) {
  server.get("/coupons", verifyToken, (req, res) => {
    const coupons = router.db.get("coupons").value();
    res.json(coupons);
  });

  server.post("/coupons", verifyToken, (req, res) => {
    const coupon = {
      id: Date.now(),
      code: req.body.code,
      type: req.body.type,
      value: req.body.value,
      expiresAt: req.body.expiresAt,
    };

    router.db.get("coupons").push(coupon).write();

    res.json(coupon);
  });

  server.post("/coupons/validate", (req, res) => {
    const { code, orderTotal } = req.body;

    const coupon = router.db.get("coupons").find({ code }).value();

    if (!coupon) {
      return res.status(400).json({ message: "Invalid coupon" });
    }

    let discount = 0;

    if (coupon.type === "percent") {
      discount = orderTotal * (coupon.value / 100);
    } else {
      discount = coupon.value;
    }

    res.json({
      valid: true,
      discount,
    });
  });
}

module.exports = couponRoutes;
