import React from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "small" | "medium" | "large";
type Emphasis = "high" | "low";

const VARIANT_EMPHASIS_CLASSES: Record<
  ButtonVariant,
  Record<Emphasis, string>
> = {
  primary: {
    high: [
      "inline-flex items-center justify-center rounded-md cursor-pointer",
      "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)]",
      "text-[var(--color-secondary-black)] font-medium",
      "shadow-sm transition-colors duration-150",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-focus)]",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ].join(" "),
    low: [
      "inline-flex items-center justify-center rounded-md cursor-pointer",
      "border border-[var(--color-primary)] text-[var(--color-primary)]",
      "hover:bg-[var(--color-primary)]/10 active:bg-[var(--color-primary)]/20",
      "hover:text-[var(--color-primary-hover)]",
      "shadow-sm transition-colors duration-150",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-focus)]",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ].join(" "),
  },
  secondary: {
    high: [
      "inline-flex items-center justify-center rounded-md cursor-pointer",
      "bg-[var(--color-secondary-light-gray)] hover:bg-[var(--color-secondary-border)] active:bg-[var(--color-secondary-border-strong)]",
      "text-[var(--color-secondary-black)]",
      "shadow-sm transition-colors duration-150",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary-border-strong)]",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ].join(" "),
    low: [
      "inline-flex items-center justify-center rounded-md cursor-pointer",
      "border border-[var(--color-secondary-border-strong)] text-[var(--color-secondary-light-gray)] hover:text-[var(--color-secondary-dark-gray)]",
      "hover:bg-[var(--color-secondary-light-gray)] active:bg-[var(--color-secondary-light-gray-active)]",
      "shadow-sm transition-colors duration-150",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary-border-strong)]",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ].join(" "),
  },
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  small: "text-sm px-[10px] h-[32px] gap-2 font-medium tracking-wide",
  medium: "text-sm px-[14px] h-[40px] gap-2 font-medium tracking-wide",
  large: "text-base px-[18px] h-[48px] gap-3 font-semibold tracking-wide",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  emphasis?: Emphasis;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      emphasis = "high",
      disabled = false,
      children,
      className,
      type = "button",
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled;
    const base = VARIANT_EMPHASIS_CLASSES[variant][emphasis];
    const sizeClasses = SIZE_CLASSES[size];
    const composed = [base, sizeClasses, className].filter(Boolean).join(" ");

    return (
      <button
        ref={ref}
        className={composed}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        type={type}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
