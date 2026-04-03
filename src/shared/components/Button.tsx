import React from "react";

import { twMerge } from "tailwind-merge";

import type {
  ComponentEmphasis,
  ComponentSize,
  ComponentVariant,
} from "./types";

type ButtonGlow = "primary" | "none";
type ButtonShadow = "on" | "off";

const BASE_CLASSES = [
  "inline-flex items-center justify-center cursor-pointer",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-focus)]",
  "disabled:opacity-90 disabled:cursor-not-allowed",
  "shadow-sm transition-colors duration-150",
];

const VARIANT_EMPHASIS_CLASSES: Record<
  ComponentVariant,
  Record<ComponentEmphasis, string>
> = {
  primary: {
    high: [
      "bg-rave-red hover:bg-rave-red/80 active:bg-rave-red/60",
      "text-rave-black font-medium",
    ].join(" "),
    low: [
      "border-2 border-rave-red text-rave-white",
      "hover:bg-rave-red/5 active:bg-rave-red/10",
    ].join(" "),
  },
  inverse: {
    high: [
      "bg-rave-white hover:bg-rave-white/80 active:bg-rave-white/60",
      "text-rave-black font-medium",
      "border border-rave-white/10",
    ].join(" "),
    low: [
      "border border-rave-white/20 bg-rave-white/5",
      "text-rave-white",
      "hover:bg-rave-white/10 active:bg-rave-white/20",
    ].join(" "),
  },
};

const SIZE_CLASSES: Record<ComponentSize, string> = {
  small: [
    "text-sm sm:text-md",
    "px-[15px] sm:px-[18px]",
    "h-[40px] sm:h-[48px]",
    "font-semibold tracking-wide font-chakraBold",
  ].join(" "),

  medium: [
    "text-base sm:text-lg lg:text-xl",
    "px-[18px] sm:px-[22px] lg:px-[25px]",
    "h-[50px] sm:h-[56px] lg:h-[60px]",
    "w-[150px] md:w-[180px] lg:w-[200px]",
    "font-semibold tracking-wide font-chakraBold",
  ].join(" "),

  large: [
    "text-xl sm:text-2xl lg:text-3xl",
    "px-[25px] sm:px-[35px] lg:px-[40px]",
    "h-[60px] sm:h-[85px] lg:h-[100px]",
    "w-[150px] md:w-[180px] lg:w-[200px]",
    "font-semibold tracking-wide font-chakraBold",
  ].join(" "),
};

const GLOW_CLASSES: Record<ButtonGlow, string> = {
  primary: [
    "shadow-[0_0_15px_var(--color-red),0_0_30px_var(--color-red)]",
    "hover:shadow-[0_0_20px_var(--color-red-hover),0_0_40px_var(--color-red-hover)]",
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

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ComponentVariant;
  size?: ComponentSize;
  emphasis?: ComponentEmphasis;
  glow?: ButtonGlow;
  shadow?: ButtonShadow;
  fullWidth?: boolean;
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
      fullWidth = false,
      ...rest
    },
    ref,
  ) => {
    const base = VARIANT_EMPHASIS_CLASSES[variant][emphasis];
    const sizeClasses = SIZE_CLASSES[size];
    const glowClasses = GLOW_CLASSES[glow];
    const shadowClasses = SHADOW_CLASSES[shadow];
    const composed = twMerge(
      ...BASE_CLASSES,
      base,
      sizeClasses,
      glowClasses,
      shadowClasses,
      className,
      fullWidth ? "!w-full" : "",
    );

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
  },
);

Button.displayName = "Button";

export default Button;
