import Logo from "@/shared/components/Logo";

const AuthNavBar = () => {
  return (
    <nav className="w-full">
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center py-4 px-4 sm:px-6">
        <Logo /> 
      </div>
    </nav>
  );
};

export default AuthNavBar;