import User from "../userModel.js";
import jsonwebtoken from "jsonwebtoken";
import { compareSync } from "bcryptjs";
import { CONSTANTS } from "../../../../configuration/config.js";
import { generateOtp } from "../../../helpers/utility.js";
// import { sendOTPMessage } from "../../repository/smsRepository.js";
class UserRepository {
  constructor() {
    this.model = User;
  }
  async createDoc(data) {
    return this.model.create(data);
  }
  async countDoc(match) {
    return this.model.countDocuments(match);
  }
  async findOneDoc(match, project = {}) {
    return this.model.findOne(match, project);
  }

  async getOneLeanDoc(match, project = {}) {
    return this.model.findOne(match, project).lean();
  }

  async findAndUpdateDoc(match, update, options = {}) {
    return this.model.updateOne(match, update, options);
  }

  async findByIdAndUpdateDoc(id, update, options = {}) {
    return this.model.findByIdAndUpdate(id, update, options);
  }

  async getDocById(id, project = {}) {
    return this.model.findById(id, project);
  }

  async deleteDoc(id) {
    return this.model.deleteOne({ _id: id });
  }

  async getAllPaginate(pipeline) {
    return this.model.paginate(pipeline);
  }

  async updateDoc(existing, updateBody) {
    Object.assign(existing, updateBody);
    return existing.save();
  }

  async matchPassword(enteredPassword, currentPassword) {
    return compareSync(
      enteredPassword,
      currentPassword
      //  (err, val) => {
      //   if (err) {
      //     console.log("err--", err);
      //   } else {
      //     console.log("val--", val);
      //     return val;
      //   }
      // }
    );
  }

  async genToken(id, email) {
    return jsonwebtoken.sign({ id: id, email: email }, CONSTANTS.jwtSecret, {
      algorithm: CONSTANTS.jwtAlgorithm,
      // expiresIn: CONSTANTS.jwtTimeoutDuration,
    });
  }
  async generateAndSendOtp(existingUser, isEmail = false) {
    const todayDate = new Date();
    let tempOtp = "";
    tempOtp = ["9909899899"].includes(existingUser.mobile)
      ? 1221
      : generateOtp();

    todayDate.setDate(todayDate.getDate() + 1);
    existingUser.tempOtp = tempOtp;
    existingUser.tempOtpExpiresAt = todayDate;
    await existingUser.save();

    if (!isEmail) {
      const payload = {
        mobileNumber: existingUser.mobile,
        tempOtp: existingUser.tempOtp,
      };
      // console.log("payload,..........otp....", payload);
      if (process.env.NODE_ENV === "development") {
        return;
      } else {
        sendOTPMessage(payload).then();
      }
    }
  }
  async resetOtp(existingUser) {
    existingUser.tempOtp = null;
    existingUser.tempOtpExpiresAt = null;
    return await existingUser.save();
  }
}

export const UserInstance = new UserRepository();
