import { useEffect, useRef, useState } from "react";

import type { SocialUserDto } from "@/gen/director";
import { Button } from "@/shared/components";

type FriendSearchAddViewProps = {
  searchText: string;
  normalizedInput: string;
  hasQuery: boolean;
  isFetching: boolean;
  isSendingRequest: boolean;
  searchedUsers: SocialUserDto[];
  searchTargetId: string[];
  requestError: string | null;
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
  requestError,
  onSearchTextChange,
  onSearch,
  onSendRequest,
}: FriendSearchAddViewProps) => {
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [displayError, setDisplayError] = useState("");
  useEffect(() => {
    if (requestError) setDisplayError(requestError);
  }, [requestError]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
        setDisplayError("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="rounded-lg border-2 border-rave-white/10 p-6 text-rave-white"
    >
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
        USERNAME
      </label>

      {displayError && (
        <p className="text-rave-red/90 text-sm mb-4">{displayError}</p>
      )}

      <div className="mb-4 flex gap-2">
        <div className="h-12 flex-1 relative">
          <span className="absolute left-3 top-1/2  -translate-y-1/2 text-lg text-rave-white/60">
            @
          </span>
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
            placeholder="username..."
            className="h-full w-full border border-rave-white/20 bg-rave-white/5 pl-7 pr-3 text-sm tracking-wide text-rave-white outline-none placeholder:text-rave-white/40 focus:border-rave-red"
          />
        </div>

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
          {isFetching ? "..." : "Search"}
        </Button>
      </div>

      <div>
        {hasQuery &&
          showResults &&
          !isFetching &&
          searchedUsers.length === 0 && (
            <p className="rounded-lg border border-rave-white/10 bg-rave-white/5 px-3 py-2 text-xs text-rave-white/70">
            No result.
            </p>
          )}

        {hasQuery &&
          showResults &&
          !isFetching &&
          searchedUsers.map((candidate) => {
            const normalizedUsername =
              candidate.username?.trim() || candidate.id;
            const candidateName =
              (candidate as { displayName?: string }).displayName?.trim() ||
              normalizedUsername;
            const relationship = String(
              candidate.relationship ?? "NONE",
            ).toUpperCase();
            const isOutgoing =
              candidate.direction === "Out" ||
              searchTargetId.includes(candidate.id);
            const isIncoming = candidate.direction === "In";
            const isFriend = relationship === "ACCEPTED";

            return (
              <article
                key={candidate.id}
                className="flex items-center justify-between rounded-lg border border-rave-white/15 bg-rave-white/5 px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={candidate.avatarUrl ?? undefined}
                    alt={candidateName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold tracking-wide">
                      {candidateName}
                    </p>
                    <p className="text-[10px] font-semibold tracking-wide text-rave-white/60">
                      @{normalizedUsername}
                    </p>
                    <p className="text-[10px] tracking-[0.14em] text-rave-white/60 uppercase">
                      {isIncoming ? "Pending your approval" : candidate.status}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  {isFriend ? (
                    <Button
                      variant="primary"
                      emphasis="high"
                      size="small"
                      disabled={true}
                    >
                      Friends
                    </Button>
                  ) : isOutgoing ? (
                    <Button
                      variant="inverse"
                      emphasis="low"
                      size="small"
                      disabled={true}
                    >
                      Request sent
                    </Button>
                  ) : isIncoming ? (
                    <Button
                      variant="inverse"
                      emphasis="low"
                      size="small"
                      disabled={true}
                    >
                      Pending request
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      emphasis="high"
                      size="small"
                      disabled={isSendingRequest}
                      onClick={() => onSendRequest(candidate.id)}
                    >
                      Add Friend
                    </Button>
                  )}
                </div>
              </article>
            );
          })}
      </div>
    </section>
  );
};
