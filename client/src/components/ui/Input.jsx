import React, { useState } from "react";
import { Button } from "./Button.Jsx";

// ─── Core Input Component ───────────────────────────────────────────────────

/**
 * Input
 *
 * Props:
 *  label        – string   – field label
 *  id           – string   – links <label> to <input>; defaults to name
 *  name         – string   – input name
 *  type         – string   – "text" | "email" | "password" | "number" | "search" | "tel" | "url"
 *  placeholder  – string
 *  value        – string   – controlled value
 *  onChange     – fn       – (e) => void
 *  onBlur       – fn       – (e) => void
 *  error        – string   – shows error state + message
 *  hint         – string   – helper text (hidden when error is set)
 *  disabled     – bool
 *  required     – bool
 *  leadingIcon   – ReactNode – icon rendered left of the text
 *  trailingIcon  – ReactNode – icon rendered right (e.g. clear btn, show/hide)
 *  className     – string   – extra classes on the outer wrapper div
 *  inputClassName – string  – extra classes applied directly on the <input> element
 */
export function Input({
  label,
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  hint,
  disabled = false,
  required = false,
  leadingIcon,
  trailingIcon,
  className = "",
  inputClassName = "",
}) {
  const inputId = id ?? name;
  const isError = Boolean(error);

  const baseInput =
    "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all duration-150 " +
    "dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 ";

  const stateClasses = isError
    ? "border-red-400 ring-2 ring-red-100 focus:border-red-500 focus:ring-red-200 dark:border-red-500 dark:ring-red-900/40"
    : "border-zinc-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:border-zinc-700 dark:focus:border-violet-400 dark:focus:ring-violet-900/40";

  const disabledClasses = disabled
    ? "cursor-not-allowed opacity-50 select-none"
    : "";

  const paddingLeft = leadingIcon ? "pl-10" : "";
  const paddingRight = trailingIcon ? "pr-10" : "";

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500" aria-hidden>
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        {leadingIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400 dark:text-zinc-500">
            {leadingIcon}
          </span>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          aria-invalid={isError}
          aria-describedby={
            isError
              ? `${inputId}-error`
              : hint
              ? `${inputId}-hint`
              : undefined
          }
          className={`${baseInput} ${stateClasses} ${disabledClasses} ${paddingLeft} ${paddingRight} ${inputClassName}`}
        />

        {trailingIcon && (
          <span className="absolute inset-y-0 right-3 flex items-center text-zinc-400 dark:text-zinc-500">
            {trailingIcon}
          </span>
        )}
      </div>

      {isError && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400"
        >
          <ErrorIcon />
          {error}
        </p>
      )}

      {!isError && hint && (
        <p
          id={`${inputId}-hint`}
          className="text-xs text-zinc-500 dark:text-zinc-400"
        >
          {hint}
        </p>
      )}
    </div>
  );
}

// ─── Small SVG helpers ───────────────────────────────────────────────────────

function ErrorIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11" r=".75" fill="currentColor" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.5 10.5 13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1.5 5l6.5 4.5L14.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon({ visible }) {
  return visible ? (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <ellipse cx="8" cy="8" rx="6.5" ry="4" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <ellipse cx="8" cy="8" rx="6.5" ry="4" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

// ─── Demo / Showcase ─────────────────────────────────────────────────────────

export default function Demo() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    search: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = submitted
    ? {
        name: !form.name ? "Full name is required." : "",
        email: !form.email
          ? "Email is required."
          : !/\S+@\S+\.\S+/.test(form.email)
          ? "Enter a valid email address."
          : "",
        password:
          form.password.length > 0 && form.password.length < 8
            ? "Password must be at least 8 characters."
            : "",
      }
    : { name: "", email: "", password: "" };

  const handle = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-100 dark:bg-violet-900/40 px-3 py-1 text-xs font-medium text-violet-700 dark:text-violet-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
            Reusable Component
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Input Component
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Accessible, composable, works with any form library.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm space-y-5">
          {/* Default */}
          <Input
            label="Full name"
            name="name"
            placeholder="Jane Smith"
            value={form.name}
            onChange={handle("name")}
            required
            error={errors.name}
          />

          {/* With leading icon */}
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={handle("email")}
            leadingIcon={<MailIcon />}
            error={errors.email}
            hint="We'll never share your email."
          />

          {/* Password with trailing toggle */}
          <Input
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Min. 8 characters"
            value={form.password}
            onChange={handle("password")}
            error={errors.password}
            hint="Use letters, numbers, and symbols."
            trailingIcon={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <EyeIcon visible={showPassword} />
              </button>
            }
          />

          {/* Search with leading icon */}
          <Input
            label="Search"
            name="search"
            type="search"
            placeholder="Search anything…"
            value={form.search}
            onChange={handle("search")}
            leadingIcon={<SearchIcon />}
            hint="Press Enter to search."
          />

          {/* Disabled */}
          <Input
            label="Read-only field"
            name="readonly"
            value="Cannot be edited"
            disabled
          />

          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="w-full rounded-xl bg-violet-600 hover:bg-violet-700 active:scale-[0.98] text-white text-sm font-medium py-2.5 px-4 transition-all duration-150"
          >
            Validate form
          </button>

          {submitted &&
            !errors.name &&
            !errors.email &&
            !errors.password && (
              <p className="text-center text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ All fields look good!
              </p>
            )}
        </div>

        {/* Variant chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {["text", "email", "password", "search", "tel", "url", "number"].map(
            (t) => (
              <span
                key={t}
                className="rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1 text-xs text-zinc-500 dark:text-zinc-400"
              >
                type="{t}"
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Input;