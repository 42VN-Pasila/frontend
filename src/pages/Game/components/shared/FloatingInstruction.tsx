interface FloatingInstructionProps
  extends React.ComponentPropsWithoutRef<"div"> {
  text: string;
  visible?: boolean;
  children: React.ReactNode;
}

const FloatingInstruction = ({
  text,
  visible = true,
  children,
  className,
  ...rest
}: FloatingInstructionProps) => {

  return (
    <div className="relative w-full">
      {visible && (
        <div
          {...rest}
          className={[
            "z-20 pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2",
            "w-fit whitespace-nowrap animate-bounce",
            "bg-(--color-purple) text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg",
            "flex items-center justify-center text-center",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {text}
        </div>
      )}

      <div
        className={`rounded-xl transition-all duration-500 ${
          visible
            ? "p-4 ring-2 ring-(--color-primary) bg-blue-500/5 shadow-[0_0_20px_var(--color-primary)] shadow-opacity-20"
            : "p-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default FloatingInstruction;