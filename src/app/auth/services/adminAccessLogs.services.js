const debug = require("debug")("app:admin-accesssLogs-services");
const { getPaginatedRecords } = require("../../../_helpers/paginate");

const { AccessLog } = require("../models");
const  createLogs = async (bodyObj) => {
     return  await AccessLog.create(bodyObj);
}

async function updateLogs(session_id, data) {
  try {
    const accessLogs = await AccessLog.findOneAndUpdate(
      { session_id: session_id },
      data,
      { new: true }
    );

    return accessLogs;
  } catch (error) {
    return {
      error: true,
      message: "Error updating  AccessLogs",
      data: error,
    };
  }
}

async function updateMany(filter, data) {
  try {
    const accessLogs = await AccessLog.updateMany(
      filter,
      data,
      { new: true }
    );

    return accessLogs;
  } catch (error) {
    return {
      error: true,
      message: "Error updating  AccessLogs",
      data: error,
    };
  }
}

async function deleteRecords(data) {
  return await  AccessLog.deleteOne(data);
}

async function findARecord(data) {
    return await  AccessLog.findOne(data);
  }



async function findAll(limit, page, data = {}) {
    return   getPaginatedRecords(AccessLog, {
        limit: limit,
        page: page,
        data,
      });;
  }


async function deleteMany(data) {
    return await  AccessLogs.deleteMany(data);
  }


module.exports = {
  createLogs,
  updateLogs,
  updateMany,
  deleteMany,
  findAll,
  deleteRecords,
  findARecord
}