const { mailSender } = require("../helpers/mailService");
const { isValidEmail, generateOTP } = require("../helpers/utils");
const authSchema = require("../models/authSchema");

const registration = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName?.trim())
      return res.status(400).send({ message: "FullName is required " });
    if (!email) return res.status(400).send({ message: "Email is required " });
    if (!isValidEmail(email))
      return res.status(400).send({ message: "Email is invalid " });
    if (!password)
      return res.status(400).send({ message: "Password is required " });

    // does email already exist check

    const existingEmail = await authSchema.findOne({ email });

    if (existingEmail)
      return res.status(400).send({ message: "This is email already exist! " });

    // Geerate OTP
    const OTP_Num = generateOTP();

    const user = await authSchema({
      fullName,
      email,
      password,
      otp: OTP_Num,
      otpExpiry: Date.now() + 5 * 60 * 1000,
    });
    user.save();
    await mailSender({email, subject: 'OTP Verification Mail', otp: OTP_Num})

    res.status(200).send({ message: "Registration Sucessfull" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const verifyOTP = async()=>{

}

const login = async (req, res) => {};
module.exports = { registration, verifyOTP };
