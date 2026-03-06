import { useEffect, useState } from "react";

import { Label } from "@/shared/components/Label";

export const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((t) => Math.max(t - 1, 0));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div
      id="timer"
      className={`h-fit p-4 border-b-2 border-rave-white/10 ${timeLeft <= 7 ? " bg-rave-red/30 border-rave-red animate-pulse" : ""}`}
    >
      <Label className="text-5xl text-rave-red/80 ">TIMER</Label>
      <p className="text-6xl font-mono">
        {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
        {String(timeLeft % 60).padStart(2, "0")}
      </p>
    </div>
  );
};
