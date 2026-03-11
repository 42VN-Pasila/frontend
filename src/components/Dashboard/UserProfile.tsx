import { useUserStore } from "@/shared/stores/useUserStore";

const getInitials = (username: string) =>
    username
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("");

export const UserProfile = ({
    className = "",
    ...props
}: React.ComponentPropsWithoutRef<"button">) => {
    const username = useUserStore((state) => state.username);
    const imageUrl = useUserStore((state) => state.imageUrl);
    const initials = getInitials(username);

    return (
        <button
            type="button"
            className={`group inline-flex items-center gap-3 rounded-lg border border-rave-white/20 bg-rave-white/5 px-2 py-2 transition-colors hover:border-rave-red/60 hover:bg-rave-red/10 ${className}`}
            {...props}
        >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-rave-white/20 bg-rave-white text-sm font-bold text-rave-white">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={username}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    initials
                )}
            </span>
            <span className="pr-2 text-sm tracking-wide text-rave-white/85 group-hover:text-rave-white">
                {username}
            </span>
        </button>
    );
};