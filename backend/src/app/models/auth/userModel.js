import { Schema, model } from "mongoose";
import { hashSync, genSaltSync, compare } from "bcryptjs";
import { USER_SCHEMA as SCHEMA_CONST } from "../../mocks/schemaConst/authSchemaConst.js";
import { paginatePlugin } from "../plugins/paginatePlugin.js";

const userSchema = new Schema(
  {
    mobile: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
      enum: Object.values(SCHEMA_CONST.GENDERS_ENUM),
    },
    password: {
      type: String,
      required: false,
    },
    // role: {
    //   type: String,
    //   required: true,
    //   enum: Object.values(SCHEMA_CONST.ROLE_ENUM),
    // },
    address: [
      {
        customerName: {
          type: String,
          require: true,
        },
        mobile: {
          type: String,
          require: true,
        },
        gstNo: {
          type: String,
          require: true,
        },
        panNo: {
          type: String,
          require: true,
        },
        addressLine: {
          type: String,
          require: true,
        },
        city: {
          type: String,
          require: true,
        },
        state: {
          type: String,
          require: true,
        },
        pinCode: {
          type: String,
          require: true,
        },
        status: {
          type: String,
          required: false,
          enum: Object.values(SCHEMA_CONST.STATUS_ENUM),
        },
      },
    ],
    tempOtp: {
      required: false,
      type: Number,
    },
    tempOtpExpiresAt: {
      required: false,
      type: Date,
    },
    DOB: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
      enum: Object.values(SCHEMA_CONST.STATUS_ENUM),
    },
  },
  {
    timestamps: true,
    collection: SCHEMA_CONST.COLLECTION_NAME,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = genSaltSync(8);
    this.password = hashSync(this.password, salt);
  }
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  
  return await compare(enteredPassword, this.password);
};

userSchema.plugin(paginatePlugin);
const User = model(SCHEMA_CONST.COLLECTION_NAME, userSchema);

export default User;
