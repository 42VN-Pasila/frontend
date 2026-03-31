import { Button } from "@/shared/components";

import type { FriendItem } from "./useFriendList";

type FriendListViewProps = {
  activeTab: "friends" | "pending";
  onTabChange: (tab: "friends" | "pending") => void;
  friends: FriendItem[];
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  isRemovingFriend: boolean;
  removingFriendId: string | null;
  onRemoveFriend: (otherUserId: string) => Promise<void>;
  statusClasses: Record<FriendItem["status"], string>;
};

export const FriendListView = ({
  activeTab,
  onTabChange,
  friends,
  isFetching,
  isError,
  error,
  isRemovingFriend,
  removingFriendId,
  onRemoveFriend,
  statusClasses,
}: FriendListViewProps) => {
  return (
    <section className="rounded-lg border-2 border-rave-white/10 p-6 text-rave-white">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-widest">FRIENDS</h2>
        <span className="border border-rave-white/20 bg-rave-white/5 px-2 py-1 text-[10px] tracking-[0.18em]">
          {friends.length} TOTAL
        </span>
      </header>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <Button
          variant="inverse"
          emphasis={activeTab === "friends" ? "high" : "low"}
          size="small"
          className="h-9! px-3! text-xs"
          onClick={() => onTabChange("friends")}
        >
          Friends
        </Button>
        <Button
          variant="inverse"
          emphasis={activeTab === "pending" ? "high" : "low"}
          size="small"
          className="h-9! px-3! text-xs"
          onClick={() => onTabChange("pending")}
        >
          Pending
        </Button>
      </div>

      <div className="space-y-3">
        {isFetching ? (
          <p className="rounded-lg border border-rave-white/10 bg-rave-white/5 px-3 py-2 text-xs tracking-wide text-rave-white/70">
            Loading friends...
          </p>
        ) : isError ? (
          <p className="rounded-lg border border-rave-white/20 bg-rave-white/10 px-3 py-2 text-xs tracking-wide text-rave-white">
            Failed to load friends: {error?.message ?? "Unknown error"}
          </p>
        ) : friends.length === 0 ? (
          <p className="rounded-lg border border-rave-white/10 bg-rave-white/5 px-3 py-2 text-xs tracking-wide text-rave-white/70">
            No friends yet.
          </p>
        ) : (
          friends.map((friend) => {
            const normalizedUsername = friend.username?.trim() || friend.id;
            const displayName = friend.displayName?.trim() || normalizedUsername;

            return (
              <article
                key={friend.id}
                className="flex items-center justify-between rounded-lg border border-rave-white/15 bg-rave-white/5 px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={friend.imageUrl}
                    alt={displayName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold tracking-wide">
                      {displayName}
                    </p>
                    <p className="text-[10px] font-semibold tracking-wide text-rave-white/60">
                      @{normalizedUsername}
                    </p>
                    <span
                      className={`inline-flex border px-2 py-0.5 text-[10px] tracking-[0.15em] ${statusClasses[friend.status]}`}
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
                    disabled={isRemovingFriend}
                    onClick={() => {
                      void onRemoveFriend(friend.id);
                    }}
                  >
                    {isRemovingFriend && removingFriendId === friend.id
                      ? "Deleting..."
                      : "Delete"}
                  </Button>
                  <Button
                    variant="inverse"
                    emphasis="high"
                    size="small"
                    className="h-8! px-3! text-xs"
                  >
                    Invite
                  </Button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
};
