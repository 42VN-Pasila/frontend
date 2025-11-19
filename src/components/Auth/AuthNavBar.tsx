import Logo from "@/shared/components/Logo";

const AuthNavBar = () => {
  return (
    <nav className="w-full max-w-[1200px] flex items-center justify-center">
      <Logo withText size="medium" />
    </nav>
  );
};

export default AuthNavBar;