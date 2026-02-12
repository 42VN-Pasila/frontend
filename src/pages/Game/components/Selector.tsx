import type { SelectorItem } from "./selectorData";

export interface SelectorProps<T extends string | number = string> {
  items: SelectorItem<T>[];
  value: T | null;
  onChange: (value: T) => void;
  disabled?: boolean;
  columns?: number;
  className?: string;
}

function Selector<T extends string | number>({
  items,
  value,
  onChange,
  disabled = false,
  columns = 4,
  className = "",
}: SelectorProps<T>) {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        flexWrap: "wrap",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: 12,
      }}
    >
      {items.map((it) => {
        const Icon = it.Icon;
        const isActive = value === it.value;

        return (
          <button
            key={String(it.value)}
            type="button"
            aria-label={it.label}
            disabled={disabled}
            onClick={() => onChange(it.value)}
            className={[
              "flex items-center justify-center gap-2 rounded-lg border px-3 py-2",
              disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50",
              isActive ? "bg-white border-(--color-primary) ring-4 ring-(--color-primary) scale-[1.1] transition-all duration-200 ease-out" : "border-gray-300",
            ].join(" ")}
          >
            <Icon width={20} height={20} />
            {it.label && <span className="sr-only">{it.label}</span>}
          </button>
        );
      })}
    </div>
  );
}

export default Selector;
