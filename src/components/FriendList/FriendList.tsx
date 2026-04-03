import { Button } from "@/shared/components";

type Friend = {
  id: string;
  username: string;
  imageUrl: string;
  status: "ONLINE" | "IN_GAME" | "OFFLINE";
};

const MOCK_FRIENDS: Friend[] = [
  {
    id: "f-001",
    username: "Tan",
    imageUrl:
      "https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e535d195197053fe1a71f4b_peep-98.png",
    status: "ONLINE",
  },
  {
    id: "f-002",
    username: "Triet",
    imageUrl:
      "https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e535d35550b761a3af880d9_peep-99.png",
    status: "IN_GAME",
  },
  {
    id: "f-003",
    username: "Huong",
    imageUrl:
      "https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e535cfb4600807d898fc75b_peep-97.png",
    status: "OFFLINE",
  },
];

const STATUS_CLASSES: Record<Friend["status"], string> = {
  ONLINE: "border-emerald-400/40 bg-emerald-400/15 text-emerald-300",
  IN_GAME: "border-rave-red/50 bg-rave-red/20 text-rave-white",
  OFFLINE: "border-rave-white/20 bg-rave-white/10 text-rave-white/60",
};

export const FriendList = () => {
  return (
    <section className="rounded-lg border-2 border-rave-white/10 p-6 text-rave-white">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-widest">FRIENDS</h2>
        <span className="border border-rave-white/20 bg-rave-white/5 px-2 py-1 text-[10px] tracking-[0.18em]">
          {MOCK_FRIENDS.length} TOTAL
        </span>
      </header>

      <div className="space-y-3">
        {MOCK_FRIENDS.map((friend) => (
          <article
            key={friend.id}
            className="flex items-center justify-between rounded-lg border border-rave-white/15 bg-rave-white/5 px-3 py-2"
          >
            <div className="flex items-center gap-3">
              <img
                src={friend.imageUrl}
                alt={friend.username}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold tracking-wide">
                  {friend.username}
                </p>
                <span
                  className={`inline-flex border px-2 py-[2px] text-[10px] tracking-[0.15em] ${STATUS_CLASSES[friend.status]}`}
                >
                  {friend.status.replace("_", " ")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="inverse"
                emphasis="low"
                size="small"
                className="h-8! px-3! text-xs"
              >
                Invite
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
