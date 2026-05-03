import React, { useState } from "react";
import { Input } from "./Input";
import Button from "./Button";

const Registration = () => {
  // ------------ navigate ------------
  const navigate = (path) => (window.location.href = path);

  // ------------ show/hide password ------------
  const [showPassword, setShowPassword] = useState(false);

  // ------------ loading buffer ------------
  const [isLoading, setLoading] = useState(false);

  // ------------ form data ------------
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // ------------ field errors ------------
  const [allErrors, setErrors] = useState({
    fullNameError: "",
    emailError: "",
    passwordError: "",
  });

  // ------------ toast state ------------
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 4000);
  };

  // ------------ submit handler ------------
  const registerHandler = (e) => {
    e.preventDefault();

    let hasError = false;

    if (!formData.fullName) {
      setErrors((prev) => ({ ...prev, fullNameError: "Full name is required." }));
      hasError = true;
    }
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, emailError: "Email is required." }));
      hasError = true;
    }
    if (!formData.password) {
      setErrors((prev) => ({ ...prev, passwordError: "Password is required." }));
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    fetch("https://api.freeapi.app/api/v1/users/register", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        showToast("Account Created!", "success");
        setTimeout(() => navigate("/login"), 1500);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        showToast("Registration unsuccessful.", "error");
      });
  };

  // ------------ dark mode toggle ------------
  const myHtml = document.documentElement;
  const handleToggle = () => {
    myHtml.classList.toggle("dark");
  };

  // ------------ icons ------------
  const UserIcon = (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5 6a5 5 0 0 0-10 0h10z" />
    </svg>
  );

  const MailIcon = (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z" />
    </svg>
  );

  const LockIcon = (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
    </svg>
  );

  const EyeOnIcon = (
    <svg className="w-4 h-4 cursor-pointer" fill="currentColor" viewBox="0 0 16 16" onClick={() => setShowPassword(!showPassword)}>
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
    </svg>
  );

  const EyeOffIcon = (
    <svg className="w-4 h-4 cursor-pointer" fill="currentColor" viewBox="0 0 16 16" onClick={() => setShowPassword(!showPassword)}>
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
    </svg>
  );

  return (
    <div
      id="registration-form"
      className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-cyan-50 via-emerald-100 to-teal-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* ------------ toast ------------ */}
      {toast.show && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all duration-300 ${
            toast.type === "success" ? "bg-teal-500" : "bg-red-500"
          }`}
        >
          {toast.type === "success" ? "✓" : "✕"} {toast.message}
        </div>
      )}

      {/* ------------ dark mode toggle ------------ */}
      <label className="absolute top-10 right-10 inline-flex items-center cursor-pointer">
        <input
          onClick={handleToggle}
          className="sr-only peer"
          value=""
          type="checkbox"
        />
        <div className="w-24 h-12 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-10 before:w-10 before:top-1/2 before:bg-white before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full shadow-lg shadow-gray-400 peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#383838] after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-[4px] after:right-1 after:translate-y-full after:w-10 after:h-10 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0"></div>
      </label>

      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl px-10 py-12">
        {/* ------------ heading ------------ */}
        <h2 className="text-4xl font-extrabold text-center text-teal-700 dark:text-white mb-8 tracking-tight">
          Create Your Account
        </h2>

        <form onSubmit={registerHandler} className="space-y-5">
          {/* ------------ full name ------------ */}
          <Input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, fullName: e.target.value }));
              setErrors((prev) => ({ ...prev, fullNameError: "" }));
            }}
            leadingIcon={UserIcon}
            error={allErrors.fullNameError}
            required
          />

          {/* ------------ email ------------ */}
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, email: e.target.value }));
              setErrors((prev) => ({ ...prev, emailError: "" }));
            }}
            leadingIcon={MailIcon}
            error={allErrors.emailError}
            required
          />

          {/* ------------ password ------------ */}
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, password: e.target.value }));
              setErrors((prev) => ({ ...prev, passwordError: "" }));
            }}
            leadingIcon={LockIcon}
            trailingIcon={showPassword ? EyeOnIcon : EyeOffIcon}
            error={allErrors.passwordError}
            required
          />

          {/* ------------ submit button ------------ */}
          <Button
            type="submit"
            variant="solid"
            size="lg"
            fullWidth
            loading={isLoading}
            inputClassName="bg-teal-500 hover:bg-teal-600"
          >
            Register
          </Button>
        </form>

        {/* ------------ login link ------------ */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?
          <a
            href="/login"
            className="ml-2 text-teal-600 dark:text-teal-400 font-semibold hover:underline hover:text-teal-700 dark:hover:text-teal-300 transition"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Registration;