const crypto = require("crypto");
const jwt = require("jsonwebtoken");

function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
const generateOTP = () => {
  return crypto.randomInt(1000, 10000).toString();
};

const generateAccessToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SEC);
  console.log(process.env.JWT_SEC);
  return token;
  
};

module.exports = { isValidEmail, generateOTP, generateAccessToken };
