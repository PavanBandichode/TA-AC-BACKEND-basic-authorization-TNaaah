let mongoose = require("mongoose");
let bcrypt = require("bcrypt");

let Schema = mongoose.Schema;

let podcastSchema = new Schema(
  {
    isFree: { type: Boolean, default: false },
    isVIP: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Podcast", podcastSchema);
