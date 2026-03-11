import { useState } from "react";
import { Button } from "@/shared/components";
import { useGameSessionStore } from "@/shared/stores/useGameSessionStore";
import { useUserStore } from "@/shared/stores/useUserStore";

export const DevUserModal = () => {

    const { setUsername, setImageUrl, setUserId, userId, username } = useUserStore();
    const { resetGameSession, turnOrder, setTurnOrder } = useGameSessionStore();


    const [userNameInput, setUserNameInput] = useState(username);
    const [userIdInput, setUserIdInput] = useState(userId);

    const handleApply = () => {
        setUsername(userNameInput.trim());
        setUserId(userIdInput.trim());
        setTurnOrder([userIdInput.trim(), ...turnOrder.slice(1)]);
    };

    const handleReset = () => {
        setUsername("");
        setImageUrl("");
        resetGameSession();
        setUserId("");
        setUserNameInput("");
        setUserIdInput("");
    };

    return (
        <section className="w-full  rounded-lg border border-rave-white/20 bg-rave-black p-4 text-rave-white">
            <h2 className="text-lg font-bold tracking-widest">DEV USER MODAL</h2>
            <p className="mt-1 text-xs text-rave-white/60">
                Set IDs directly into state manager stores for local testing.
            </p>

            <div className="mt-4 space-y-3">
                <label className="block">
                    <span className="mb-1 block text-xs tracking-wide text-rave-white/75">
                        userName (useUserStore.username)
                    </span>
                    <input
                        value={userNameInput}
                        onChange={(e) => setUserNameInput(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="h-10 w-full border border-rave-white/20 bg-rave-white/5 px-3 text-sm text-rave-white outline-none focus:border-rave-red"
                    />
                </label>
                <label className="block">
                    <span className="mb-1 block text-xs tracking-wide text-rave-white/75">
                        userId (useUserStore.userId)
                    </span>
                    <input
                        value={userIdInput}
                        onChange={(e) => setUserIdInput(e.target.value)}
                        placeholder="e.g. player-local"
                        className="h-10 w-full border border-rave-white/20 bg-rave-white/5 px-3 text-sm text-rave-white outline-none focus:border-rave-red"
                    />
                </label>
            </div>

            <div className="mt-4 flex items-center gap-2">
                <Button variant="primary" emphasis="high" size="small" onClick={handleApply}>
                    Apply
                </Button>
                <Button variant="inverse" emphasis="low" size="small" onClick={handleReset}>
                    Reset
                </Button>
            </div>
        </section>
    );
};

