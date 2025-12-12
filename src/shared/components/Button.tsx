import React from "react";

type ButtonVariant = "landing" | "game";
type ButtonSize = "small" | "medium" | "large";
type Emphasis = "high" | "low";

const BASE_CLASSES = [
  "inline-flex items-center justify-center rounded-md cursor-pointer",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-focus)]",
  "disabled:opacity-50 disabled:cursor-not-allowed",
  "shadow-sm transition-colors duration-150",
];

const VARIANT_EMPHASIS_CLASSES: Record<
  ButtonVariant,
  Partial<Record<Emphasis, string>>
> = {
  landing: {
    high: [
      "bg-[var(--color-landing)] hover:bg-[var(--color-landing-hover)] active:bg-[var(--color-landing-active)]",
      "text-[var(--color-secondary-light-gray)] font-medium",
      "shadow-[0_0_15px_rgba(0,221,170,0.6),0_0_30px_rgba(0,221,170,0.3)]",
      "hover:shadow-[0_0_20px_rgba(0,221,170,0.8),0_0_40px_rgba(0,221,170,0.5)]",
    ].join(" "),
    low: [
      "border-2 border-[var(--color-landing)] text-[var(--color-secondary-light-gray)]",
      "hover:bg-[var(--color-landing)]/10 active:bg-[var(--color-landing-active)]/20",
      "hover:text-[var(--color-landing-hover)]",
      "shadow-[0_0_15px_rgba(0,221,170,0.6),0_0_30px_rgba(0,221,170,0.3)]",
      "hover:shadow-[0_0_20px_rgba(0,221,170,0.8),0_0_40px_rgba(0,221,170,0.5)]",
    ].join(" "),
  },
  game: {
    high: [
      "bg-[var(--color-red)] hover:bg-[var( --color-red-hover)] active:bg-[var(--color-red-active)]",
      "text-[var(--color-secondary-light-gray)]",
      "font-[m6x11plus] uppercase",
      " shadow-[6px_6px_0_#000] hover:shadow-[4px_4px_0_#000] active:shadow-[3px_3px_0_#000]",
    ].join(" "),
  },
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  small:
    "text-md px-[18px] h-[48px] gap-2 font-semibold tracking-wide font-[m6x11plus] uppercase",
  medium:
    "text-xl px-[22px] h-[60px] gap-2 font-semibold tracking-wide font-[m6x11plus] uppercase",
  large:
    "text-4xl px-[25px] h-[100px] gap-3 font-semibold tracking-wide font-[m6x11plus] uppercase",
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
      variant = "landing",
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
    const base = VARIANT_EMPHASIS_CLASSES[variant]?.[emphasis] || "";
    const sizeClasses = SIZE_CLASSES[size];
    const composed = [BASE_CLASSES, base, sizeClasses, className]
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
