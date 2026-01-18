import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "@/shared/components/Footer";
import HomePageNavBar from "./HomePageNavBar";
import { HeroText } from "./HeroText";
import { HeroSubTitle } from "./HeroText";
import HomePageButton from "./HomePageButton";
import About from "./About";

export enum HomePageBody {
  HomePage,
  About,
  Contact,
}

const PATH_TO_BODY: Record<string, HomePageBody> = {
  "/": HomePageBody.HomePage,
  "/about": HomePageBody.About,
  "/contact": HomePageBody.Contact,
};

const useHomePageBody = (): HomePageBody => {
  const { pathname } = useLocation();
  return PATH_TO_BODY[pathname] ?? HomePageBody.HomePage;
};

const Contact = () => {
  return (
    <>
      <HeroText />
      <HeroSubTitle />
      <HomePageButton />
    </>
  );
}

const HomePage = () => {
  const bodyFromRoute = useHomePageBody();
  const [currentBody, setCurrentBody] = useState<HomePageBody>(bodyFromRoute);

  useEffect(() => {
    setCurrentBody(bodyFromRoute);
  }, [bodyFromRoute]);

  return (
    <main className="h-[100dvh] flex flex-col">

      {currentBody === HomePageBody.HomePage && (
        <>
          <HomePageNavBar />
          <HeroText />
          <HeroSubTitle />
          <HomePageButton />
          <Footer />
        </>
      )}
      {currentBody === HomePageBody.About && (<About />)}
      {currentBody === HomePageBody.Contact && <Contact />}
    </main>
  );
};

export default HomePage;

