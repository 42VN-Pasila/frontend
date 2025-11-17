import Logo from "@/shared/components/Logo";
import { Link } from "react-router-dom";

export const MainNavBar = () => {
  return (
    <nav className="mx-auto flex items-center justify-between py-4 px-6 ">
      <Logo withText size="medium" />

      <div className="flex items-center gap-6 text-[#CCC8C7]">
        <Link to="/contact" className="hover:text-white transition">
          Contact
        </Link>
        <Link to="/privacy" className="hover:text-white transition">
          Privacy
        </Link>
        <Link to="/about-us" className="hover:text-white transition">
          About Us
        </Link>
      </div>
    </nav>
  );
};

export const AuthNavBar = () => {
  return (
    <nav className="w-full max-w-[1200px]">
      <Logo withText size="large" />
    </nav>
  );
};
