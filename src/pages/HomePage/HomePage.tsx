import { Link } from "react-router-dom";
// import { Form } from "@/shared/components/Form";
import Footer from "@/shared/components/Footer";
import HomePageNavBar from "./HomePageNavBar";
import { Button } from "@/shared/components";
import  PongAnimation  from "./PongAnimation";


const HomePage = () => {
  return (
    <main className="w-full  text-[#CCC8C7]">
      <HomePageNavBar />

      <p className="text-[5vw] leading-[0.9] tracking-[0.9vw] font-[700] text-[#F0E8E5] text-center font-chakraBold mt-[12vh]">
        Welcome to Pong!
      </p>

      <h2 className="text-center tracking-[0.1vw] mt-8 text-lg md:text-lg lg:text-xl text-[#DDD6D4] mx-auto">
        Launch into the cosmic arena and prove your ping pong power among the
        stars.
      </h2>

      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10 mt-16 mb-20">
        <Link to="/login">
          <Button className="min-w-[180px] ">Play now!</Button>
        </Link>
        <Button className="min-w-[180px] border border-[#FF5F24] bg-transparent !text-[#F0E8E5]">
          Learn more!
        </Button>
      </div>
      <PongAnimation />
      <Footer />
    </main>
  );
};

export default HomePage;
