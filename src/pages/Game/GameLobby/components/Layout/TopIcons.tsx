
export function TopRightIcons({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="absolute right-6 top-6 flex items-center gap-3">
      <button className="h-12 w-12 rounded-full bg-white/10 border border-white/15 shadow-lg backdrop-blur grid place-items-center">
        👥
      </button>
      <button
        type="button"
        onClick={onClose}
        className="h-12 w-12 rounded-full bg-white/10 border border-white/15 shadow-lg backdrop-blur grid place-items-center z-101"
        title="Close"
      >
        X
      </button>
    </div>
  );
}

export function TopLeftIcons({
  roomId,
  playerCount,
}: {
  roomId: string;
  playerCount: number;
}) {
  return (
    <div className="absolute left-6 top-6 rounded-2xl bg-black/35 px-4 py-3 text-white shadow-lg backdrop-blur border border-white/10">
      <div className="text-xs font-extrabold tracking-widest">ROOM: #{roomId}</div>
      <div className="mt-1 text-[11px] text-white/70">Players: {playerCount}/4</div>
    </div>
  );
}
