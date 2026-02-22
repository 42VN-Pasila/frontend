import React from "react";

export default function OpenSeat({
  label,
  className,
  onClick,
}: {
  label: string;
  className: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={["group absolute flex flex-col items-center gap-2 select-none", className].join(" ")}
    >
      <div className="h-16 w-16 rounded-2xl bg-white/10 border border-white/20 shadow-lg backdrop-blur grid place-items-center transition group-hover:scale-[1.03] group-active:scale-[0.99]">
        <span className="text-3xl leading-none text-white/90">+</span>
      </div>

      <div className="rounded-full bg-black/35 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/80">
        {label}
      </div>
    </button>
  );
}
