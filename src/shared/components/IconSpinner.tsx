import React from "react";

export interface IconSpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: string;
  speed?: "slow" | "normal" | "fast";
  label?: string;
  variant?: "ring" | "dots" | "bar";
}

const SIZE_MAP: Record<string, string> = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

function getSpeedStyle(speed: string): React.CSSProperties {
  const duration = speed === "slow" ? "1.5s" : speed === "fast" ? "0.5s" : "1s";
  return {
    animation: `spin ${duration} linear infinite`,
    transformOrigin: "center",
    transformBox: "fill-box",
  };
}

export const IconSpinner = React.forwardRef<HTMLSpanElement, IconSpinnerProps>(
  (
    {
      size = "md",
      color = "text-slate-400",
      speed = "normal",
      label,
      className,
      variant = "ring",
      ...rest
    },
    ref
  ) => {
    const sizeClass = SIZE_MAP[size] || SIZE_MAP.md;

    const base = [
      "inline-flex items-center justify-center",
      sizeClass,
      color,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const ariaLabel = label || "Loading";

    // apply inline animation to svg
    const svgCommon = {
      className: "block h-full w-full",
      role: "img",
      "aria-hidden": label ? undefined : true,
      focusable: false,
      style: getSpeedStyle(speed),
    } as const;

    let content: React.ReactNode;
    if (variant === "dots") {
      content = (
        <svg {...svgCommon} viewBox="0 0 32 8">
          <circle
            cx="4"
            cy="4"
            r="3"
            className="opacity-20"
            fill="currentColor"
          />
          <circle
            cx="16"
            cy="4"
            r="3"
            className="opacity-50"
            fill="currentColor"
          />
          <circle
            cx="28"
            cy="4"
            r="3"
            className="opacity-80"
            fill="currentColor"
          />
        </svg>
      );
    } else if (variant === "bar") {
      content = (
        <svg {...svgCommon} viewBox="0 0 120 30">
          <rect
            x="5"
            y="5"
            width="20"
            height="20"
            rx="3"
            className="opacity-20"
            fill="currentColor"
          />
          <rect
            x="35"
            y="5"
            width="20"
            height="20"
            rx="3"
            className="opacity-40"
            fill="currentColor"
          />
          <rect
            x="65"
            y="5"
            width="20"
            height="20"
            rx="3"
            className="opacity-60"
            fill="currentColor"
          />
          <rect
            x="95"
            y="5"
            width="20"
            height="20"
            rx="3"
            className="opacity-80"
            fill="currentColor"
          />
        </svg>
      );
    } else {
      content = (
        <svg {...svgCommon} viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="opacity-20"
          />
          <path
            d="M22 12a10 10 0 0 0-10-10"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="opacity-80"
          />
        </svg>
      );
    }

    return (
      <span
        ref={ref}
        className={base}
        role={label ? "status" : undefined}
        aria-live={label ? "polite" : undefined}
        {...rest}
      >
        {content}
        {label && (
          <span className="sr-only" data-spinner-label>
            {ariaLabel}
          </span>
        )}
      </span>
    );
  }
);

IconSpinner.displayName = "IconSpinner";

export default IconSpinner;
