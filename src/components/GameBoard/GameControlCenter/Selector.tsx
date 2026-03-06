import type { ComponentPropsWithoutRef } from "react";

export interface SelectorItem<T extends string> extends Omit<
  ComponentPropsWithoutRef<"button">,
  "value" | "onChange" | "type"
> {
  value: T;
  label?: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface SelectorProps<T extends string> extends Omit<
  ComponentPropsWithoutRef<"div">,
  "value" | "onChange"
> {
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
        <h3
          className={`text-l transition-colors ${value ? "text--color-light-gray mt-0" : "mt-6 text--color-light-gray font-bold"}`}
        >
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
          const {
            Icon,
            value: itemValue,
            label: itemLabel,
            className: itemClassName,
            ...buttonProps
          } = it;
          const isActive = value === itemValue;

          return (
            <button
              key={String(itemValue)}
              type="button"
              disabled={disabled}
              onClick={() => onChange(itemValue)}
              {...buttonProps}
              className={`
                flex items-center justify-center transition-all
                aspect-square p-2 
                ${disabled ? "opacity-70" : "hover:bg-(--rave-white)"}
                ${
                  isActive
                    ? "bg-(--rave-white) ring-3 ring-rave-red scale-105 z-10 hover:bg-(--rave-light-red)"
                    : "border-(--color-dark-gray) ring-1 bg-transparent"
                }
                ${itemClassName ?? ""}
              `}
            >
              <div className="w-full h-full max-w-[20px] max-h-[20px] md:max-w-[24px] md:max-h-[24px]">
                <Icon
                  className="w-full h-full object-contain"
                  aria-hidden="true"
                />
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
