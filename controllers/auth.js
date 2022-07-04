const crypto = require("crypto");
// Brings in users requirements
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponce");
const sendEmail = require("../utils/sendEmail");

// !REGISTER
exports.register = async (req, res, next) => {
  const { username, email, password, balance } = req.body;

  try {
    //Use to create an account
    const user = await User.create({
      username,
      email,
      password,
      balance: 0,
    });

    // success message and what happens
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  // Login will check if the user exists and if the password is correct
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  //Finds the email and password. Adds error if there is none
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Forgot password screen and checks for the email added to the form to send the email
exports.forgotpassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }
    //Resets the token if there is a success
    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `https://zarin-neugebauer-bank-app.herokuapp.com/${resetToken}`;

    const message = `
    <h1>you have requested a password reset</h1>
    <p>click the link to reset your password</p>
    <a href=${resetUrl} clicktracking=off >${resetUrl}</a>
    `;

    //! SECOND TRY CATCH
    //Will send emaiul and add this text to the email
    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Token",
        text: message,
      });
      res.status(200).json({ success: true, data: "Email sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    next(error);
  }
};

//! ENCRYPTS WEBSITE WITH BCRYPT
//This will taje the reset password and encrypt it after the last function was a success

exports.resetpassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    //Adds a data so the reset password token can expire
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password updated",
    });
  } catch (error) {
    next(error);
  }
};

//! JWT TOKEN
//response token for authentication
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ success: true, token });
};
