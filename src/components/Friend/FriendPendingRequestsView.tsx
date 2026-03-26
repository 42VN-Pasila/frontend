import { Button } from "@/shared/components";

import type { PendingRequestItem } from "./useFriendPendingRequests";

type FriendPendingRequestsViewProps = {
  activeTab: "friends" | "pending";
  onTabChange: (tab: "friends" | "pending") => void;
  pendingRequestItems: PendingRequestItem[];
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  isRespondingRequest: boolean;
  pendingActionError: string;
  onRespondRequest: (
    rudexUserId: string,
    action: "Accepted" | "Canceled",
  ) => Promise<void>;
  onCancelRequest: (rudexUserId: string) => Promise<void>;
};

export const FriendPendingRequestsView = ({
  activeTab,
  onTabChange,
  pendingRequestItems,
  isFetching,
  isError,
  error,
  isRespondingRequest,
  pendingActionError,
  onRespondRequest,
  onCancelRequest,
}: FriendPendingRequestsViewProps) => {
  return (
    <section className="rounded-lg border-2 border-rave-white/10 p-6 text-rave-white">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-widest">PENDING REQUESTS</h2>
        <span className="border border-rave-white/20 bg-rave-white/5 px-2 py-1 text-[10px] tracking-[0.18em]">
          {pendingRequestItems.length} TOTAL
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
            Loading pending requests...
          </p>
        ) : isError ? (
          <p className="rounded-lg border border-rave-white/20 bg-rave-white/10 px-3 py-2 text-xs tracking-wide text-rave-white">
            Failed to load pending requests: {error?.message ?? "Unknown error"}
          </p>
        ) : pendingRequestItems.length === 0 ? (
          <p className="rounded-lg border border-rave-white/10 bg-rave-white/5 px-3 py-2 text-xs tracking-wide text-rave-white/70">
            No pending requests.
          </p>
        ) : (
          <>
            {pendingActionError ? (
              <p className="text-rave-red/90 text-sm mb-4">
                {pendingActionError}
              </p>
            ) : null}

            {pendingRequestItems.map((requestUser) => {
              const displayName = requestUser.rudexUserId || requestUser.id;
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
                      alt={displayName}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold tracking-wide">
                        {displayName}
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
                        onClick={() => onCancelRequest(requestUser.id)}
                      >
                        Cancel
                      </Button>
                    ) : requestUser.direction === "incoming" ? (
                      <>
                        <Button
                          variant="inverse"
                          emphasis="low"
                          size="small"
                          className="h-8! px-3! text-xs"
                          disabled={isRespondingRequest}
                          onClick={() =>
                            onRespondRequest(requestUser.id, "Canceled")
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
                            onRespondRequest(requestUser.id, "Accepted")
                          }
                        >
                          Accept
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="inverse"
                        emphasis="low"
                        size="small"
                        className="h-8! px-3! text-xs"
                        disabled={true}
                      >
                        Unknown
                      </Button>
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
