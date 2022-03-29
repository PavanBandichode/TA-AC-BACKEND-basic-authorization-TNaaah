let express = require("express");
let router = express.Router();
let Admin = require("../models/admin");
//render admin registeration page
router.get("/register", (req, res, next) => {
  res.render("adminRegister");
});
router.get("/", (req, res, next) => {
  console.log(req.admin);
  Admin.findById(req.session.adminId, (err, admin) => {
    if (err) {
      return next(err);
    }
    res.render("adminDashboard", { admin: admin });
  });
});
//creating admin registration details in database
router.post("/register", (req, res, next) => {
  Admin.create(req.body, (err, admin) => {
    if (err) {
      return next(err);
    }
    res.redirect("/admin/login");
  });
});
//render admin login
router.get("/login", (req, res, next) => {
  res.render("adminLogin");
});
//authentication while login
router.post("/login", (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    req.flash("error", "Email/password Required");
    return res.redirect("/admin/login");
  }
  Admin.findOne({ email: email }, (err, admin) => {
    if (err) {
      return next(err);
    }
    if (!admin) {
      req.flash("error", "admin not found!! Kindly register first");
      return res.redirect("/admin/register");
    }
    admin.verifyPassword(password, (err, result) => {
      if (err) {
        return next(err);
      }
      if (!result) {
        req.flash("error", "Incorrect Password");
        return res.redirect("/admin/login");
      }

      req.session.adminId = admin.id;
      res.redirect("/admin");
    });
  });
});

//admins logout
router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("/admin/login");
});
module.exports = router;
