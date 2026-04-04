const jwt = require("jsonwebtoken");

const ACCESS_SECRET = "ACCESS_SECRET";
const REFRESH_SECRET = "REFRESH_SECRET";

let refreshTokens = [];

function authRoutes(server, router) {
  server.post("/auth/login", (req, res) => {
    const { username, password } = req.body;

    const user = router.db.get("users").find({ username, password }).value();

    if (!user) {
      return res.status(401).json({ message: "Invalid account" });
    }

    const accessToken = jwt.sign({ userId: user.id }, ACCESS_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ userId: user.id }, REFRESH_SECRET, {
      expiresIn: "7d",
    });

    refreshTokens.push(refreshToken);

    res.json({
      accessToken,
      refreshToken,
    });
  });

  server.post("/auth/refresh", (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json();
    }

    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json();
    }

    jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
      if (err) return res.status(403).json();

      const accessToken = jwt.sign({ userId: user.userId }, ACCESS_SECRET, {
        expiresIn: "15m",
      });

      res.json({ accessToken });
    });
  });
}

module.exports = authRoutes;
