const jwtSecret = "your_jwt_secret";
const jwt = require("jsonwebtoken"),
  passport = require("passport");
require("./passport");

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.username,
    expiresIn: "7d",
    algorithm: "HS256",
  });
};

/* POST login */
module.exports = (router) => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error) {
        return res.status(400).json({
          message: "There was an error while signing in",
          user: user,
          error: error.message || error,
        });
      }
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          user: user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
