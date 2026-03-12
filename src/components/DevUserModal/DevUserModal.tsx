import { useState } from "react";
import { Button } from "@/shared/components";
import { useUserStore } from "@/shared/stores/useUserStore";
import { useListAvatarsQuery, useUpdateUserAvatarMutation } from "@/shared/api/directorApi";
import { useRoomStore } from "@/shared/stores/useRoomStore";

export const DevUserModal = () => {
    const { setUsername, setAvatarUrl, setUserId, userId, username, avatarUrl, resetUser } = useUserStore();
    const { resetRoom } = useRoomStore();

    const [userNameInput, setUserNameInput] = useState(username);
    const [userIdInput, setUserIdInput] = useState(userId);
    const [selectedAvatarUrl, setSelectedAvatarUrl] = useState(avatarUrl ?? "");

    const { data: avatars = [], isLoading: isLoadingAvatars } = useListAvatarsQuery();
    const [updateUserAvatar] = useUpdateUserAvatarMutation();
    const handleApply = () => {
        setUsername(userNameInput.trim());
        setUserId(userIdInput.trim());
        setAvatarUrl(selectedAvatarUrl);

        const selectedAvatar = avatars.find((avatar) => avatar.url === selectedAvatarUrl);
        if (selectedAvatar && userIdInput.trim()) {
            void updateUserAvatar({
                userId: userIdInput.trim(),
                avatarId: selectedAvatar.id,
            });
        }
    };

    const handleResetUser = () => {
        resetUser();
        setUserNameInput("");
        setUserIdInput("");
    };

    const handleResetRoom = () => {
        resetRoom();
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

            <div className="mt-4">
                <p className="mb-2 text-xs tracking-wide text-rave-white/75">
                    Avatar (click to select)
                </p>
                {isLoadingAvatars ? (
                    <div className="text-xs text-rave-white/60">Loading avatars...</div>
                ) : (
                    <div className="grid grid-cols-4 gap-2">
                        {avatars.map((avatar) => {
                            const selected = avatar.url === selectedAvatarUrl;
                            return (
                                <button
                                    key={avatar.id}
                                    type="button"
                                    onClick={() => setSelectedAvatarUrl(avatar.url)}
                                    className={`aspect-square overflow-hidden border-2 transition-colors ${selected ? "border-rave-red" : "border-rave-white/15 hover:border-rave-white/40"
                                        }`}
                                    title={avatar.id}
                                >
                                    <img src={avatar.url} alt="avatar" className="h-full w-full object-cover" />
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="mt-4 flex items-center gap-2">
                <Button variant="primary" emphasis="high" size="small" onClick={handleApply}>
                    Apply
                </Button>
                <Button variant="inverse" emphasis="low" size="small" onClick={handleResetUser}>
                    Reset User
                </Button>
                <Button variant="inverse" emphasis="low" size="small" onClick={handleResetRoom}>
                    Reset Room
                </Button>
            </div>
        </section>
    );
};

