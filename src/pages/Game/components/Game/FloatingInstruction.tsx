interface FloatingInstructionProps
  extends React.ComponentPropsWithoutRef<"div"> {
  text: string;
  visible?: boolean;
}

const FloatingInstruction = ({
  text,
  visible = true,
  className,
  ...rest
}: FloatingInstructionProps) => {
  if (!visible) return null;

  return (
    <div
      {...rest}
      className={[
        "absolute left-1/2 -translate-x-1/2",
        "animate-bounce",
        "text-white text-sm font-bold",
        "px-3 py-1 rounded-full shadow-lg",
        "flex items-center gap-2",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {text}
    </div>
  );
};

export default FloatingInstruction;