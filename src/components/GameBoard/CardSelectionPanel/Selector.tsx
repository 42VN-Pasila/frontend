import { Label } from "@/shared/components/Label";
import type { ComponentPropsWithoutRef } from "react";

export interface SelectorItem<T extends string> {
  value: T,
  label?: string,
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
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
    <div {...rest} className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <Label className="font-bold tracking-widest text-lg">{label}</Label>
      )
      }
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
          } = it;
          const isActive = value === itemValue;

          return (
            <button
              key={String(itemValue)}
              type="button"
              disabled={disabled}
              onClick={() => onChange(itemValue)}
              className={`
                flex items-center justify-center transition-all
                aspect-square p-2 
                ${disabled ? "opacity-70" : "hover:border-rave-red hover:border-2"}
                ${isActive
                  ? "bg-rave-white border-rave-white border "
                  : "border-rave-white/10 border-2 bg-rave-black"
                }
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
    </div >
  );
}

export default Selector;
