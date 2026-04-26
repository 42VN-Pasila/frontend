import type { ComponentPropsWithoutRef } from "react";

import { twMerge } from "tailwind-merge";

export type AvatarShape = "square" | "circle";

export type AvatarProps = Omit<ComponentPropsWithoutRef<"img">, "children"> & {
  shape?: AvatarShape;
  fallbackText?: string;
  wrapperClassName?: string;
};

export const Avatar = ({
  src,
  alt,
  shape = "circle",
  fallbackText,
  className,
  wrapperClassName,
  ...props
}: AvatarProps) => {
  const resolvedFallback =
    fallbackText ?? (alt?.trim()?.[0]?.toUpperCase() || "?");
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-md";

  const wrapperClasses = twMerge(
    "inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden border border-rave-white/20 bg-rave-white/5 text-rave-white",
    shapeClass,
    wrapperClassName,
  );

  const imageClasses = twMerge("h-full w-full object-cover", className);

  if (!src) {
    return (
      <span className={wrapperClasses} aria-label={alt} role="img">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            fill="currentColor"
            className="font-bold text-[45px]"
            dy=".05em"
          >
            {resolvedFallback}
          </text>
        </svg>
      </span>
    );
  }

  return (
    <span className={wrapperClasses}>
      <img src={src} alt={alt} className={imageClasses} {...props} />
    </span>
  );
};

export default Avatar;
