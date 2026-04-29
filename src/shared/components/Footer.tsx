import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full fixed bottom-5 flex justify-between px-20 text-center">
      <span className="right-6 text-sm tracking-[0.1vw] select-none">
        © PickPoker. 2026
      </span>
      <span className="ml-3">
        <Link to="/terms" className="underline mr-3 pointer-events-auto">
          Terms of use
        </Link>
        <Link to="/privacy" className="underline pointer-events-auto">
          Privacy policy
        </Link>
      </span>
    </div>
  );
};

export default Footer;
