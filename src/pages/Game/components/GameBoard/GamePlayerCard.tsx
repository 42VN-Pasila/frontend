import { CARD_IMAGES } from "../../common/assets/cards";
import type { Card } from "../../common/types/cards";

const GamePlayerCard = ({ className }: { className?: string }) => {
    return (
        <section className={`${className} p-8 flex flex-col items-center bg-slate-900/30`}>
            <h3 className="text-slate-500 uppercase text-xs font-bold mb-6 self-start">Your Hand</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 w-full justify-center">
                {[1, 2, 3, 4, 5].map((c) => (
                    <div key={c} className="w-24 h-36 bg-white rounded-lg shadow-2xl transform hover:-translate-y-4 transition-transform cursor-pointer border-2 border-slate-300">
                        {c}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default GamePlayerCard;