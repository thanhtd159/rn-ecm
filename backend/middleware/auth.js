const jwt = require("jsonwebtoken");

const SECRET = "ACCESS_SECRET";

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token invalid" });
    }

    req.user = user;
    next();
  });
}

module.exports = verifyToken;
