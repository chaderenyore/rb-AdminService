const debug = require("debug")("app:admin-models");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// admin model
const tables = require("./admin.model");
const adminSchema = new Schema(tables.schemas);

// token model
const token_Tables = require("./token.model");
const tokenSchema = new Schema(token_Tables.schemas);

// access logs models
const accessLog_Tables = require("./accessLogs.model");
const accessLogSchema = new Schema(accessLog_Tables.schemas);

// adverts models
const adverts_Tables = require("../../adverts/models/adverts.models");
const advertSchema = new Schema(adverts_Tables.schemas);

exports.AccessLog = mongoose.model("accessLog", accessLogSchema);
exports.Admin = mongoose.model("admin", adminSchema);
exports.Token = mongoose.model("token", tokenSchema);
exports.Advert = mongoose.model("advert", advertSchema);
