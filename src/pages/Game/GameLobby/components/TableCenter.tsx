import React from "react";
import { Button } from "@/shared/components";

export default function TableCenter({
  onStart,
  canStart,
}: {
  onStart?: () => void;
  canStart: boolean;
}) {
  return (
    <div
      className={[
        "w-[min(1200px,92vw)] h-[min(640px,72vh)]",
        "rounded-[999px]",
        "bg-[#8E3B46]",
        "shadow-[0_40px_120px_rgba(0,0,0,0.55)]",
        "border border-black/20",
        "relative",
      ].join(" ")}
    >
      <div className="absolute inset-0 rounded-[999px]">
        <div className="absolute inset-6 rounded-[999px] border-[10px] border-transparent ring-2 ring-[#E0777D]" />
        <div className="absolute inset-10 rounded-[999px] border border-[#E0777D] opacity-50" />
      </div>

      <div className="absolute inset-0 grid place-items-center">
        <Button
          className="bg-[var(--color-primary)]"
          onClick={onStart}
          disabled={!canStart}
        >
          Start
        </Button>
      </div>
    </div>
  );
}
