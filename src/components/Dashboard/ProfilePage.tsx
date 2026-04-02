import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

// later get these after media is merged
// import {
//   useSearchUsersQuery,
//   useSendFriendRequestMutation,
//   useRespondFriendRequestMutation,
// } from "@/shared/api/directorApi";
import { Button, Form } from "@/shared/components";
import Avatar from "@/shared/components/Avatar";
import { useUserStore } from "@/shared/stores/useUserStore";

type Relationship = "None" | "Pending" | "Accepted";
type Direction = "In" | "Out";

type MockUser = {
  id: string;
  username: string;
  displayname: string;
  avatarUrl?: string;
  status: "ONLINE" | "OFFLINE" | "IN_GAME";
  relationship: Relationship;
  direction?: Direction;
};

const MOCK_USERS: MockUser[] = [
  {
    id: "f-001",
    username: "tan",
    displayname: "Tan",
    avatarUrl:
      "https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e535d195197053fe1a71f4b_peep-98.png",
    status: "ONLINE",
    relationship: "None",
  },
  {
    id: "f-002",
    username: "triet",
    displayname: "Triet",
    avatarUrl:
      "https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e535d35550b761a3af880d9_peep-99.png",
    status: "IN_GAME",
    relationship: "Pending",
    direction: "Out",
  },
  {
    id: "f-003",
    username: "huong",
    displayname: "Huong",
    avatarUrl:
      "https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e535cfb4600807d898fc75b_peep-97.png",
    status: "OFFLINE",
    relationship: "Pending",
    direction: "In",
  },
  {
    id: "f-004",
    username: "kha",
    displayname: "Kha",
    avatarUrl:
      "https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e535cfb4600807d898fc75b_peep-97.png",
    status: "OFFLINE",
    relationship: "Accepted",
  },
];

const STATUS_CLASSES: Record<MockUser["status"], string> = {
  ONLINE: "border-emerald-400/40 bg-emerald-400/15 text-emerald-300",
  IN_GAME: "border-rave-red/50 bg-rave-red/20 text-rave-white",
  OFFLINE: "border-rave-white/20 bg-rave-white/10 text-rave-white/60",
};

const useMockUser = (userId?: string) => {
  const [data, setData] = useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      const user = MOCK_USERS.find((u) => u.id === userId) || null;
      setData(user);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, [userId]);

  return { data, isLoading };
};

export const ProfilePage = () => {
  const { userId } = useParams();

  const { data: user, isLoading } = useMockUser(userId);

  const [relationship, setRelationship] = useState<Relationship>("None");

  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    if (user) setRelationship(user.relationship);
  }, [user]);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">User not found</p>;

  const isIncoming = relationship === "Pending" && user.direction === "In";

  const isOutgoing = relationship === "Pending" && user.direction === "Out";

  const handleAddFriend = () => setRelationship("Accepted"); // set to accepted for demo, change to pending when integrated with backend

  const handleAccept = () => setRelationship("Accepted");

  const handleReject = () => setRelationship("None");

  const handleCancel = () => setRelationship("None");

  return (
    <div className="min-h-screen bg-rave-black text-rave-white">
      <div className="mx-auto w-full max-w-[90vw] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-6 flex flex-col gap-4  sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-widest">
              USER PROFILE
            </h1>
            <p className="mt-1 mb-4 text-rave-white/60">
              Profile overview & quick actions
            </p>
            <Button
              variant="inverse"
              emphasis="low"
              size="small"
              onClick={handleReturn}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-12">
          <div className="grid grid-cols-1 gap-4 xl:col-span-8">
            <section className="rounded-lg border-2 border-rave-white/10 bg-rave-black p-6 text-rave-white flex flex-col">
              <div className="mb-4 px-8 py-2 items-center">
                <Avatar
                  src={user.avatarUrl}
                  shape="circle"
                  alt={user.username}
                  fallbackText={
                    "This will be the first letter of username if no avatar available"
                  } // remove all after rudex
                  wrapperClassName="aspect-square overflow-hidden bg-rave-black border-2 border-rave-white/20 h-40 w-40 object-cover"
                />
              </div>
              <div className="flex flex-col px-8 py-2">
                <header className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold tracking-widest">
                    {user.displayname ? user.displayname : user.username}
                  </h2>
                </header>
                <p className="mt-1 mb-4 text-rave-white/60">@{user.username}</p>
              </div>
              <div className="mb-4 px-8 py-2 flex flex-wrap gap-2">
                {relationship === "None" && (
                  <Button
                    variant="primary"
                    onClick={handleAddFriend}
                    size="small"
                    className="col-span-2"
                  >
                    Add Friend
                  </Button>
                )}

                {isIncoming && (
                  <div className="col-span-2 flex gap-2">
                    <Button onClick={handleAccept} size="small">
                      Accept
                    </Button>
                    <Button
                      onClick={handleReject}
                      variant="inverse"
                      emphasis="low"
                      size="small"
                    >
                      Reject
                    </Button>
                  </div>
                )}

                {isOutgoing && (
                  <Button
                    onClick={handleCancel}
                    variant="inverse"
                    emphasis="low"
                    size="small"
                    className="col-span-2"
                  >
                    Cancel Request
                  </Button>
                )}

                {relationship === "Accepted" && (
                  <div className="col-span-2 flex gap-2">
                    <Button disabled size="small" className="col-span-2">
                      Friends
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="inverse"
                      emphasis="low"
                      size="small"
                      className="col-span-2"
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
              <div className="px-8 py-2">
                <p className="text-sm text-rave-white/70 tracking-wide">
                  Current status:
                </p>
                <span
                  className={`inline-flex border px-2 py-0.5 text-[10px] tracking-[0.15em] ${STATUS_CLASSES[user.status]}`}
                >
                  {user.status.replace("_", " ")}
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
