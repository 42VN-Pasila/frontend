import Footer from "@/shared/components/Footer";
import HomePageNavBar from "./NavBar/HomePageNavBar";
import PongAnimation from "./HomePageBody/PongAnimation";
import { HeroText } from "./HomePageBody/HeroText";
import { HeroSubTitle } from "./HomePageBody/HeroText";
import HomePageButton from "./HomePageBody/HomePageButton";

const HomePage = () => {
  return (
    <main className="h-[100dvh] flex flex-col">
      <HomePageNavBar />
      <HeroText />
      <HeroSubTitle />
      <HomePageButton />
      <PongAnimation />
      <Footer />
    </main>
  );
};

export default HomePage;
