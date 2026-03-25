import { useEffect, useRef, useState } from "react";

import type { SocialUserDto } from "@/gen/director";
import { useRespondFriendRequestMutation } from "@/shared/api/directorApi";
import { Button } from "@/shared/components";

type FriendSearchAddViewProps = {
  searchText: string;
  normalizedInput: string;
  hasQuery: boolean;
  isFetching: boolean;
  isSendingRequest: boolean;
  searchedUsers: SocialUserDto[];
  searchTargetId: string[];
  currentUserId: string;
  onSearchTextChange: (value: string) => void;
  onSearch: () => void;
  onSendRequest: (otherUserId: string) => Promise<void>;
};

export const FriendSearchAddView = ({
  searchText,
  normalizedInput,
  hasQuery,
  isFetching,
  isSendingRequest,
  searchedUsers,
  searchTargetId,
  currentUserId,
  onSearchTextChange,
  onSearch,
  onSendRequest,
}: FriendSearchAddViewProps) => {
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pendingActionError, setPendingActionError] = useState("");

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (!containerRef.current) return;

    if (!containerRef.current.contains(event.target as Node)) {
      setShowResults(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
  const { mutateAsync: respondFriendRequest, isPending: isRespondingRequest } =
    useRespondFriendRequestMutation();
  const handleRespondPendingRequest = async (
    otherUserId: string,
    action: "Accepted" | "Canceled",
  ) => {
    if (!currentUserId) return;

    setPendingActionError("");

    try {
      await respondFriendRequest({
        userId: currentUserId,
        otherUserId,
        action,
        invalidateUserIds: [currentUserId],
      });
    } catch (error) {
      if (error instanceof Error) {
        setPendingActionError(error.message);
      } else {
        setPendingActionError("Cannot process incoming request.");
      }
    }
  };

  const handleCancelPendingRequest = async (otherUserId: string) => {
    if (!currentUserId) {
      return;
    }

    setPendingActionError("");

    try {
      await respondFriendRequest({
        userId: otherUserId,
        otherUserId: currentUserId,
        action: "Canceled",
        invalidateUserIds: [currentUserId],
      });
    } catch (error) {
      if (error instanceof Error) {
        setPendingActionError(error.message);
      } else {
        setPendingActionError(
          "Cannot cancel outgoing request. Backend may not support cancel yet.",
        );
      }
    }
  };

  return (
    <section className="rounded-lg border-2 border-rave-white/10 p-6 text-rave-white">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold tracking-[0.2em] text-rave-white/90">
          FIND USER
        </h3>
        <span className="text-[10px] tracking-[0.16em] text-rave-white/60">
          SEARCH & ADD
        </span>
      </div>

      <label
        className="mb-3 block text-xs tracking-[0.14em] text-rave-white/60"
        htmlFor="friend-search-input"
      >
        RUDEX USER ID
      </label>

      {pendingActionError ? (
        <p className="text-rave-red/90 text-sm mb-4">{pendingActionError}</p>
      ) : null}

      <div className="mb-4 flex gap-2">
        <input
          id="friend-search-input"
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onSearch();
              setShowResults(true);
            }
          }}
          placeholder="Search exact rudexUserId..."
          className="h-12 flex-1 border border-rave-white/20 bg-rave-white/5 px-3 text-sm tracking-wide text-rave-white outline-none placeholder:text-rave-white/40 focus:border-rave-red"
        />

        <Button
          variant="primary"
          emphasis="high"
          size="small"
          className="h-11 px-5 text-xs"
          disabled={!normalizedInput || isFetching}
          onClick={() => {
            onSearch();
            setShowResults(true);
          }}
        >
          Search
        </Button>
      </div>

      <div ref={containerRef}>
        {hasQuery && showResults && isFetching ? (
          <p className="rounded-lg border border-rave-white/10 bg-rave-white/5 px-3 py-2 text-xs tracking-wide text-rave-white/70">
            Searching...
          </p>
        ) : hasQuery && showResults && searchedUsers.length === 0 ? (
          <p className="rounded-lg border border-rave-white/10 bg-rave-white/5 px-3 py-2 text-xs tracking-wide text-rave-white/70">
            No user found.
          </p>
        ) : hasQuery && showResults ? (
          searchedUsers.map((candidate) => {
            const candidateRudexUserId = candidate.rudexUserId ?? candidate.id;
            const requested = searchTargetId.includes(candidate.id);
            const normalizedRelationship = String(
              candidate.relationship ?? "NONE",
            ).toUpperCase();

            const isPending = normalizedRelationship === "PENDING";

            const isBackendOutgoing =
              isPending && candidate.userId === currentUserId;
            const isBackendIncoming =
              isPending && candidate.userId !== currentUserId;

            const isOutgoing = isBackendOutgoing || requested;

            const isIncoming = isBackendIncoming;

            let buttonLabel = "Add friend";
            let isActionDisabled = isSendingRequest || isRespondingRequest;

            if (normalizedRelationship === "ACCEPTED") {
              buttonLabel = "Friend";
              isActionDisabled = true;
            } else if (isOutgoing) {
              buttonLabel = "Requested";
              isActionDisabled = true;
            }

            return (
              <article
                key={candidate.id}
                className="flex items-center justify-between rounded-lg border border-rave-white/15 bg-rave-white/5 px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={candidate.avatarUrl ?? undefined}
                    alt={candidateRudexUserId}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold tracking-wide">
                      {candidateRudexUserId}
                    </p>
                    <p className="text-[10px] tracking-[0.14em] text-rave-white/60">
                      {candidate.status} • {normalizedRelationship}
                    </p>
                  </div>
                </div>

                {isIncoming ? (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="inverse"
                      size="small"
                      emphasis="low"
                      onClick={() =>
                        handleRespondPendingRequest(candidate.id, "Canceled")
                      }
                    >
                      Reject
                    </Button>
                    <Button
                      variant="primary"
                      size="small"
                      onClick={() =>
                        handleRespondPendingRequest(candidate.id, "Accepted")
                      }
                    >
                      Accept
                    </Button>
                  </div>
                ) : isOutgoing ? (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="inverse"
                      size="small"
                      emphasis="low"
                      disabled
                    >
                      Requested
                    </Button>
                    <Button
                      variant="inverse"
                      size="small"
                      emphasis="low"
                      disabled={isRespondingRequest}
                      onClick={() => handleCancelPendingRequest(candidate.id)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    emphasis="high"
                    size="small"
                    disabled={isActionDisabled}
                    onClick={() => {
                      void onSendRequest(candidate.id);
                    }}
                  >
                    {buttonLabel}
                  </Button>
                )}
              </article>
            );
          })
        ) : null}
      </div>
    </section>
  );
};
