let express = require("express");
const Admin = require("../models/admin");
const User = require("../models/user");
// const AdminPodcast = require('../models/AdminPodcast');
// const UserPodcast = require('../models/UserPodcast');
let router = express.Router();
router.get("/:id/new", (req, res, next) => {
  console.log(req.session);
  let id = req.params.id;
  if (req.user) {
    User.findById(id, (err, user) => {
      if (err) {
        return next(err);
      }
      return res.render("createPodcast", { user });
    });
  }
  if (req.admin) {
    Admin.findById(id, (err, admin) => {
      if (err) {
        return next(err);
      }
      return res.render("createPodcast", { admin });
    });
  }
});
module.exports = router;
