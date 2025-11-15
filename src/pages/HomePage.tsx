import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="w-full max-w-[1200px] mx-auto py-16 px-6 text-[#CCC8C7]">
      <Link to="/login">Log in</Link>
	  <Link to="/register">Register</Link>
    </main>
  );
};

export default HomePage;
