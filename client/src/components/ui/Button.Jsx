import React, { useState } from "react";

// ─── Spinner ─────────────────────────────────────────────────────────────────

function Spinner({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="animate-spin shrink-0"
    >
      <circle
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeOpacity="0.25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────

/**
 * Button
 *
 * Props:
 *  variant    – "solid" | "outline" | "ghost" | "danger" | "success" | "link"
 *  size       – "xs" | "sm" | "md" | "lg" | "xl"
 *  loading    – bool    – shows spinner, disables interaction
 *  disabled   – bool
 *  fullWidth  – bool    – w-full
 *  leftIcon   – ReactNode
 *  rightIcon  – ReactNode
 *  onClick    – fn
 *  type       – "button" | "submit" | "reset"
 *  className  – string  – extra Tailwind classes
 *  children   – ReactNode
 */
export function Button({
  variant = "solid",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  type = "button",
  className = "",
  children,
}) {
  const isDisabled = disabled || loading;

  // ── Size tokens ──────────────────────────────────────────────────────────
  const sizes = {
    xs: "h-7  px-2.5 text-xs  gap-1.5 rounded-lg",
    sm: "h-8  px-3   text-sm  gap-1.5 rounded-lg",
    md: "h-9  px-4   text-sm  gap-2   rounded-xl",
    lg: "h-11 px-5   text-base gap-2  rounded-xl",
    xl: "h-13 px-6   text-base gap-2.5 rounded-2xl",
  };

  // Icon size per button size
  const iconSize = { xs: 12, sm: 13, md: 15, lg: 16, xl: 18 }[size];

  // ── Variant tokens ───────────────────────────────────────────────────────
  const variants = {
    solid:
      "bg-zinc-900 text-white hover:bg-zinc-700 active:bg-zinc-800 " +
      "dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:active:bg-zinc-200 " +
      "shadow-sm",

    outline:
      "border border-zinc-300 text-zinc-800 bg-transparent hover:bg-zinc-50 active:bg-zinc-100 " +
      "dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:active:bg-zinc-700",

    ghost:
      "text-zinc-700 bg-transparent hover:bg-zinc-100 active:bg-zinc-200 " +
      "dark:text-zinc-300 dark:hover:bg-zinc-800 dark:active:bg-zinc-700",

    danger:
      "bg-red-600 text-white hover:bg-red-500 active:bg-red-700 " +
      "dark:bg-red-500 dark:hover:bg-red-400 dark:active:bg-red-600 " +
      "shadow-sm",

    success:
      "bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700 " +
      "dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:active:bg-emerald-600 " +
      "shadow-sm",

    link:
      "text-violet-600 bg-transparent hover:text-violet-800 active:text-violet-900 " +
      "dark:text-violet-400 dark:hover:text-violet-300 underline-offset-4 hover:underline px-0",
  };

  const disabledClasses = isDisabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className={[
        "inline-flex items-center justify-center font-medium",
        "transition-all duration-150 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-500",
        "active:scale-[0.97]",
        "select-none whitespace-nowrap",
        sizes[size],
        variants[variant],
        disabledClasses,
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {loading ? (
        <Spinner size={iconSize} />
      ) : (
        leftIcon && (
          <span style={{ width: iconSize, height: iconSize }} className="shrink-0 flex items-center justify-center">
            {leftIcon}
          </span>
        )
      )}

      {children && (
        <span className={loading ? "opacity-70" : ""}>{children}</span>
      )}

      {!loading && rightIcon && (
        <span style={{ width: iconSize, height: iconSize }} className="shrink-0 flex items-center justify-center">
          {rightIcon}
        </span>
      )}
    </button>
  );
}

// ─── Icon-only Button ─────────────────────────────────────────────────────────

/**
 * IconButton — square button for icon-only actions
 *
 * Props: same as Button minus leftIcon/rightIcon/children
 *  icon      – ReactNode  – the icon to render
 *  label     – string     – required aria-label for accessibility
 */
export function IconButton({
  icon,
  label,
  variant = "ghost",
  size = "md",
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  className = "",
}) {
  const isDisabled = disabled || loading;

  const sizes = {
    xs: "w-7  h-7  rounded-lg  text-xs",
    sm: "w-8  h-8  rounded-lg  text-sm",
    md: "w-9  h-9  rounded-xl  text-sm",
    lg: "w-11 h-11 rounded-xl  text-base",
    xl: "w-13 h-13 rounded-2xl text-base",
  };

  const iconSize = { xs: 13, sm: 14, md: 16, lg: 18, xl: 20 }[size];

  const variants = {
    solid:
      "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300",
    outline:
      "border border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800",
    ghost:
      "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800",
    danger:
      "bg-red-600 text-white hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-400",
    success:
      "bg-emerald-600 text-white hover:bg-emerald-500",
    link: "text-violet-600 hover:text-violet-800 dark:text-violet-400",
  };

  return (
    <button
      type={type}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      aria-label={label}
      aria-busy={loading}
      className={[
        "inline-flex items-center justify-center shrink-0",
        "transition-all duration-150 ease-out active:scale-[0.93]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-500",
        sizes[size],
        variants[variant],
        isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {loading ? <Spinner size={iconSize} /> : icon}
    </button>
  );
}

// ─── ButtonGroup ─────────────────────────────────────────────────────────────

/**
 * ButtonGroup — attaches buttons side-by-side with shared border treatment
 */
export function ButtonGroup({ children, className = "" }) {
  return (
    <div
      role="group"
      className={`inline-flex [&>button]:rounded-none [&>button:first-child]:rounded-l-xl [&>button:last-child]:rounded-r-xl [&>button:not(:last-child)]:-mr-px ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Demo ─────────────────────────────────────────────────────────────────────

// Tiny SVG icon helpers for the demo
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M2.5 4.5h11M6 4.5V3h4v1.5M4 4.5l.8 9h6.4l.8-9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const BoldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M4 3h4.5a3 3 0 0 1 0 6H4V3ZM4 9h5a3 3 0 0 1 0 6H4V9Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);
const ItalicIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M10 3H6M6.5 13H10M9 3 7 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const UnderlineIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M4 3v5a4 4 0 0 0 8 0V3M2.5 13h11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

function Section({ title, children }) {
  return (
    <div>
      <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-3">{title}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export default function Demo() {
  const [loadingId, setLoadingId] = useState(null);

  const simulate = (id) => {
    setLoadingId(id);
    setTimeout(() => setLoadingId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-10">

        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 bg-zinc-800 text-zinc-400 text-xs px-3 py-1 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Reusable Component
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">Button Component</h1>
          <p className="text-zinc-400 mt-1 text-sm">6 variants · 5 sizes · loading · icons · icon-only · group</p>
        </div>

        <div className="space-y-8">

          {/* Variants */}
          <Section title="Variants">
            <Button variant="solid">Solid</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="success">Success</Button>
            <Button variant="link">Link</Button>
          </Section>

          {/* Sizes */}
          <Section title="Sizes">
            <Button size="xs">X-Small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">X-Large</Button>
          </Section>

          {/* With icons */}
          <Section title="With icons">
            <Button leftIcon={<PlusIcon />}>New item</Button>
            <Button variant="outline" rightIcon={<ArrowIcon />}>Continue</Button>
            <Button variant="danger" leftIcon={<TrashIcon />}>Delete</Button>
            <Button variant="success" leftIcon={<CheckIcon />}>Confirm</Button>
          </Section>

          {/* Loading */}
          <Section title="Loading state">
            <Button loading={loadingId === "a"} onClick={() => simulate("a")}>
              {loadingId === "a" ? "Saving…" : "Save changes"}
            </Button>
            <Button
              variant="outline"
              loading={loadingId === "b"}
              onClick={() => simulate("b")}
              leftIcon={<PlusIcon />}
            >
              {loadingId === "b" ? "Creating…" : "Create project"}
            </Button>
            <Button variant="danger" loading={loadingId === "c"} onClick={() => simulate("c")}>
              {loadingId === "c" ? "Deleting…" : "Delete all"}
            </Button>
          </Section>

          {/* Disabled */}
          <Section title="Disabled">
            <Button disabled>Solid</Button>
            <Button variant="outline" disabled>Outline</Button>
            <Button variant="ghost" disabled>Ghost</Button>
            <Button variant="danger" disabled>Danger</Button>
          </Section>

          {/* Full width */}
          <div>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-3">Full width</p>
            <Button fullWidth leftIcon={<CheckIcon />}>
              Complete setup
            </Button>
          </div>

          {/* Icon buttons */}
          <Section title="Icon-only (IconButton)">
            <IconButton icon={<PlusIcon />} label="Add" variant="solid" />
            <IconButton icon={<PlusIcon />} label="Add" variant="outline" />
            <IconButton icon={<PlusIcon />} label="Add" variant="ghost" />
            <IconButton icon={<TrashIcon />} label="Delete" variant="danger" />
            <IconButton icon={<CheckIcon />} label="Confirm" variant="success" />
            <IconButton icon={<PlusIcon />} label="Loading" loading />
          </Section>

          {/* Icon button sizes */}
          <Section title="Icon-only sizes">
            <IconButton icon={<PlusIcon />} label="xs" size="xs" variant="outline" />
            <IconButton icon={<PlusIcon />} label="sm" size="sm" variant="outline" />
            <IconButton icon={<PlusIcon />} label="md" size="md" variant="outline" />
            <IconButton icon={<PlusIcon />} label="lg" size="lg" variant="outline" />
            <IconButton icon={<PlusIcon />} label="xl" size="xl" variant="outline" />
          </Section>

          {/* Button group */}
          <div>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-3">Button group</p>
            <ButtonGroup>
              <Button variant="outline" leftIcon={<BoldIcon />}>Bold</Button>
              <Button variant="outline" leftIcon={<ItalicIcon />}>Italic</Button>
              <Button variant="outline" leftIcon={<UnderlineIcon />}>Underline</Button>
            </ButtonGroup>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Button;