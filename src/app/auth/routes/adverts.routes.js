const express = require("express");
const router = express.Router();
const paths = require("./paths/paths");
const { authorize } = require("../../middlewares/authorize");
const { authorizeUser } = require("../../middlewares/authorizeUser");

// controllers
const PostAdvertControllers = require("../../adverts/controllers/createAds.controller");
const AdminGetAllAdvertsController = require("../../adverts/controllers/getAllAds.controllers");
const DeletAdvertsController = require("../../adverts/controllers/deleteAds.controller");
const UserViewAdsAdvertsController = require("../../adverts/controllers/viewAdsByUser.controller");

// validators
const validateInputs = require("../../middlewares/schema.validator");
const PostAdvertsValidator = require("../../vallidators/adverts/postAds.validator");
const AdmimnGetAllAdveertsValidator = require("../../vallidators/adverts/fetchAllAds.validator");
const DeleteAdvertsValidator = require("../../vallidators/adverts/deleteAds.validator");
const UserViewAdvertsValidator = require("../../vallidators/adverts/userViewAds.validator");

router.post(
  paths.postAdverts,
  authorize(["super", "admin", "content-writer"]),
  validateInputs(PostAdvertsValidator, "body"),
  PostAdvertControllers.PostAds
);


router.get(
  paths.adminFetchAllAds,
  validateInputs(AdmimnGetAllAdveertsValidator, "query"),
  authorize([
    "super",
    "admin",
    "support",
    "content-writer",
  ]),
  AdminGetAllAdvertsController.fetchAllAds
);

router.delete(
  paths.deleteAdvert,
  validateInputs(DeleteAdvertsValidator, "query"),
  authorize([
    "super",
    "admin",
    "content-writer",
  ]),
  DeletAdvertsController.DeleteAds
);

router.get(
  paths.deleteAdmin,
  authorizeUser(["user", "org"]),
  validateInputs(UserViewAdvertsValidator, "query"),
  UserViewAdsAdvertsController.ViewAds
);

module.exports = router;
