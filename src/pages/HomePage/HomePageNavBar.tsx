import Logo from "@/shared/components/Logo";
import { Link } from "react-router-dom";
import NavigationItemUnderline from "@/shared/components/NavigationItemUnderline";

const HomePageNavBar = () => {
  return (
    <nav className="mx-auto flex items-center justify-between py-4 px-6 ">
      <Logo withText size="medium" />

      <div className="flex items-center gap-6 text-[#CCC8C7] tracking-wide NavigationItemUnderline">
        <Link
          to="/contact"
          className="tracking-[0.1vw] hover:text-white transition "
        >
          <NavigationItemUnderline text="Contact"></NavigationItemUnderline>
        </Link>
        <Link
          to="/about-us"
          className="tracking-[0.1vw] hover:text-white transition"
        >
          <NavigationItemUnderline text="About Us"></NavigationItemUnderline>
        </Link>
      </div>
    </nav>
  );
};

export default HomePageNavBar;
