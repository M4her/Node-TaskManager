import React from "react";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  error,
  disabled = false,
  className = "",        // wrapper
  inputClassName = "",   // input element
}) => {
  return (
    <div className={`w-full flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-lg outline-none transition
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-400"
              : "border-gray-300 focus:ring-2 focus:ring-blue-400"
          }
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          ${inputClassName}
        `}
      />

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;