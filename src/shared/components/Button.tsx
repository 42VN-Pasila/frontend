import React from "react";

type ButtonVariant = "primary" | "inverse";
type ButtonSize = "small" | "medium" | "large";
type ButtonGlow = "primary" | "none";
type ButtonShadow = "on" | "off";
type Emphasis = "high" | "low";

const BASE_CLASSES = [
  "w-full inline-flex items-center justify-center rounded-md cursor-pointer",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-focus)]",
  "disabled:opacity-50 disabled:cursor-not-allowed",
  "shadow-sm transition-colors duration-150",
];

const VARIANT_EMPHASIS_CLASSES: Record<
  ButtonVariant,
  Partial<Record<Emphasis, string>>
> = {
  primary: {
    high: [
      "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)]",
      "text-[var(--color-light-gray)] font-medium",
    ].join(" "),
    low: [
      "border-2 border-[var(--color-primary)] text-[var(--color-light-gray)]",
      "hover:bg-[var(--color-primary)]/10 active:bg-[var(--color-primary-active)]/20",
    ].join(" "),
  },
  inverse: {
    high: [
      "bg-[var(--color-light-gray)] hover:bg-[var(--color-light-gray-active)]",
      "text-[var(--color-black)] font-medium",
      "border border-[var(--color-border)]",
    ].join(" "),
    low: [
      "border-2 border-[var(--color-border-strong)]",
      "text-[var(--color-light-gray)]",
      "hover:bg-[var(--color-dark-gray)]/10 active:bg-[var(--color-dark-gray)]/20",
    ].join(" "),
  },
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  small: [
    "text-sm sm:text-md",
    "px-[15px] sm:px-[18px]",
    "h-[40px] sm:h-[48px]",
    "gap-2",
    "font-semibold tracking-wide font-chakraBold"
  ].join(" "),
  
  medium: [
    "text-base sm:text-lg lg:text-xl",
    "px-[18px] sm:px-[22px] lg:px-[25px]",
    "h-[50px] sm:h-[56px] lg:h-[60px]",
    "gap-3 sm:gap-4",
    "font-semibold tracking-wide font-chakraBold"
  ].join(" "),
  
  large: [
    "text-xl sm:text-2xl lg:text-3xl",
    "px-[25px] sm:px-[35px] lg:px-[40px]",
    "h-[70px] sm:h-[85px] lg:h-[100px]",
    "gap-4 sm:gap-5",
    "font-semibold tracking-wide font-chakraBold"
  ].join(" "),
};

const GLOW_CLASSES: Record<ButtonGlow, string> = {
  primary: [
    "shadow-[0_0_15px_var(--color-primary-glow-inner),0_0_30px_var(--color-primary-glow-outer)]",
    "hover:shadow-[0_0_20px_var(--color-primary-glow-inner-hover),0_0_40px_var(--color-primary-glow-outer-hover)]",
  ].join(" "),
  none: "",
};

const SHADOW_CLASSES: Record<ButtonShadow, string> = {
  on: [
    "shadow-[6px_6px_0_var(--color-black)]",
    "hover:shadow-[4px_4px_0_var(--color-black)]",
    "active:shadow-[3px_3px_0_var(--color-black)]",
  ].join(" "),
  off: "",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  emphasis?: Emphasis;
  glow?: ButtonGlow;
  shadow?: ButtonShadow;
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
      glow = "none",
      shadow = "off",
      ...rest
    },
    ref
  ) => {
    const base = VARIANT_EMPHASIS_CLASSES[variant]?.[emphasis] || "";
    const sizeClasses = SIZE_CLASSES[size];
    const glowClasses = GLOW_CLASSES[glow];
    const shadowClasses = SHADOW_CLASSES[shadow];
    const composed = [
      BASE_CLASSES,
      base,
      sizeClasses,
      glowClasses,
      shadowClasses,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={composed}
        disabled={disabled}
        aria-disabled={disabled || undefined}
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
