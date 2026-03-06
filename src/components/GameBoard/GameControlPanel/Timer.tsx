import { Label } from "@/shared/components/Label";

export const Timer = () => {
    return (
        <div id="timer" className="h-fit p-4 border-b-2 border-rave-white/10 ">
            <Label className="text-5xl text-rave-red/80">
                TIMER
            </Label>
            <p className="text-6xl font-mono">00:00</p>
        </div>
    );
};