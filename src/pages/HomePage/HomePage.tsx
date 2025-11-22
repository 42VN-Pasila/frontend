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
      <section
        className="
          flex flex-col
          items-center
          justify-center
          text-center
          px-1
        "
      >
        <HeroText />
        <HeroSubTitle />
        <div className="mt-1">
          <HomePageButton />
        </div>
        <Footer />
      </section>
      <PongAnimation />
    </main>
  );
};

export default HomePage;
