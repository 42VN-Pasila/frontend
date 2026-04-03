import Footer from "@/shared/components/Footer";

import { HeroText } from "./HeroText";
import { HeroSubTitle } from "./HeroText";
import HomePageButton from "./HomePageButton";
import HomePageNavBar from "./HomePageNavBar";

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
