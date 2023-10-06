const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  jwt.verify(token, config.get("app.jwt.secret"), (err, decoded) => {
    if (err) {
      console.log(`[Restricted] Token Verification Error,`, err.message || err);
      return res
        .clearCookie("jwt_token")
        .clearCookie("_csrf")
        .status(400)
        .json({ message: "Bad Token" });
    } else {
      req.user = decoded;
      next();
    }
  });
};
