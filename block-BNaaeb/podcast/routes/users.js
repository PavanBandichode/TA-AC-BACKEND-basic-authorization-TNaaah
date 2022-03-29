var express = require("express");
var User = require("../models/user");
var router = express.Router();

router.get("/register", (req, res) => {
  res.render("userRegister");
});
router.post("/register", (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) {
      return next(err);
    }
    res.redirect("/users/login");
  });
});
router.get("/login", (req, res) => {
  res.render("userLogin");
});
router.post("/login", (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    req.flash("error", "Email/password Required");
    return res.redirect("/users/login");
  }
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("error", "user not found!! Kindly register first");
      return res.redirect("/users/register");
    }
    user.verifyPassword(password, (err, result) => {
      if (err) {
        return next(err);
      }
      if (!result) {
        req.flash("error", "Incorrect Password");
        return res.redirect("/users/login");
      }
      req.session.userId = user.id;
      res.redirect("/users");
    });
  });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("/");
});
module.exports = router;
