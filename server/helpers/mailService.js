const nodemailer = require("nodemailer");
const { OTPMailTemp } = require("./emailTemplates");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: "maher44hmed@gmail.com",
    pass: "bqmc tfoo myye oiwm",
  },
});

const mailSender = async ({ email, subject, otp }) => {
  try {
    await transporter.sendMail({
      from: '"TaskManager Team" <team@taskmanager.com>', // sender address
      to: email,
      subject: subject,
      html: OTPMailTemp(otp), // HTML body mail template
    });
  } catch (error) {
    console.log("Error while sendind email", error);
  }
};
module.exports = { mailSender };
