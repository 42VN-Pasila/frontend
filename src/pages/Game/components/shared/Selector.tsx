import type { ComponentPropsWithoutRef } from "react";

export interface SelectorItem<T extends string> 
  extends Omit<ComponentPropsWithoutRef<"button">, "value" | "onChange" | "type"> {
  value: T;
  label?: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface SelectorProps<T extends string> 
  extends Omit<ComponentPropsWithoutRef<"div">, "value" | "onChange"> {
  items: SelectorItem<T>[];
  value: T | null;
  onChange: (value: T) => void;
  disabled?: boolean;
  columns: number;
  label: string;
}

function Selector<T extends string>({
  items,
  value,
  onChange,
  disabled = false,
  columns = 4,
  label,
  className = "",
  style,
  ...rest
}: SelectorProps<T>) {
  return (
    <div {...rest} className={`flex flex-col gap-4 ${className}`}>
      
      {label && (
        <h3 className={`text-l transition-colors ${value ? "text-slate-400" : "text-white font-bold"}`}>
          {label}
        </h3>
      )}

      <div
        className="grid gap-2 md:gap-3"
        style={{
          ...style,
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {items.map((it) => {
          const { Icon, value: itemValue, label: itemLabel, className: itemClassName, ...buttonProps } = it;
          const isActive = value === itemValue;

          return (
            <button
              key={String(itemValue)}
              type="button"
              disabled={disabled}
              onClick={() => onChange(itemValue)}
              {...buttonProps}
              className={`
                flex items-center justify-center rounded-lg border transition-all
                aspect-square p-1 md:p-2 
                ${disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100/10"}
                ${isActive
                  ? "bg-white border-(--color-primary) ring-2 md:ring-4 ring-(--color-primary) scale-105 z-10"
                  : "border-slate-700 bg-slate-800/40"
                }
                ${itemClassName ?? ""}
              `}
            >
              <div className="w-full h-full max-w-[16px] max-h-[16px] md:max-w-[24px] md:max-h-[24px]">
                 <Icon className="w-full h-full object-contain" aria-hidden="true" />
              </div>
              {itemLabel && <span className="sr-only">{itemLabel}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Selector;