const nodemailer = require("nodemailer");
require("dotenv").config();
const asyncWrapper = require("../MiddleWares/asyncWrapper");

const GenerateOTP = () => {
  var digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++ ) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
  const otpExpiry = Date.now() + 1000 * 60 * 5;
  return { otp, otpExpiry };
};

const SendOTP = asyncWrapper(async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: '"Task Manager" <taskmanager@gmail.com>',
    to: email,
    subject: "Confirm Email",
    html: `<h2>Confirmation Key is </h2>  <h1>${otp}</h1>`,
  });
});

module.exports = { GenerateOTP, SendOTP };
