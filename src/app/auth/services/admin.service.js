const debug = require("debug")("app:admin-services");
const { Admin } = require("../models");
const bcrypt = require("bcrypt");
const VerifyJwt = require("../../../_utils/jwt.utils").verifyJwt;

async function createAdmin(bodyObj) {
  const {
    username,
    email,
    password,
    image,
    role,
    status,
    can_write,
    added_by_username,
    added_by_email,
  } = bodyObj;
  return await Admin.create({
    username,
    email,
    password,
    image,
    role,
    status,
    can_write,
    added_by_username,
    added_by_email,
  });
}

async function changePassword(id, data) {
  try {
    // compare old and new
    if (data.old_password === data.new_password) {
      return {
        error: true,
        message: "No action. Old password and new password are the same",
        data: null,
      };
    } else {
      // compare stored pasword with password in db
      const existingAdmin = await Admin.findOne({ _id: String(id) });
      console.log("EXISTING ADMIN", existingAdmin);
      const passwordMatch = await bcrypt.compare(
        data.old_password,
        existingAdmin.password
      );
      console.log("pasword Match ============= ", passwordMatch)
      if (!passwordMatch) {
        return {
          error: true,
          message: "Old password is invalid",
          data: null,
        };
      } else {
        const salt = await bcrypt.genSaltSync(10);
        const newPassword = await bcrypt.hashSync(data.new_password, salt);
        const updatedAdmin = await Admin.findOneAndUpdate(
          { _id: id },
          { password: newPassword },
          { new: true }
        );
        console.log("UPDATED ADMIN ============== ", updatedAdmin)
        return {
          error: false,
          message: "Password Changed SUccessfully",
          data: updatedAdmin,
        };
      }
    }
  } catch (error) {
    return {
      error: true,
      message: "Error Resetting Password",
      data: error,
    };
  }
}

async function deleteAdmin(id) {
  return await Admin.findByIdAndRemove(id);
}

async function checkExisting(email, username) {
  return await Admin.findOne({
    $or: [{ email: email }, { username: username }],
  });
}

async function authenticate(username) {
  return await Admin.findOne({ username: username });
}
async function getAllAdmins() {
  return await Admin.find({}).select("-password");
}

async function validateToken(token) {
  try {
    const adminPayload = VerifyJwt(token);
    console.log("AdminPayload: ", adminPayload);
    if (adminPayload) {
      const admin = await Admin.findOne({ _id: adminPayload.admin._id });
      return {
        error: !admin,
        message: !admin ? "Expired token" : "Token is valid",
        data: {
          status: !!admin,
          admin_id: admin._id,
          admin_role: admin.role,
          username: admin.username,
          email: admin.email,
        },
      };
    } else {
      return {
        error: true,
        message: "Invalid Token",
        data: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: "Invalid token passed.",
      data: error,
    };
  }
}

async function getAdminById(id) {
  try {
    return await Admin.findById(id).select("-password");
  } catch (error) {
    return {
      error: true,
      message: "Error retrieving admin",
      data: error,
    };
  }
}

async function getAnAdmin(query) {
  try {
    return await Admin.findOne(query).select(
      "-password, -added_by_username, -added_by_email"
    );
  } catch (error) {
    return {
      error: true,
      message: "Error retrieving admin",
      data: error,
    };
  }
}

async function update(filter, update) {
  try {
    return await Admin.updateOne(filter, update, {
      new: true,
      lean: true,
    }).select("-password");
  } catch (error) {
    return {
      error: true,
      message: "Error Updating admin",
      data: error,
    };
  }
}
module.exports = {
  createAdmin,
  authenticate,
  checkExisting,
  getAllAdmins,
  getAdminById,
  validateToken,
  changePassword,
  deleteAdmin,
  getAnAdmin,
  update,
};
