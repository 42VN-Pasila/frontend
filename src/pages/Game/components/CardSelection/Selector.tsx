export interface SelectorItem<T extends string> {
  value: T;
  label?: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface SelectorProps<T extends string> {
  items: SelectorItem<T>[];
  value: T | null;
  onChange: (value: T) => void;
  disabled?: boolean;
  columns?: number;
  className?: string;
}

function Selector<T extends string>({
  items,
  value,
  onChange,
  disabled = false,
  columns = 4,
  className = "",
}: SelectorProps<T>) {
  return (
    <div
      className={`${className} grid gap-2 md:gap-3`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {items.map((it) => {
        const Icon = it.Icon;
        const isActive = value === it.value;

        return (
          <button
            key={String(it.value)}
            type="button"
            disabled={disabled}
            onClick={() => onChange(it.value)}
            className={`
              flex items-center justify-center rounded-lg border transition-all
              aspect-square p-1 md:p-2 
              ${disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-50"}
              ${isActive
                ? "bg-white border-(--color-primary) ring-2 md:ring-4 ring-(--color-primary) scale-105 z-10"
                : "border-slate-700 bg-slate-800/40"
              }
            `}
          >

            <div className="w-full h-full max-w-[20px] max-h-[20px] md:max-w-[24px] md:max-h-[24px]">
               <Icon className="w-full h-full object-contain" />
            </div>
            
            {it.label && <span className="sr-only">{it.label}</span>}
          </button>
        );
      })}
    </div>
  );
}

export default Selector;
