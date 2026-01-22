import Logo from "@/shared/components/Logo";
import NavigationItemUnderline from "@/components/Auth/NavigationItemUnderline";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const HomePageNavBar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <nav className="relative w-full">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between py-1 px-6 md:px-40">
        <div className="lg:hidden">
          <Logo />
        </div>

        <div className="hidden lg:block">
          <Logo />
        </div>

        <div className="hidden lg:flex items-center gap-6 tracking-wide">
          <Link
            to="/contact"
            className="tracking-[0.1vw] hover:text-white transition"
          >
            <NavigationItemUnderline text="Contact" />
          </Link>

          <Link
            to="/about-us"
            className="tracking-[0.1vw] hover:text-white transition"
          >
            <NavigationItemUnderline text="About Us" />
          </Link>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? (
            <CloseIcon sx={{ fontSize: 26 }} />
          ) : (
            <MenuIcon sx={{ fontSize: 26 }} />
          )}
        </button>

        <div
          ref={dropdownRef}
          className={`
          absolute right-6 top-[100%] -mt-7 w-40 md:hidden
          bg-[var(--color-black)]/95 border border-white/10 rounded-xl
          shadow-lg shadow-black/40
          overflow-hidden
          transition-all duration-200 origin-top-right
          ${
            open
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          }
        `}
        >
          <div className="flex flex-col py-2 text-sm text-white">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="px-4 py-2 hover:bg-white/5 transition flex items-center"
            >
              Contact
            </Link>

            <Link
              to="/about-us"
              onClick={() => setOpen(false)}
              className="px-4 py-2 hover:bg-white/5 transition flex items-center"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomePageNavBar;