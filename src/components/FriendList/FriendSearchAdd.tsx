import { useMemo, useState } from "react";
import { Button } from "@/shared/components";

type FriendCandidate = {
    id: string;
    username: string;
    imageUrl: string;
    mutualCount: number;
};

const MOCK_CANDIDATES: FriendCandidate[] = [
    {
        id: "u-001",
        username: "Trang",
        imageUrl: "https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e535d35550b761a3af880d9_peep-99.png",
        mutualCount: 4,
    },
    {
        id: "u-002",
        username: "Dat",
        imageUrl: "https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e535cfb4600807d898fc75b_peep-97.png",
        mutualCount: 1,
    },
    {
        id: "u-003",
        username: "Minh Anh",
        imageUrl: "https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e535d195197053fe1a71f4b_peep-98.png",
        mutualCount: 7,
    },
    {
        id: "u-004",
        username: "Khanh",
        imageUrl: "https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e535d35550b761a3af880d9_peep-99.png",
        mutualCount: 2,
    },
];

export const FriendSearchAdd = () => {
    const [searchText, setSearchText] = useState("");
    const [sentRequestIds, setSentRequestIds] = useState<string[]>([]);

    const normalizedSearch = searchText.trim().toLowerCase();

    const searchedUsers = useMemo(() => {
        if (!normalizedSearch) {
            return MOCK_CANDIDATES;
        }

        return MOCK_CANDIDATES.filter((candidate) =>
            candidate.username.toLowerCase().includes(normalizedSearch)
        );
    }, [normalizedSearch]);

    const handleSendRequest = (id: string) => {
        if (sentRequestIds.includes(id)) {
            return;
        }

        setSentRequestIds((previous) => [...previous, id]);
    };

    return (
        <section className="rounded-lg border-2 border-rave-white/10 p-6 text-rave-white">
            <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold tracking-[0.2em] text-rave-white/90">FIND FRIENDS</h3>
                <span className="text-[10px] tracking-[0.16em] text-rave-white/60">SEARCH & ADD</span>
            </div>

            <label className="mb-3 block text-xs tracking-[0.14em] text-rave-white/60" htmlFor="friend-search-input">
                USERNAME
            </label>
            <input
                id="friend-search-input"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search username..."
                className="mb-4 h-11 w-full border border-rave-white/20 bg-rave-white/5 px-3 text-sm tracking-wide text-rave-white outline-none placeholder:text-rave-white/40 focus:border-rave-red"
            />

            <div className="space-y-2">
                {searchedUsers.length === 0 ? (
                    <p className="rounded-lg border border-rave-white/10 bg-rave-white/5 px-3 py-2 text-xs tracking-wide text-rave-white/70">
                        No user found.
                    </p>
                ) : (
                    searchedUsers.map((candidate) => {
                        const requested = sentRequestIds.includes(candidate.id);

                        return (
                            <article
                                key={candidate.id}
                                className="flex items-center justify-between rounded-lg border border-rave-white/15 bg-rave-white/5 px-3 py-2"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={candidate.imageUrl}
                                        alt={candidate.username}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-sm font-semibold tracking-wide">{candidate.username}</p>
                                        <p className="text-[10px] tracking-[0.14em] text-rave-white/60">
                                            {candidate.mutualCount} MUTUAL FRIEND{candidate.mutualCount > 1 ? "S" : ""}
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    variant="primary"
                                    emphasis={requested ? "low" : "high"}
                                    size="small"
                                    className="h-8! min-w-23! px-3! text-xs"
                                    disabled={requested}
                                    onClick={() => handleSendRequest(candidate.id)}
                                >
                                    {requested ? "Requested" : "Add Friend"}
                                </Button>
                            </article>
                        );
                    })
                )}
            </div>
        </section>
    );
};
