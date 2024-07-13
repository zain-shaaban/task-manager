const nodemailer = require("nodemailer");
require("dotenv").config();
const asyncWrapper=require("../MiddleWares/asyncWrapper")
const createNewUser = asyncWrapper(async (email, token) => {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.GMAIL_USER,
            pass:process.env.GMAIL_PASS
        }
      },
    );
    const url = `https://task-manager-experiment-with-backend.pages.dev/confirmation.html?confirmation_token=${token}`;
    await transporter.sendMail({
      from:'"Task Manager" <taskmanager@gmail.com>',
      to: email,
      subject: "Confirm Email",
      html: `Please click on this link to confirm your email <a href=${url}>confirm-email</a>`,
    })
  });

module.exports = createNewUser;
