const debug = require("debug")("app:admin-services");
const { Advert } = require("../../auth/models");
const { getPaginatedRecords } = require("../../../_helpers/paginate");

async function create(payload) {
  return await Advert.create(payload);
}

async function fetchAllAds(limit, page, data) {
  return getPaginatedRecords(Advert, {
    limit: limit,
    page: page,
    data,
    selectedFields,
  });
}

async function viewAds(query) {
  return await Advert.findOne(query);
}

async function deleteAds(query) {
  return await Advert.deleteOne(query);
}

module.exports = {
  create,
  fetchAllAds,
  viewAds,
  deleteAds,
};
