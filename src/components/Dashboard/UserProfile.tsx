import { useNavigate } from "react-router-dom";

import Avatar from "@/shared/components/Avatar";
import type { UserDto } from "@/gen/director";

type UserProfileProps = React.ComponentPropsWithoutRef<"button"> & {
  user: UserDto;
};

const getInitials = (username: string) =>
  username
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export const UserProfile = ({
  user,
  className = "",
  ...props
}: UserProfileProps) => {
  const label = user.displayName.trim() || user.username.trim();
  const initials = getInitials(label);
  const navigate = useNavigate();

  const handleClick = (initials: string) => {
    if (!initials) return;
    navigate("/dashboard/settings");
  };

  return (
    <button
      type="button"
      className={`group inline-flex items-center gap-3 rounded-lg border border-rave-white/20 bg-rave-white/5 px-2 py-2 transition-colors hover:border-rave-red/60 hover:bg-rave-red/10 ${className}`}
      onClick={() => handleClick(initials)}
      {...props}
    >
      <Avatar
        src={user.avatarUrl}
        alt={label}
        fallbackText={initials}
        className="h-10 w-10"
      />
      <span className="pr-2 text-sm tracking-wide text-rave-white/85 group-hover:text-rave-white">
        {label}
      </span>
    </button>
  );
};
