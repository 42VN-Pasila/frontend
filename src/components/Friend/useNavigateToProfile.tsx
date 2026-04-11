import { useNavigate } from "react-router-dom";

export const useNavigateToProfile = () => {
  const navigate = useNavigate();

  return (username: string) => {
    const normalizedUsername = username.trim();
    if (!normalizedUsername) return;
    navigate(`/profile/${encodeURIComponent(normalizedUsername)}`);
  };
};
