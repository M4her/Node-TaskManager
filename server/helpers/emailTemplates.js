const OTPMailTemp = (otp) => {
  return `<div style="margin:0; padding:0; background-color:#f4f4f7; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7; padding:20px 0;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" 
          style="background:#ffffff; border-radius:8px; padding:30px;">

          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h2 style="margin:0; color:#333;">Verify Your Email</h2>
            </td>
          </tr>

          <tr>
            <td style="color:#555; font-size:16px; line-height:1.5; text-align:center;">
              <p style="margin:0;">
                Use the OTP below to complete your verification. This code is valid for a limited time.
              </p>
            </td>
          </tr>>
          <tr>
            <td align="center" style="padding:30px 0;">
              <div style="
                display:inline-block;
                background:#f4f4f7;
                padding:15px 25px;
                font-size:28px;
                letter-spacing:6px;
                font-weight:bold;
                color:#333;
                border-radius:6px;">
                ${otp}
              </div>
            </td>
          </tr>
          <tr>
            <td style="color:#777; font-size:14px; text-align:center;">
              <p style="margin:0;">
                If you didn’t request this, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 0;">
              <hr style="border:none; border-top:1px solid #eee;">
            </td>
          </tr>
  </table>
</div>`;
};
module.exports = { OTPMailTemp };
