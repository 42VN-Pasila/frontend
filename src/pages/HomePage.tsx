// import { Link } from "react-router-dom";
// import { Form } from "@/shared/components/Form";
import { MainNavBar } from "../components/Auth/NavBar";

const HomePage = () => {
  return (
    <main className="w-full  text-[#CCC8C7]">
      <MainNavBar />
      <p className="text-[5vw] leading-[0.9] tracking-[0.9vw] font-[700] text-[#F0E8E5] text-center font-chakraBold mt-[15vh]">
        Welcome to Pong!
      </p>
      <h2 className="text-center tracking-[0.2vw] mt-8 mx-4 text-lg md:text-lg lg:text-lg text-[#DDD6D4] font-medium  mx-auto">
        Launch into the cosmic arena and prove your ping pong power among the
        stars.
      </h2>
    </main>
  );
};

export default HomePage;
