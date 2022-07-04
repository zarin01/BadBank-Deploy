const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//! The schema is what the user needs to add to create an account or use the routes
// All user data needs to be under these requirements
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email is already in use"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    maxlength: [20, "Password must be less than 20 characters"],
    select: false,
  },
  balance: {
    type: Number,
    default: 0,
    min: 0,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//Checks if the password has been modified for the forgot password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  // encypts the password
  const salt = await bcrypt.genSalt(10);
  //This will take the password from the auth file and will apply this to the password when one is added
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Authentication token
UserSchema.methods.getSignedJwtToken = function () {
  //Signs the token with the user id and adds experation date
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//This will run if the password has changed and this will check the encypted token to see if it will still be valid
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token (private key) and save to database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

  return resetToken;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
