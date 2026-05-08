import React, { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link } from "react-router";
import { useLoginMutation } from "../services/api";

const Login = ({ onSubmit }) => {
  const [loginUser] = useLoginMutation();

  const [form, setForm] = useState({
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

    const res = await loginUser(form);
    if (res.error) {
      const field = res.error.data.field;
      if (field == "email") return setErrors({ email: res.error.data.message });

      if (field == "password")
        return setErrors({ password: res.error.data.message });
    }

    setLoading(false);
    console.log("Login Successfully");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>

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
          Login
        </Button>
        <p className="ml-auto">
          {" "}
          Don't have an account?
          <Link to="/registration" className="text-blue-500 ml-2">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
