const axios = require("axios");
const { Admin } = require("../models");
const {generateTokenAndStore, Store} = require ('../../../_helpers/generateOtp');
const { redisGetAsync } = require("../../../_helpers/promisifyRedis");

const {
  comparePassword,
  hashPassword,
} = require("../../../_helpers/passwordHash");


  async function requestPaswordReset(platform, data) {
    try {
      //search for user from login model
      console.log(data)
      const user = await Admin.findOne({ email: String(data.channel_value)});
      console.log("USER ============ : ", user)
      if (!user) {
        return {
          error: true,
          message: `This ${data.channel} does not exist`,
          data: null,
        };
      } else {
        // store in redis
        const token = String(
          generateTokenAndStore(`${platform}${data.channel_value}`)
        );
        // send mail
        const Data = {
          first_name: user.first_name,
          email: user.email,
          token: token,
        };
        await axios.post (
          `${process.env.NOTIFICATION_SERVICE_URI}/notifications/v1/user/request-password-reset`,
          Data
        );
        return {
          error: false,
          message: `A mail has been sent to ${user.email}`,
          data: {
            channel: data.channel,
            channel_value: data.channel_value,
          },
        };
      }
    } catch (err) {
      console.log(err);
      return {
        error: true,
        message: "Unable to request reset at the moment",
        data: err,
      };
    }
  }

  async function validatePasswordToken(platform, data) {
    try {
      //  get user and store id for password reset
      const user = await Admin.findOne(
          { email: data.channel_value});
      if (!user) {
        return {
          error: true,
          message: "Unknown phone number or email",
          data: null,
        };
      }
      let userId = user._id;
      const token = await redisGetAsync(`${platform}${data.channel_value}`);
    //   generat security key
      const Key = `${userId}-${token}`;
      const securityKey = String(Store(userId, Key));
      console.log("Security Key   :" , securityKey)
      if (!token) {
        return {
          error: true,
          message: "OTP does not exist or has expired",
          data: null,
        };
      } else if (token !== data.token) {
        return {
          error: true,
          message: "Invalid OTP or Platform mis-match",
          data: null,
        };
      } else {
        return {
          error: false,
          message: "OTP is Valid",
          data: {
            Key,
          },
        };
      }
    } catch (err) {
      console.log(err);
      return {
        error: true,
        message: "Unable to Validate Token",
        data: err,
      };
    }
  }

  async function resetPassword(data) {
    try {
        console.log(data.key)
      // Get security key
      const id = data.key.split("-")[0]; 
        const user = await Admin.findOne({
          _id: String(id),
        });
        if (!user) {
          return {
            error: true,
            message: `This ${data.channel} does not exist`,
            data: null,
          };
        } else {
          const newPassword = hashPassword(String(data.new_password));
          console.log(user);
          // update login record details
          await Admin.findByIdAndUpdate(
            { _id: String(id) },
            { password: newPassword }
          );
          // Send password reset successful mail
          // send mail
          const Data = {
            first_name: user.username,
            email: user.email,
          };
          axios.post (
            `${process.env.NOTIFICATION_SERVICE_URI}/notifications/v1/user/password-reset-successful`,
            Data
          );
          return {
            error: false,
            message: "Password reset successfully",
          };
        }
    } catch (err) {
      console.log(err);
      return {
        error: true,
        message: "Unable to reset password at the moment",
        data: err,
      };
    }
  }

  async function changePassword(id, data) {
    try {
      console.log("AUTH_ID :", id);
      if (data.old_password === data.new_password) {
        return {
          error: false,
          message: "No action. Old password and new password are the same",
          data: null,
        };
      }
      //   check if old password is correct
      const user = await Admin.findOne ({user_id: id});
      const passwordMatch = await comparePassword (
        user.password,
        data.old_password
      );
      if (!passwordMatch) {
        return {
          error: true,
          message: "Old password is invalid",
        };
      }
      const newPassword = hashPassword(data.new_password);
      //   update login record
      const updatedRecord = await Admin.update (
        {user_id: id},
        {password: newPassword}
      );
      return {
        error: false,
        message: "Password changed successfully",
        data: null,
      };
    } catch (error) {
      console.error(error);
    }
  }

  module.exports = {
    resetPassword,
    validatePasswordToken,
    requestPaswordReset,
    changePassword
  };
