const crypto = require('crypto');

function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
const generateOTP = ()=>{
    return crypto.randomInt(1000, 10000).toString();


}

module.exports = { isValidEmail, generateOTP }