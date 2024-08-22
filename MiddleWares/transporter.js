const nodemailer = require("nodemailer");
require("dotenv").config();
const asyncWrapper=require("../MiddleWares/asyncWrapper")
const createNewUser = asyncWrapper(async (email, confirm_key) => {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.GMAIL_USER,
            pass:process.env.GMAIL_PASS
        }
      },
    );
    await transporter.sendMail({
      from:'"Task Manager" <taskmanager@gmail.com>',
      to: email,
      subject: "Confirm Email",
      html: `<h2>Confirmation Key is </h2>  <h1>${confirm_key}</h1>`,
    })
  });

module.exports = createNewUser;
