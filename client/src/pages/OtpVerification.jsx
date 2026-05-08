import React, { useState, useRef } from "react";
import Button from "../components/ui/Button";

const OtpVerification = ({
  length = 4,
  onSubmit,
  onResend,
}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move forward
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // backspace -> move back
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    setOtp(newOtp);

    newOtp.forEach((_, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = newOtp[i];
      }
    });
  };

  const handleSubmit = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== length) return;

    setLoading(true);

    try {
      if (onSubmit) {
        await onSubmit(finalOtp);
      } else {
        console.log("OTP:", finalOtp);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (onResend) onResend();
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-5 w-full max-w-sm items-center">
        
        <h2 className="text-xl font-semibold">Verify OTP</h2>
        <p className="text-sm text-gray-500 text-center">
          Enter the {length}-digit code sent to your email
        </p>

        {/* OTP Inputs */}
        <div
          className="flex gap-2"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-12 text-center border rounded-lg text-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          loading={loading}
          buttonClassName="w-full"
        >
          Verify
        </Button>

        <button
          onClick={handleResend}
          className="text-sm text-blue-500 hover:underline"
        >
          Resend Code
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;