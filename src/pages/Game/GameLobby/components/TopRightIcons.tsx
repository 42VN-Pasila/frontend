import React from "react";

export default function TopRightIcons({
  onReset,
}: {
  onReset?: () => void;
}) {
  return (
    <div className="absolute right-6 top-6 flex items-center gap-3">
      <button className="h-12 w-12 rounded-full bg-white/10 border border-white/15 shadow-lg backdrop-blur grid place-items-center">
        👥
      </button>
      <button
        type="button"
        onClick={onReset}
        className="h-12 w-12 rounded-full bg-white/10 border border-white/15 shadow-lg backdrop-blur grid place-items-center"
        title="Reset mock"
      >
        ↺
      </button>
    </div>
  );
}
