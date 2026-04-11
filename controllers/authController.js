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
    await mailSender({ email, subject: "OTP Verification Mail", otp: OTP_Num });

    res.status(200).send({ message: "Registration Sucessfull" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await authSchema.findOneAndUpdate(
      {
        email,
        otp,
        otpExpiry: { $gt: Date.now() },
      },
      { isVerified: true, otp: null },
      { returnDocument: "after" },
    );
    if (!user) return res.status(400).send({ message: "Invald request" });
    res.status(200).send({ message: "Email Verified Succesfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error!" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authSchema.findOne({ email });
    console.log(user);
    if (!user) return res.status(400).send({ message: "Invald credential" });
    if (!user.isVerified)
      return res.status(400).send({ message: "Email is not verified" });

    const matchPass = await user.comparePassword(password);

    if (!matchPass)
      return res.status(400).send({ message: "Invald credential" });

    return res.status(200).send({ message: "Login Sucessfull!" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error!" });
  }
};
module.exports = { registration, verifyOTP, login };
