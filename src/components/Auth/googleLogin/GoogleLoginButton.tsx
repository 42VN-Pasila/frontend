import { Button } from "@/shared/components";
import { GoogleIcon } from "./GoogleIcon";

export default function GoogleLoginButton() {
  const handleClick = () => {
    window.location.href = `${import.meta.env.VITE_RUDEX_URL}/auth/google`;
  };

  return (
    <Button
      type="button"
      size="medium"
      variant="primary"
      emphasis="low"
      fullWidth
      onClick={handleClick}
    >
      <GoogleIcon />
      <span className="ml-2">Continue with Google</span>
    </Button>
  );
}
