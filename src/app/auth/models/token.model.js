const mongoose = require("mongoose");
module.exports.schemas = {
  token: {
    type: String
  },
  email: {
    type: String
  },
  username: {
    type: String
  },
  isActive: {
    type: Boolean
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date
  }
};
