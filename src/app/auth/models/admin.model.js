const mongoose = require("mongoose");
module.exports.schemas = {
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
  image: {
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
  status: {
    type: Boolean,
    default: true,
  },
  can_write: {
    type: Boolean,
  },
  added_by_username: {type:String},
  added_by_email:{type: String}
};
