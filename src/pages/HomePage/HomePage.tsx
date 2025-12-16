import Footer from "@/shared/components/Footer";
import HomePageNavBar from "./HomePageNavBar";
import { HeroText } from "./HeroText";
import { HeroSubTitle } from "./HeroText";
import HomePageButton from "./HomePageButton";

const HomePage = () => {
  return (
    <main className="h-[100dvh] flex flex-col">
      <HomePageNavBar />
      <HeroText />
      <HeroSubTitle />
      <HomePageButton />
      <Footer />
    </main>
  );
};

export default HomePage;
