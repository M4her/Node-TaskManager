const { mailSender } = require("../helpers/mailService");
const {
  isValidEmail,
  generateOTP,
  generateAccessToken,
} = require("../helpers/utils");
const authSchema = require("../models/authSchema");
// const cloudinary = require("../configs/cloudinary");
const { uploadToCloudinary } = require("../helpers/cloudinaryService");

//      Registration
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

//      OTP Verification
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

//      Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authSchema.findOne({ email });
    if (!user) return res.status(400).send({ message: "Invald credential" });
    if (!user.isVerified)
      return res.status(400).send({ message: "Email is not verified" });

    const matchPass = await user.comparePassword(password);

    if (!matchPass)
      return res.status(400).send({ message: "Invald credential" });

    const accessToken = generateAccessToken({
      _id: user._id,
      email: user.email,
    });

    res.cookie("accessToken", accessToken);

    return res.status(200).send({ message: "Login Sucessfull!" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error!" });
  }
};

//     User Profile
const userProfile = async (req, res) => {
  try {
    const userData = await authSchema
      .findOne({ _id: req.user._id })
      .select("avater email fullname");
    if (!userData) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error!" });
  }
};

//   Update UserProfile
const updateProfile = async (req, res) => {
  const { fullName } = req.body;
  const userId = req.user._id;
  try {
    const userData = await authSchema.findOne({ _id: userId });
        console.log(userData);


    let updateFields = {};

    if (fullName.trim()) updateFields.fullName = fullName;

    if (req.file) {
      const avatarUrl = await uploadToCloudinary({
        mimetype: req.file.mimetype,
        imgBuffer: req.file.buffer,
      });
      
      updateFields.avatar = await avatarUrl.secure_url;
    }

    // const user = await authSchema.findOneAndUpdate(
    //   { _id: userId },
    //   updateFields,
    //   { returnDocument: "after" },
    // );

    res.status(200).send({ message: "Profile Updated Succesfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registration, verifyOTP, login, userProfile, updateProfile };
