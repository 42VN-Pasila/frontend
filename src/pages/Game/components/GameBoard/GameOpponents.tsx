const GameOpponents = ({ className }: { className?: string }) => {
    return (
        <section className={`${className} flex items-center justify-around bg-slate-800/50 p-4 border-b border-slate-800`}>
            {[1, 2, 3].map((num) => (
                <div key={num} className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center text-white text-xl shadow-inner">
                        P{num + 1}
                    </div>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-tighter">Opponent {num}</span>
                </div>
            ))}
        </section>
    )
}

export default GameOpponents;