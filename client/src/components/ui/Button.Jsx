import React from "react";

const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",   // primary | secondary | danger | outline
  size = "md",           // sm | md | lg
  className = "",        // wrapper (if needed)
  buttonClassName = "",  // actual button styling override
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition outline-none";

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };

  const variants = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-300",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-400",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300",
  };

  return (
    <div className={className}>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={`
          ${baseStyles}
          ${sizes[size]}
          ${variants[variant]}
          ${(disabled || loading) ? "opacity-50 cursor-not-allowed" : ""}
          ${buttonClassName}
        `}
      >
        {loading ? "Loading..." : children}
      </button>
    </div>
  );
};

export default Button;