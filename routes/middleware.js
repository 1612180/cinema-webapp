const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY || "wtf";

function auth(req, res, next) {
  console.log("auth");
  // console.log(req.headers)

  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization.slice(7),
      secretKey,
      (err, decoded) => {
        if (err) {
          res.status(401).send("Unauthorized Access");
        } else {
          res.set("email", decoded.email);
          next();
        }
      }
    );
  } else {
    res.status(401).send("Unauthorized Access");
  }
}

module.exports = {
  auth
};
