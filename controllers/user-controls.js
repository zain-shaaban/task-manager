require("dotenv").config();
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("../MiddleWares/asyncWrapper");
const { GenerateOTP, SendOTP } = require("../MiddleWares/transporter");
const ApiError = require("../utils/ApiError");
const userValidators = require("../MiddleWares/userValidators");
const bcrypt = require("bcryptjs");
const { Op} = require("sequelize");

const register = asyncWrapper(async (req, res) => {
  let {
    value: { username, email, password },
    error,
  } = userValidators.registerValidate(req.body);
  if (error) {
    throw new ApiError(error.details[0].message);
  }
  const { otp, otpExpiry } = GenerateOTP();
  await User.create({
    username,
    email,
    password,
    otp,
    otpExpiry,
  });
  const verifyUserToken = jwt.sign({ email }, process.env.VERIFY_SECRET);
  SendOTP(email, otp);
  res.status(201).json({
    status: 1,
    data: { verifyUserToken },
  });
});

const login = asyncWrapper(async (req, res) => {
  const {
    value: { email, password },
    error,
  } = userValidators.loginValidate(req.body);
  if (error) {
    throw new ApiError(error.details[0].message);
  }
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) throw new ApiError("email or password is incorrect", 500);
  if (!user.Auth(password)) throw new ApiError("email or password is incorrect", 500);
  const authToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
    expiresIn: 1000 * 60 * 60 * 24 * 30,
  });
  if (!user.confirmed) {
    const { otp, otpExpiry } = GenerateOTP();
    await user.update({ otp, otpExpiry });
    SendOTP(email, otp);
    const verifyUserToken = jwt.sign({ email }, process.env.VERIFY_SECRET);
    throw new ApiError("the email is unconfirmed", 500, verifyUserToken);
  }
  res.status(200).json({
    status: 1,
    data: { authToken },
  });
});

const updateUser = asyncWrapper(async (req, res) => {
  let {
    value: { username, email, password, appearance, auto_delete },
    error,
  } = userValidators.updateUserValidate(req.body);
  if (error) {
    throw new ApiError(error.details[0].message);
  }
  await User.update(
    {
      username,
      email,
      password,
      appearance,
      auto_delete,
    },
    {
      where: {
        userId: req.userId,
      },
    }
  );
  if (password) {
    const authToken = jwt.sign(
      { userId: req.userId, update: true },
      process.env.JWT_SECRET,
      {
        expiresIn: 1000 * 60 * 60 * 24 * 30,
      }
    );
    res.status(200).json({
      status: 1,
      data: { authToken },
    });
  } else {
    res.status(200).json({
      status: 1,
      data: null,
    });
  }
});

const confirmedUser = asyncWrapper(async (req, res) => {
  const {
    value: { confirm_key: otp },
    error,
  } = userValidators.confirmUserValidate(req.body);
  if (error) {
    throw new ApiError(error.details[0].message);
  }
  const token = req.get("verifyUserToken").split(" ")[1];
  const email = jwt.verify(token, process.env.VERIFY_SECRET).email;
  const user = await User.update(
    {
      confirmed: true,
      otp: null,
      otpExpiry: null,
    },
    {
      where: {
        email,
        otp,
        otpExpiry: {
          [Op.gte]: Date.now(),
        },
      },
    }
  );
  const { userId } = await User.findOne({
    attributes: ["userId"],
    where: { email },
  });
  if (user[0]) {
    const authToken = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24 * 30,
    });
    return res.status(200).json({
      status: 1,
      data: { authToken },
    });
  }
  throw new ApiError("Wrong confirmation key");
});

const deleteuser = asyncWrapper(async (req, res) => {
  const {
    value: { userId, password },
    error,
  } = userValidators.deleteUserValidate({
    userId: req.userId,
    password: req.body.password,
  });
  if (error) {
    throw new ApiError(error.details[0].message);
  }
  const user = await User.findByPk(userId);
  if (user.Auth(password)) {
    await user.destroy();
    return res.status(202).json({ status: 1, data: null });
  }
  throw new ApiError("wrong password", 500);
});

const resendOTP = asyncWrapper(async (req, res) => {
  const token = req.get("verifyUserToken").split(" ")[1];
  const email = jwt.verify(token, process.env.VERIFY_SECRET).email;
  if (email) {
    const { otp, otpExpiry } = GenerateOTP();
    await User.update(
      { otp, otpExpiry },
      {
        where: {
          email,
        },
      }
    );
    SendOTP(email, otp);
    return res.json({
      status: 1,
      data: null,
    });
  }
  throw new ApiError("invalid token", 500);
});
module.exports = {
  register,
  login,
  updateUser,
  confirmedUser,
  deleteuser,
  resendOTP,
};
