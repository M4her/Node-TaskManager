import React, { useState, useEffect } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link } from "react-router";
import { useRegistrationMutation } from "../services/api";

const Registration = () => {
  const [registerUser] = useRegistrationMutation();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (form.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!form.email.includes("@") || !form.email.includes(".")) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const res = await registerUser(form);
    if (res.error) {
      const field = res.error.data.field;
      if (field == "email") return setErrors({ email: res.error.data.message });
      if (field == "fullName")
        return setErrors({ fullName: res.error.data.message });
      if (field == "password")
        return setErrors({ password: res.error.data.message });
    }

    setLoading(false);
    console.log("Registration Success")
  };

 
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-center">Create Account</h2>

        <Input
          label="Full Name"
          name="fullName"
          placeholder="Enter your full name"
          value={form.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <Button type="submit" loading={loading} buttonClassName="w-full">
          Register
        </Button>
        <p className="ml-auto">
          {" "}
          Already have an account?
          <Link to="/login" className="text-blue-500 ml-2">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;
