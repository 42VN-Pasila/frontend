import { useState } from "react";

import {
  useListFriendRequestsQuery,
  useListFriendsQuery,
  useRespondFriendRequestMutation,
} from "@/shared/api/directorApi";
import { Button } from "@/shared/components";
import { useUserStore } from "@/shared/stores/useUserStore";

type Friend = {
  id: string;
  rudexUserId: string;
  imageUrl: string;
  status: "ONLINE" | "IN_GAME" | "IN_ROOM" | "OFFLINE";
};

type PendingDirection = "incoming" | "outgoing" | "unknown";

type PendingUser = {
  id: string;
  avatarUrl?: string | null;
  relationship?: string;
  requestFriendStatus?: string;
  rudexUserId?: string;
  userId?: string;
  otherUserId?: string;
};

const resolvePendingDirection = (
  pendingUser: PendingUser,
  currentUserId: string,
): PendingDirection => {
  if (pendingUser.userId && pendingUser.userId === currentUserId) {
    return "outgoing";
  }

  if (pendingUser.otherUserId && pendingUser.otherUserId === currentUserId) {
    return "incoming";
  }

  return "unknown";
};

const STATUS_CLASSES: Record<Friend["status"], string> = {
  ONLINE: "border-emerald-400/40 bg-emerald-400/15 text-emerald-300",
  IN_GAME: "border-rave-red/50 bg-rave-red/20 text-rave-white",
  IN_ROOM: "border-amber-300/40 bg-amber-300/15 text-amber-200",
  OFFLINE: "border-rave-white/20 bg-rave-white/10 text-rave-white/60",
};

export const FriendList = () => {
  const [activeTab, setActiveTab] = useState<"friends" | "pending">("friends");
  const [pendingActionError, setPendingActionError] = useState("");
  const { userId } = useUserStore();
  const {
    data: socialFriends = [],
    isFetching,
    isError: isFriendsError,
    error: friendsError,
  } = useListFriendsQuery(userId, {
    enabled: Boolean(userId),
  });
  const {
    data: socialRequests = [],
    isFetching: isFetchingRequests,
    isError: isRequestsError,
    error: requestsError,
  } = useListFriendRequestsQuery(userId, {
    enabled: Boolean(userId),
  });
  const { mutateAsync: respondFriendRequest, isPending: isRespondingRequest } =
    useRespondFriendRequestMutation();

  const friends: Friend[] = socialFriends.map((friend) => {
    const friendRudexUserId =
      (friend as { rudexUserId?: string }).rudexUserId ?? friend.id;
    const normalizedStatus = friend.status.toUpperCase();
    const mappedStatus: Friend["status"] =
      normalizedStatus === "INMATCH"
        ? "IN_GAME"
        : normalizedStatus === "INROOM"
          ? "IN_ROOM"
          : normalizedStatus === "ONLINE"
            ? "ONLINE"
            : "OFFLINE";

    return {
      id: friend.id,
      rudexUserId: friendRudexUserId,
      imageUrl: friend.avatarUrl ?? "",
      status: mappedStatus,
    };
  });

  const filteredPendingRequests = socialRequests.filter((item) => {
    const normalizedRequestState = String(
      (item as { relationship?: string; requestFriendStatus?: string })
        .relationship ??
        (item as { relationship?: string; requestFriendStatus?: string })
          .requestFriendStatus ??
        "",
    ).toUpperCase();

    return normalizedRequestState.includes("PENDING");
  });

  const pendingRequests =
    filteredPendingRequests.length > 0
      ? filteredPendingRequests
      : socialRequests;

  const pendingRequestItems = pendingRequests.map((item) => {
    const pendingUser = item as PendingUser;

    return {
      ...item,
      displayName: pendingUser.rudexUserId ?? item.id,
      direction: resolvePendingDirection(pendingUser, userId),
    };
  });

  const handleRespondPendingRequest = async (
    otherUserId: string,
    action: "Accepted" | "Canceled",
  ) => {
    if (!userId) return;

    setPendingActionError("");

    try {
      await respondFriendRequest({
        userId, // current user
        otherUserId, // target user
        action,
        invalidateUserIds: [userId],
      });
    } catch {
      setPendingActionError("Cannot process incoming request.");
    }
  };

  const handleCancelPendingRequest = async (otherUserId: string) => {
    if (!userId) {
      return;
    }

    setPendingActionError("");

    try {
      await respondFriendRequest({
        userId: otherUserId,
        otherUserId: userId,
        action: "Canceled",
        invalidateUserIds: [userId],
      });
    } catch {
      setPendingActionError(
        "Cannot cancel outgoing request. Backend may not support cancel yet.",
      );
    }
  };

  return (
    <section className="rounded-lg border-2 border-rave-white/10 p-6 text-rave-white">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-widest">FRIENDS</h2>
        <span className="border border-rave-white/20 bg-rave-white/5 px-2 py-1 text-[10px] tracking-[0.18em]">
          {activeTab === "friends" ? friends.length : pendingRequests.length}{" "}
          TOTAL
        </span>
      </header>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <Button
          variant="inverse"
          emphasis={activeTab === "friends" ? "high" : "low"}
          size="small"
          className="h-9! px-3! text-xs"
          onClick={() => setActiveTab("friends")}
        >
          Friends
        </Button>
        <Button
          variant="inverse"
          emphasis={activeTab === "pending" ? "high" : "low"}
          size="small"
          className="h-9! px-3! text-xs"
          onClick={() => setActiveTab("pending")}
        >
          Pending
        </Button>
      </div>

      <div className="space-y-3">
        {activeTab === "friends" && isFetching ? (
          <p className="rounded-lg border border-rave-white/10 bg-rave-white/5 px-3 py-2 text-xs tracking-wide text-rave-white/70">
            Loading friends...
          </p>
        ) : activeTab === "friends" && isFriendsError ? (
          <p className="rounded-lg border border-rave-white/20 bg-rave-white/10 px-3 py-2 text-xs tracking-wide text-rave-white">
            Failed to load friends: {friendsError?.message ?? "Unknown error"}
          </p>
        ) : activeTab === "friends" && friends.length === 0 ? (
          <p className="rounded-lg border border-rave-white/10 bg-rave-white/5 px-3 py-2 text-xs tracking-wide text-rave-white/70">
            No friends yet.
          </p>
        ) : activeTab === "friends" ? (
          friends.map((friend) => (
            <article
              key={friend.id}
              className="flex items-center justify-between rounded-lg border border-rave-white/15 bg-rave-white/5 px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <img
                  src={friend.imageUrl}
                  alt={friend.rudexUserId}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold tracking-wide">
                    {friend.rudexUserId}
                  </p>
                  <p className="text-[10px] font-semibold tracking-wide">
                    {friend.id}
                  </p>
                  <span
                    className={`inline-flex border px-2 py-0.5 text-[10px] tracking-[0.15em] ${STATUS_CLASSES[friend.status]}`}
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
          ))
        ) : isFetchingRequests ? (
          <p className="rounded-lg border border-rave-white/10 bg-rave-white/5 px-3 py-2 text-xs tracking-wide text-rave-white/70">
            Loading pending requests...
          </p>
        ) : isRequestsError ? (
          <p className="rounded-lg border border-rave-white/20 bg-rave-white/10 px-3 py-2 text-xs tracking-wide text-rave-white">
            Failed to load pending requests:{" "}
            {requestsError?.message ?? "Unknown error"}
          </p>
        ) : pendingRequestItems.length === 0 ? (
          <p className="rounded-lg border border-rave-white/10 bg-rave-white/5 px-3 py-2 text-xs tracking-wide text-rave-white/70">
            No pending requests.
          </p>
        ) : (
          <>
            {pendingActionError ? (
              <p className="rounded-lg border border-rave-white/20 bg-rave-white/10 px-3 py-2 text-xs tracking-wide text-rave-white">
                {pendingActionError}
              </p>
            ) : null}

            {pendingRequestItems.map((requestUser) => {
              const actionLabel =
                requestUser.direction === "outgoing"
                  ? "OUTGOING REQUEST"
                  : requestUser.direction === "incoming"
                    ? "INCOMING REQUEST"
                    : "PENDING REQUEST";

              return (
                <article
                  key={requestUser.id}
                  className="flex items-center justify-between rounded-lg border border-rave-white/15 bg-rave-white/5 px-3 py-2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={requestUser.avatarUrl ?? ""}
                      alt={requestUser.displayName}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold tracking-wide">
                        {requestUser.displayName}
                      </p>
                      <p className="text-[10px] tracking-[0.14em] text-rave-white/60">
                        {actionLabel}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {requestUser.direction === "outgoing" ? (
                      <Button
                        variant="inverse"
                        emphasis="low"
                        size="small"
                        className="h-8! px-3! text-xs"
                        disabled={isRespondingRequest}
                        onClick={() =>
                          handleCancelPendingRequest(requestUser.id)
                        }
                      >
                        Cancel
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="inverse"
                          emphasis="low"
                          size="small"
                          className="h-8! px-3! text-xs"
                          disabled={isRespondingRequest}
                          onClick={() =>
                            handleRespondPendingRequest(
                              requestUser.id,
                              "Canceled",
                            )
                          }
                        >
                          Reject
                        </Button>
                        <Button
                          variant="primary"
                          emphasis="high"
                          size="small"
                          className="h-8! px-3! text-xs"
                          disabled={isRespondingRequest}
                          onClick={() =>
                            handleRespondPendingRequest(
                              requestUser.id,
                              "Accepted",
                            )
                          }
                        >
                          Accept
                        </Button>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </>
        )}
      </div>
    </section>
  );
};
