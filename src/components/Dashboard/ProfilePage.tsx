import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { SocialUserDto } from "@/gen/director";
import {
  useGetFriendListDataQuery,
  useGetFriendPendingDataQuery,
  useGetUserByUsernameQuery,
  useRemoveFriendshipMutation,
  useRespondFriendRequestMutation,
  useSendFriendRequestMutation,
} from "@/shared/api/directorApi";
import { Button } from "@/shared/components";
import Avatar from "@/shared/components/Avatar";
import NavBar from "@/shared/components/NavBar";
import { useUserStore } from "@/shared/stores/useUserStore";

type Relationship = SocialUserDto.relationship;
type Direction = SocialUserDto.direction;
type DisplayStatus = "ONLINE" | "IN_GAME" | "IN_ROOM" | "OFFLINE";

const STATUS_CLASSES: Record<DisplayStatus, string> = {
  ONLINE: "border-emerald-400/40 bg-emerald-400/15 text-emerald-300",
  IN_GAME: "border-rave-red/50 bg-rave-red/20 text-rave-white",
  IN_ROOM: "border-amber-300/40 bg-amber-300/15 text-amber-200",
  OFFLINE: "border-rave-white/20 bg-rave-white/10 text-rave-white/60",
};

const mapStatus = (status?: string): DisplayStatus => {
  const normalizedStatus = String(status ?? "").toUpperCase();

  if (normalizedStatus === "INMATCH" || normalizedStatus === "IN_MATCH") {
    return "IN_GAME";
  }

  if (normalizedStatus === "INROOM" || normalizedStatus === "IN_ROOM") {
    return "IN_ROOM";
  }

  if (normalizedStatus === "ONLINE") {
    return "ONLINE";
  }

  return "OFFLINE";
};

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();
  const viewerUsername = useUserStore((state) => state.username).trim();
  const targetUsername = (username ?? "").trim();

  const {
    data: userByUsername,
    isLoading: isLoadingUser,
    error: userError,
  } = useGetUserByUsernameQuery(targetUsername, {
    enabled: Boolean(targetUsername),
  });

  const { data: friends = [] } = useGetFriendListDataQuery(viewerUsername, {
    enabled: Boolean(viewerUsername),
  });
  const { data: pendingRequests = [] } = useGetFriendPendingDataQuery(
    viewerUsername,
    {
      enabled: Boolean(viewerUsername),
    },
  );

  const [relationship, setRelationship] = useState<Relationship>(
    SocialUserDto.relationship.NONE,
  );
  const [direction, setDirection] = useState<Direction>(
    SocialUserDto.direction.NONE,
  );

  useEffect(() => {
    const lowerTargetUsername = targetUsername.toLowerCase();
    const friend = friends.find(
      (candidate) =>
        candidate.username?.trim().toLowerCase() === lowerTargetUsername,
    );

    if (friend) {
      setRelationship(SocialUserDto.relationship.ACCEPTED);
      setDirection(SocialUserDto.direction.NONE);
      return;
    }

    const pendingRequest = pendingRequests.find(
      (candidate) =>
        candidate.username?.trim().toLowerCase() === lowerTargetUsername,
    );

    setRelationship(
      (pendingRequest?.relationship as Relationship) ??
        SocialUserDto.relationship.NONE,
    );
    setDirection(
      (pendingRequest?.direction as Direction) ?? SocialUserDto.direction.NONE,
    );
  }, [friends, pendingRequests, targetUsername]);

  const { mutateAsync: sendFriendRequest, isPending: isSendingFriendRequest } =
    useSendFriendRequestMutation(viewerUsername);
  const {
    mutateAsync: respondFriendRequest,
    isPending: isRespondingFriendRequest,
  } = useRespondFriendRequestMutation(viewerUsername);
  const { mutateAsync: removeFriendship, isPending: isRemovingFriendship } =
    useRemoveFriendshipMutation(viewerUsername);

  const isOwnProfile =
    Boolean(viewerUsername) &&
    targetUsername.toLowerCase() === viewerUsername.toLowerCase();
  const isIncoming =
    relationship === SocialUserDto.relationship.PENDING &&
    direction === SocialUserDto.direction.IN;
  const isOutgoing =
    relationship === SocialUserDto.relationship.PENDING &&
    direction === SocialUserDto.direction.OUT;
  const isMutating =
    isSendingFriendRequest || isRespondingFriendRequest || isRemovingFriendship;

  const profileUsername = userByUsername?.username?.trim() || targetUsername;
  const profileDisplayName = userByUsername?.username?.trim() || targetUsername;
  const profileAvatarUrl = userByUsername?.avatarUrl ?? undefined;
  const profileStatus = mapStatus(userByUsername?.status);

  const handleReturn = () => navigate("/dashboard");

  const handleAddFriend = async () => {
    if (!profileUsername || !viewerUsername) return;

    await sendFriendRequest({ otherUsername: profileUsername });
    setRelationship(SocialUserDto.relationship.PENDING);
    setDirection(SocialUserDto.direction.OUT);
  };

  const handleAccept = async () => {
    if (!profileUsername || !viewerUsername) return;

    await respondFriendRequest({
      otherUsername: profileUsername,
      action: "Accepted",
    });
    setRelationship(SocialUserDto.relationship.ACCEPTED);
    setDirection(SocialUserDto.direction.NONE);
  };

  const handleReject = async () => {
    if (!profileUsername || !viewerUsername) return;

    await respondFriendRequest({
      otherUsername: profileUsername,
      action: "Canceled",
    });
    setRelationship(SocialUserDto.relationship.NONE);
    setDirection(SocialUserDto.direction.NONE);
  };

  const handleCancel = async () => {
    if (!profileUsername || !viewerUsername) return;

    if (relationship === SocialUserDto.relationship.ACCEPTED) {
      await removeFriendship({ otherUsername: profileUsername });
      setRelationship(SocialUserDto.relationship.NONE);
      setDirection(SocialUserDto.direction.NONE);
      return;
    }

    await respondFriendRequest({
      otherUsername: profileUsername,
      action: "Canceled",
    });
    setRelationship(SocialUserDto.relationship.NONE);
    setDirection(SocialUserDto.direction.NONE);
  };

  const hasProfileData = Boolean(userByUsername);

  if (!targetUsername)
    return <p className="mt-10 text-center">User not found</p>;
  if (isLoadingUser && !hasProfileData) {
    return <p className="mt-10 text-center">Loading...</p>;
  }
  if (!hasProfileData) {
    return (
      <p className="mt-10 text-center">
        User not found
        {userError instanceof Error ? `: ${userError.message}` : ""}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-rave-black text-rave-white">
      <NavBar
        button={{
          onClick: handleReturn,
          children: "Back to Dashboard",
          className: "text-sm font-medium",
        }}
      />

      <div className="mx-auto w-full max-w-[72vw] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="grid gap-6 xl:grid-cols-12">
          <article className="xl:col-span-8 rounded-lg border-2 border-rave-white/10 bg-rave-black sm:p-8 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-44 w-44 shrink-0 items-center justify-center rounded-full border-2 border-rave-red/80 bg-rave-red/20 p-2">
              <Avatar
                src={profileAvatarUrl}
                shape="circle"
                alt={profileUsername}
                wrapperClassName="relative z-10 h-40 w-40 overflow-hidden rounded-full bg-rave-red object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col items-center gap-3 text-center sm:items-start sm:text-left">
              <h2 className="text-4xl font-black tracking-[0.12em] text-rave-white sm:text-5xl">
                {profileDisplayName}
              </h2>
              <p className="text-sm text-rave-white/40">@{profileUsername}</p>
              <span
                className={`inline-flex items-center border px-4 py-2 text-xs font-bold tracking-[0.2em] ${STATUS_CLASSES[profileStatus]}`}
              >
                <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-current" />
                {profileStatus.replace("_", " ")}
              </span>
            </div>
          </article>

          <aside className="xl:col-span-4 rounded-lg border-2 border-rave-white/10 bg-rave-black p-6 sm:p-8">
            <h3 className="mb-6 text-xs font-black tracking-widest text-rave-white/60 uppercase">
              Quick Actions
            </h3>

            <div className="space-y-3">
              {!isOwnProfile &&
                relationship === SocialUserDto.relationship.NONE && (
                  <Button
                    variant="primary"
                    onClick={() => {
                      void handleAddFriend();
                    }}
                    size="small"
                    className="w-full"
                    disabled={isMutating}
                  >
                    Add Friend
                  </Button>
                )}

              {isIncoming && (
                <>
                  <Button
                    onClick={() => {
                      void handleAccept();
                    }}
                    size="small"
                    className="w-full"
                    disabled={isMutating}
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => {
                      void handleReject();
                    }}
                    variant="inverse"
                    emphasis="low"
                    size="small"
                    className="w-full"
                    disabled={isMutating}
                  >
                    Reject
                  </Button>
                </>
              )}

              {isOutgoing && (
                <Button
                  onClick={() => {
                    void handleCancel();
                  }}
                  variant="inverse"
                  emphasis="low"
                  size="small"
                  className="w-full"
                  disabled={isMutating}
                >
                  Cancel
                </Button>
              )}

              {!isOwnProfile &&
                relationship === SocialUserDto.relationship.ACCEPTED && (
                  <>
                    <Button disabled size="small" className="w-full">
                      Friends
                    </Button>
                    <Button
                      onClick={() => {
                        void handleCancel();
                      }}
                      variant="inverse"
                      emphasis="low"
                      size="small"
                      className="w-full"
                      disabled={isMutating}
                    >
                      Remove Friend
                    </Button>
                  </>
                )}
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};
