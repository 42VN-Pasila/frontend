import { twMerge } from "tailwind-merge";

export const Label = ({
  children,
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  const composed = twMerge(
    "block text-sm font-medium mb-1 text-rave-white",
    className,
  );
  return (
    <label className={composed} {...props}>
      {children}
    </label>
  );
};
