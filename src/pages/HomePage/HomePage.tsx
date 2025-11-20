import Footer from "@/shared/components/Footer";
import HomePageNavBar from "./NavBar/HomePageNavBar";
import  PongAnimation  from "./HomePageBody/PongAnimation";
import {HeroText} from "./HomePageBody/HeroText";
import {HeroSubTitle} from "./HomePageBody/HeroText";
import NavBarRightItems from "./HomePageBody/HomePageButton";

const HomePage = () => {
  return (
    <main className="w-full">
      <HomePageNavBar />
      <HeroText />
      <HeroSubTitle />
	  <NavBarRightItems />
      <PongAnimation />
      <Footer />
    </main>
  );
};

export default HomePage;
