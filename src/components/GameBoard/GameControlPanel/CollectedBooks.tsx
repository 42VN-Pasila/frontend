import { Label } from "@/shared/components/Label";

export const CollectedBooks = () => {
    return (
        <div id="collected-books" className="h-fit p-4  border-b-2 border-rave-white/10 ">
            <Label className="text-5xl text-rave-red/80">
                SCORE <span className="text-6xl font-mono text-rave-white">{15}</span>
            </Label>
        </div>
    );
};