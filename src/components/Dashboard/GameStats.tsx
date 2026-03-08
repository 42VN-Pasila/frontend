type StatItem = {
    label: string;
    value: string;
    hint: string;
    tone: "neutral" | "good" | "danger";
};

const MOCK_STATS: StatItem[] = [
    { label: "Games Played", value: "128", hint: "+12 this week", tone: "neutral" },
    { label: "Win Rate", value: "61%", hint: "+4% vs last week", tone: "good" },
    { label: "Current Streak", value: "W3", hint: "Keep the momentum", tone: "good" },
];

const TONE_CLASS: Record<StatItem["tone"], string> = {
    neutral: "text-rave-white/70",
    good: "text-emerald-300",
    danger: "text-rave-red/90",
};

export const GameStats = ({
    className = "",
    ...props
}: React.ComponentPropsWithoutRef<"section">) => {
    return (
        <section
            className={`rounded-lg border-2 border-rave-white/10 bg-rave-black p-6 text-rave-white ${className}`}
            {...props}
        >
            <header className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-widest">GAME STATS</h2>

            </header>

            <div className="grid grid-cols-3 gap-3">
                {MOCK_STATS.map((stat) => (
                    <article
                        key={stat.label}
                        className="rounded-lg border border-rave-white/10 bg-rave-white/5 px-4 py-3"
                    >
                        <p className="text-xs uppercase tracking-[0.16em] text-rave-white/60">
                            {stat.label}
                        </p>
                        <p className="mt-1 text-3xl font-black tracking-tight">{stat.value}</p>
                        <p className={`mt-1 text-xs tracking-wide ${TONE_CLASS[stat.tone]}`}>
                            {stat.hint}
                        </p>
                    </article>
                ))
                }
            </div >
        </section >
    );
};

export default GameStats;
