// import { Link } from "react-router-dom";
// import { Form } from "@/shared/components/Form";
import { MainNavBar } from "../components/Auth/NavBar";

const HomePage = () => {
  return (
    <main className="w-full  text-[#CCC8C7]">
      <MainNavBar />
      <h1
        className="
	text-[25vw]           /* ~10% chiều rộng màn hình, rất to trên 27'' */
    leading-[0.6]         /* line-height gọn */
    tracking-[0.5vw]      /* letter-spacing rộng kiểu game */
    font-[700]
    text-[#F0E8E5]
    text-center
    font-chakraBold
    " 
	>
        Welcome to Pong!
      </h1>
    </main>
  );
};

export default HomePage;
