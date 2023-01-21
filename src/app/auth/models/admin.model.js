const mongoose = require("mongoose");
module.exports.schemas = {
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    enum: ["super", "admin", "support", "content", "review"]
  },
  status: {
    type: Boolean,
    default: true,
  },
  can_write: {
    type: Boolean
  },
};
