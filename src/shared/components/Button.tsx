import React from "react";

type ButtonVariant = "web" | "game";
type ButtonSize = "small" | "medium" | "large";
type ButtonShape = "pill" | "normal";
type Emphasis = "high" | "low";

const BASE_CLASSES = [
  "inline-flex items-center justify-center rounded-md cursor-pointer",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-focus)]",
  "disabled:opacity-50 disabled:cursor-not-allowed",
  "shadow-sm transition-colors duration-150",
];

const VARIANT_EMPHASIS_CLASSES: Record<
  ButtonVariant,
  Record<Emphasis, string>
> = {
  web: {
    high: [
      "bg-[var(--color-teal)] hover:bg-[var(--color-teal-hover)] active:bg-[var(--color-teal-active)]",
      "text-[var(--color-secondary-light-gray)] font-medium",
    ].join(" "),
    low: [
      "border border-[var(--color-teal)] text-[var(--color-teal)]",
      "hover:bg-[var(--color-teal)]/10 active:bg-[var(--color-teal-active)]/20",
      "hover:text-[var(--color-teal-hover)]",
    ].join(" "),
  },
  game: {
    high: [
      "bg-[var(--color-red)] hover:bg-[var( --color-red-hover)] active:bg-[var(--color-red-active)]",
      "text-[var(--color-secondary-light-gray)]",
      "font-[m6x11plus] uppercase",
      " shadow-[6px_6px_0_#000] hover:shadow-[4px_4px_0_#000] active:shadow-[3px_3px_0_#000]",
    ].join(" "),
    low: "",
  },
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  small:
    "text-sm px-[18px] h-[48px] gap-2 font-semibold tracking-wide font-[m6x11plus] uppercase",
  medium:
    "text-lg px-[22px] h-[68px] gap-2 font-semibold tracking-wide font-[m6x11plus] uppercase",
  large:
    "text-2xl px-[25px] h-[120px] gap-3 font-semibold tracking-wide font-[m6x11plus] uppercase",
};

const SHAPE_CLASSES: Record<ButtonShape, string> = {
  pill: "rounded-md",
  normal: "rounded-none",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  emphasis?: Emphasis;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "web",
      size = "medium",
      shape = "pill",
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
    const shapeClasses = SHAPE_CLASSES[shape];
    const composed = [BASE_CLASSES, base, sizeClasses, shapeClasses, className]
      .filter(Boolean)
      .join(" ");

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
