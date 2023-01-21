// const superAdmin1 = require("../_assets/superAdmin").SUPER_ADMIN1;
const superAdmin2 = require("../_assets/superAdmin").SUPER_ADMIN2;
const { Admin } = require("../app/auth/models");
const debug = require("debug")("app:seedAdmin");

 async function seedData() {
  try {
    // search if super admin already exists
    const admins = await Admin.find({role: "super" });
    if ( admins.length !== 0) {
      console.log("Super Admins Exists");
      return;
    } else {
        // const admin1 =  await Admin.create(superAdmin1);
        const admin2 =  await Admin.create(superAdmin2);
        // debug(admin1);
        debug(admin2);
        return {
          // admin1,
          admin2
        };
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  seedData
}