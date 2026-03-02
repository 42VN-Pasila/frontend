export default function SeatCard({
  user,
  backSrc,
}: {
  user: { id: number; username: string; avatarUrl: string } | null;
  backSrc: string;
}) {
  let flipped = false;
  if (user) flipped = true;

  let inner =
    "relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]";
  if (flipped) inner = inner + " [transform:rotateY(180deg)]";

  return (
    <div className="relative h-[245px] w-[180px] select-none">
      <div className={inner}>
        {/* BACK */}
        <div className=" inset-0 w-full h-full [backface-visibility:hidden]">
          <img
            src={backSrc}
            alt="Back card"
            className="h-full w-full"
            draggable={false}
          />
        </div>

        {/* FRONT */}
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="h-full w-full rounded-[18px] bg-black/55 backdrop-blur-md ring-1 ring-white/15 overflow-hidden">
            <div className="h-full w-full flex flex-col items-center justify-center gap-3 p-4">
              {user && (
                <>
                  <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className="h-16 w-16 rounded-full ring-2 ring-white/20 object-cover"
                    draggable={false}
                  />
                  <div className="text-white font-semibold tracking-wide">
                    {user.username}
                  </div>
                  <div className="text-white/60 text-xs">ID: {user.id}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
