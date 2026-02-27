interface NameTagProps extends React.ComponentPropsWithoutRef<"div"> {
  isSelected?: boolean;
  children: React.ReactNode;
}

const NameTag = ({ isSelected, children, className = "", ...props }: NameTagProps) => (
  <div
    {...props}
    className={`
      min-w-[200px] px-4 py-1 rounded-lg transition-all duration-300
      bg-(--color-orange) backdrop-blur-md shadow-lg
      ${
        isSelected
          ? "bg-(--color-orange) scale-105"
          : "opacity-70 group-hover:opacity-100"
      }
      ${className}
`}
  >
    <span
      className={`text-sm md:text-base font-bold tracking-wide transition-colors duration-300 ${
        isSelected ? "text-white" : "text-slate-300 group-hover:text-white"
      }`}
    >
      {children}
    </span>
  </div>
);

export default NameTag;