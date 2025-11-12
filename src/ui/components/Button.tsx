import React from "react";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "small" | "medium" | "large";
type Emphasis = "high" | "low";

const VARIANT_EMPHASIS_CLASSES: Record<
  ButtonVariant,
  Record<Emphasis, string>
> = {
  primary: {
    high: "inline-flex items-center justify-center rounded-md cursor-pointer bg-[#FF5F24] hover:bg-[#ff6f3a] text-[#0E0603] shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed",
    low: "inline-flex items-center justify-center rounded-md cursor-pointer border border-[#FF5F24] bg-transparent hover:bg-[#FF5F24] hover:text-[#0E0603] text-[#FF5F24] shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed",
  },
  secondary: {
    high: "inline-flex items-center justify-center rounded-md cursor-pointer bg-[#CCC8C7] hover:bg-[#ff6f3a] text-[#0E0603] shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed",
    low: "inline-flex items-center justify-center rounded-md cursor-pointer border border-[#CCC8C7] bg-transparent hover:bg-[#ff6f3a] hover:text-[#0E0603] text-[#CCC8C7] shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed",
  },
  danger: {
    high: "inline-flex items-center justify-center rounded-md cursor-pointer bg-red-600 hover:bg-red-500 text-white shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50 disabled:cursor-not-allowed",
    low: "inline-flex items-center justify-center rounded-md cursor-pointer border border-red-600 bg-transparent hover:bg-red-600 hover:text-white text-red-600 shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50 disabled:cursor-not-allowed",
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
