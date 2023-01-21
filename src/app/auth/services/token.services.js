const debug = require("debug")("app:admin-services");
const { Token } = require("../models");

async function createToken(bodyObj) {
  return await Token.create(bodyObj);
}

async function updateToken(username, data) {
  try {
    const token = await Token.findOneAndUpdate(
      { username: username },
      data,
      { new: true }
    );

    return token;
  } catch (error) {
    return {
      error: true,
      message: "Error updating token",
      data: error,
    };
  }
}

async function deleteRecords(token) {
  return await Token.deleteOne(id);
}

async function findARecord(data) {
    return await Token.findOne(data);
  }


module.exports = {
  createToken,
  updateToken,
  deleteRecords,
  findARecord
}