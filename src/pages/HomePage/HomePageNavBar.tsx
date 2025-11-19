import Logo from "@/shared/components/Logo";
import { Link } from "react-router-dom";

const HomePageNavBar = () => {
  return (
    <nav className="mx-auto flex items-center justify-between py-4 px-6 ">
      <Logo withText size="medium" />

      <div className="flex items-center gap-6 text-[#CCC8C7] tracking-wide">
        <Link
          to="/contact"
          className="tracking-[0.1vw] hover:text-white transition "
        >
          Contact
        </Link>
        <Link
          to="/privacy"
          className="tracking-[0.1vw] hover:text-white transition"
        >
          Privacy
        </Link>
        <Link
          to="/about-us"
          className="tracking-[0.1vw] hover:text-white transition"
        >
          About Us
        </Link>
      </div>
    </nav>
  );
};

export default HomePageNavBar;
