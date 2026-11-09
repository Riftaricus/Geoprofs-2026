import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: ReactNode;
};

const baseClasses =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:border-transparent disabled:bg-disabled disabled:text-disabled-ink";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-geo-800 text-white hover:bg-geo-900",
  secondary:
    "border border-geo-800 bg-white text-geo-800 hover:bg-surface-subtle",
  ghost: "bg-transparent text-geo-800 hover:bg-surface-subtle",
};

export function Button({
  variant = "primary",
  icon,
  type = "button",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
