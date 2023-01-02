import moongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import JWT from "jsonwebtoken";
import {authRoles} from "../utils";
import { config } from "../config";

const userDetails = {
  name: {
    type: String,
    required: [true, "name is required"],
    maxLength: [50, "name must be less than 50"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [8, "password must be at least 8 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: Object.values(authRoles),
    default: authRoles.USER,
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
};

const userSchema = moongoose.Schema(userDetails);

userSchema.method = {

    // compare password
    comparePassword: async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password)
    },

    // generate JWT Token
    getJwtToken: function () {
        return JWT.sign({ _id: this._id, role: this.role }, config.JWT_SECRET, {expiresIn: config.JWT_EXPIRY})
    },

    // generate forgot password token
    generateForgotPasswordToken: function () {
        const forgotToken = crypto.randomBytes(20).toString('hex');
        // save to DB
        this.forgotPasswordToken = crypto.createHash("sha256").update(forgotToken).digest("hex");
        this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;
        // return to user
        return forgotToken;
    }
}


export default moongoose.model("user", userSchema);