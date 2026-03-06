import { Label } from "@/shared/components/Label";

export const Timer = () => {
    return (
        <div id="timer" className="h-fit p-6 pb-4 border-2 border-rave-white/10 ">
            <Label className="text-6xl text-rave-red">
                TIMER
            </Label>
            <p className="text-7xl font-mono">00:00</p>
        </div>
    );
};