import Footer from "@/shared/components/Footer";
import HomePageNavBar from "./HomePageNavBar";
import { HeroText } from "./HeroText";
import { HeroSubTitle } from "./HeroText";
import HomePageButton from "./HomePageButton";
import React from "react";

export enum HomePageBody {
  Homepage,
  AboutUs,
  Contact,
}

const HomePage = () => {
  const [currentBody, setCurrentBody] = React.useState<HomePageBody>(
    HomePageBody.Homepage,
  );
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
