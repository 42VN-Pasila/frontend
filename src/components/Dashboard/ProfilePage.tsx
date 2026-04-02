import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

// later get these after media is merged
// import {
//   useSearchUsersQuery,
//   useSendFriendRequestMutation,
//   useRespondFriendRequestMutation,
// } from "@/shared/api/directorApi";
import { Button } from "@/shared/components";
import Avatar from "@/shared/components/Avatar";
import NavBar from "@/shared/components/NavBar";

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
      const foundUser = MOCK_USERS.find((u) => u.id === userId) || null;
      setData(foundUser);
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

  useEffect(() => {
    if (user) setRelationship(user.relationship);
  }, [user]);

  if (isLoading) return <p className="mt-10 text-center">Loading...</p>;
  if (!user) return <p className="mt-10 text-center">User not found</p>;

  const isIncoming = relationship === "Pending" && user.direction === "In";
  const isOutgoing = relationship === "Pending" && user.direction === "Out";

  const handleReturn = () => navigate("/dashboard");
  const handleAddFriend = () => setRelationship("Accepted");
  const handleAccept = () => setRelationship("Accepted");
  const handleReject = () => setRelationship("None");
  const handleCancel = () => setRelationship("None");

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
                src={user.avatarUrl}
                shape="circle"
                alt={user.username}
                fallbackText="This will be the first letter of username if no avatar available"
                wrapperClassName="relative z-10 h-40 w-40 overflow-hidden rounded-full bg-rave-red object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col items-center gap-3 text-center sm:items-start sm:text-left">
              <h2 className="text-4xl font-black tracking-[0.12em] text-rave-white sm:text-5xl">
                {user.displayname || user.username}
              </h2>
              <p className="text-sm text-rave-white/40">@{user.username}</p>
              <span
                className={`inline-flex items-center border px-4 py-2 text-xs font-bold tracking-[0.2em] ${STATUS_CLASSES[user.status]}`}
              >
                <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-current" />
                {user.status.replace("_", " ")}
              </span>
            </div>
          </article>

          <aside className="xl:col-span-4 rounded-lg border-2 border-rave-white/10 bg-rave-black p-6 sm:p-8">
            <h3 className="mb-6 text-xs font-black tracking-widest text-rave-white/60 uppercase">
              Quick Actions
            </h3>

            <div className="space-y-3">
              {relationship === "None" && (
                <Button
                  variant="primary"
                  onClick={handleAddFriend}
                  size="small"
                  className="w-full"
                >
                  Add Friend
                </Button>
              )}

              {isIncoming && (
                <>
                  <Button
                    onClick={handleAccept}
                    size="small"
                    className="w-full"
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant="inverse"
                    emphasis="low"
                    size="small"
                    className="w-full"
                  >
                    Reject
                  </Button>
                </>
              )}

              {isOutgoing && (
                <Button
                  onClick={handleCancel}
                  variant="inverse"
                  emphasis="low"
                  size="small"
                  className="w-full"
                >
                  Cancel
                </Button>
              )}

              {relationship === "Accepted" && (
                <>
                  <Button disabled size="small" className="w-full">
                    Friends
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="inverse"
                    emphasis="low"
                    size="small"
                    className="w-full"
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
