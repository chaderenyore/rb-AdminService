const mongoose = require("mongoose");
module.exports.schemas = {
  admin_id: {
    type: String,
  },
  admin_username:{
    type: String
  },
  advert_type: {
    type: String,
    enum: ['top', "footer", "asset_ad", "community_ad"]
  },
  advert_object: {
    type: String,
  },
  is_active: {
    type: Boolean,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
};
