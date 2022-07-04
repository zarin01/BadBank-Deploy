const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponce = require("../utils/errorResponce");

//Checks to see if the user exists, brings in the token and sees if it is a jwt token and it will decode it
//For authentication
exports.protect = async (req, res, next) => {
  let token;

  //Adds bearer to the token and splits them
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //Responce if there is no token
  if (!token) {
    return next(new ErrorResponce("Not authorized to access this route", 401));
  }

  //Verifys the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorResponce("No user found by this id", 404));
    }

    req.user = user;

    next();
  } catch (error) {
    return next(new ErrorResponce("Not authorized to access this route", 401));
  }
};
