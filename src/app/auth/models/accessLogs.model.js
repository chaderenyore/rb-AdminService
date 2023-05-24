const mongoose = require("mongoose");
module.exports.schemas = {
  session_id: {
    type: String,
  },
  access_token: {
    type: String,
  },
  username: {
    type: String,
  },
  admin_id: {
    type: String,
  },
  email: {
    type: String,
  },
  is_active: {
    type: Boolean,
  },
  lat: {
    type: Number,
  },
  long: {
    type: Number,
  },
  logged_in_time: {
    type: Number,
  },
  logged_out_time: {
    type: Number,
  },
  login_duration: {
    type: String,
  },
  role: {
    type: String,
    enum: [
      "super",
      "admin",
      "support",
      "content-writer",
      "research-reviewer",
      "moderator",
      "account-view",
      "account-edit",
    ],
  },
};
