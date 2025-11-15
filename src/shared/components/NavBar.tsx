import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const NAV_ITEMS: Array<{ label: string; to: string }> = [
  { label: "Home", to: "/" },
  { label: "Play", to: "/play" },
  { label: "Leaderboard", to: "/leaderboard" },
  { label: "About", to: "/about" },
];

const baseLinkClasses =
  "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150";
const activeClasses = "text-white bg-[#FF5F24]";
const inactiveClasses = "text-[#CCC8C7] hover:text-white hover:bg-[#FF5F24]/20";

export const NavBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/60 border-b border-[#FF5F24]/30">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-lg font-bold tracking-tight text-[#FF5F24] flex items-center"
            >
              Cosmic Pong
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${baseLinkClasses} ${
                    isActive ? activeClasses : inactiveClasses
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-[#CCC8C7] hover:text-white hover:bg-[#FF5F24]/30 focus:outline-none focus:ring-2 focus:ring-[#FF5F24]"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-[#FF5F24]/30 bg-black/80 backdrop-blur-md">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${baseLinkClasses} block ${
                    isActive ? activeClasses : inactiveClasses
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
