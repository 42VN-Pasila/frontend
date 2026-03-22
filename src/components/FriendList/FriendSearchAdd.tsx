import { useState } from "react";

import {
  useSearchUsersQuery,
  useSendFriendRequestMutation,
} from "@/shared/api/directorApi";
import { Button } from "@/shared/components";
import { useUserStore } from "@/shared/stores/useUserStore";

export const FriendSearchAdd = () => {
  const searchMode = "rudexUserId" as const;
  const [searchText, setSearchText] = useState("");
  const [sentRequestIds, setSentRequestIds] = useState<string[]>([]);
  const { userId } = useUserStore();
  const normalizedSearch =
    searchMode === "rudexUserId"
      ? searchText.trim()
      : searchText.trim().toLowerCase();

  const { data: searchedUsers = [], isFetching } = useSearchUsersQuery(
    userId,
    normalizedSearch,
    { enabled: Boolean(userId && normalizedSearch) },
  );

  const { mutateAsync: sendFriendRequest, isPending: isSendingRequest } =
    useSendFriendRequestMutation();

  const hasQuery = Boolean(normalizedSearch);

  const handleSendRequest = async (otherUserId: string) => {
    if (sentRequestIds.includes(otherUserId) || !userId) return;
    await sendFriendRequest({ userId, otherUserId });
    setSentRequestIds((prev) => [...prev, otherUserId]);
  };

  return (
    <section className="rounded-lg border-2 border-rave-white/10 p-6 text-rave-white">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold tracking-[0.2em] text-rave-white/90">
          FIND FRIENDS
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
      <input
        id="friend-search-input"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder="Search by rudexUserId..."
        className="mb-4 h-11 w-full border border-rave-white/20 bg-rave-white/5 px-3 text-sm tracking-wide text-rave-white outline-none placeholder:text-rave-white/40 focus:border-rave-red"
      />

      <div>
        {hasQuery && isFetching ? (
          <p className="rounded-lg border border-rave-white/10 bg-rave-white/5 px-3 py-2 text-xs tracking-wide text-rave-white/70">
            Searching...
          </p>
        ) : hasQuery && searchedUsers.length === 0 ? (
          <p className="rounded-lg border border-rave-white/10 bg-rave-white/5 px-3 py-2 text-xs tracking-wide text-rave-white/70">
            No user found.
          </p>
        ) : hasQuery ? (
          searchedUsers.map((candidate) => {
            const candidateRudexUserId =
              (candidate as { rudexUserId?: string }).rudexUserId ??
              candidate.id;
            const requested = sentRequestIds.includes(candidate.id);
            const normalizedRelationship = String(
              candidate.relationship ?? "NONE",
            ).toUpperCase();
            const isAlreadyRelated =
              normalizedRelationship === "PENDING" ||
              normalizedRelationship === "ACCEPTED";
            const isActionDisabled =
              requested || isSendingRequest || isAlreadyRelated;

            const buttonLabel = requested
              ? "Requested"
              : normalizedRelationship === "PENDING"
                ? "Requested"
                : normalizedRelationship === "ACCEPTED"
                  ? "Friend"
                  : "Add Friend";

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

                <Button
                  variant="primary"
                  emphasis={requested ? "low" : "high"}
                  size="small"
                  className="h-8! min-w-23! px-3! text-xs"
                  disabled={isActionDisabled}
                  onClick={() => handleSendRequest(candidate.id)}
                >
                  {buttonLabel}
                </Button>
              </article>
            );
          })
        ) : null}
      </div>
    </section>
  );
};
