import { useState } from "react";

import {
  useListAvatarsQuery,
  useUpdateUserAvatarMutation,
} from "@/shared/api/directorApi";
import { Button } from "@/shared/components";
import Avatar from "@/shared/components/Avatar";
import { useUserStore } from "@/shared/stores/useUserStore";

export const AvatarSection = () => {
  const { setAvatarUrl, avatarUrl, username } = useUserStore();
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState(avatarUrl ?? "");
  const { data: avatars = [], isLoading: isLoadingAvatars } =
    useListAvatarsQuery();
  const { mutateAsync: updateUserAvatar } = useUpdateUserAvatarMutation();
  const handleUpdateAvatar = async () => {
    setAvatarUrl(selectedAvatarUrl);

    const selectedAvatar = avatars.find(
      (avatar) => avatar.url === selectedAvatarUrl,
    );
    if (selectedAvatar) {
      await updateUserAvatar({
        avatarId: selectedAvatar.id,
      });
    }
  };

  return (
    <section
      className={`rounded-lg border-2 border-rave-white/10 bg-rave-black p-6 text-rave-white flex flex-col space-y-4`}
    >
      {/* <header className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-widest">AVATAR</h2>
      </header> */}
      <div className="mb-4 items-center">
        <Avatar
          src={avatarUrl}
          shape="square"
          alt={username}
          fallbackText={
            "This will be the first letter of username if no avatar available"
          } // remove all after rudex
          wrapperClassName="aspect-square overflow-hidden bg-rave-black border-2 border-rave-white/20 h-full w-full object-cover"
        />
      </div>
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
              <div className="flex items-center gap-2">
                <button
                  key={avatar.id}
                  type="button"
                  onClick={() => setSelectedAvatarUrl(avatar.url)}
                  className={`aspect-square overflow-hidden border-2 transition-colors ${
                    selected
                      ? "border-rave-red"
                      : "border-rave-white/15 hover:border-rave-white/40"
                  }`}
                  title={avatar.id}
                >
                  <img
                    src={avatar.url}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                </button>
              </div>
            );
          })}
        </div>
      )}
      <Button
        variant="primary"
        emphasis="high"
        size="medium"
        onClick={handleUpdateAvatar}
        disabled={!selectedAvatarUrl}
      >
        Apply
      </Button>
    </section>
  );
};
