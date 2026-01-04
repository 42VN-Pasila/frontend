import logoSrc from "../../assets/jokercard.png";
import { Link } from "react-router-dom";
import { isExpired } from "../utils/sessionVerify";

const Logo = () => {
  const accessToken = localStorage.getItem('accessToken');

  const redirectPath = ((accessToken && !isExpired(accessToken))? '/dashboard' : '/');
  return (
    <div>
      <Link to={redirectPath} className="inline-flex items-center gap-2">
        <img src={logoSrc} alt="Logo" className="h-23 xs:h-24 py-2" />

        <span
          className="
                hidden sm:inline
                text-4xl sm:text-5xl 
                font-chakraBold tracking-wide font-bold
              "
          style={{ WebkitTextStroke: "1px white" }}
        >
          Blank
        </span>
      </Link>
    </div>
  );
};

export default Logo;
