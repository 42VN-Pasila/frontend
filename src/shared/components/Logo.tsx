import React from "react";
import logoSrc from "../../assets/jokercard.png";
import { Link } from "react-router-dom";

type LogoSize = "small" | "medium" | "large";

const LOGO_IMG: Record<LogoSize, string> = {
  small: "h-10", // 40px
  medium: "h-16", // 64px
  large: "h-24", // 96px
};

const LOGO_TEXT: Record<LogoSize, string> = {
  small: "text-4xl",
  medium: "text-5xl ",
  large: "text-6xl",
};

interface LogoProps {
  size?: LogoSize;
  withText?: boolean;
}
const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ size = "medium", withText = false }, ref) => {
    return (
      <div ref={ref}>
        <Link to="/" className="inline-flex items-center">
          <img src={logoSrc} alt="Logo" className={`${LOGO_IMG[size]}`} />

          {withText && (
            <span
              className={`${LOGO_TEXT[size]} font-['Permanent_Marker'] tracking-wide font-bold`}
              style={{ WebkitTextStroke: "1px white" }}
            >
              JokerFace
            </span>
          )}
        </Link>
      </div>
    );
  }
);

export default Logo;
