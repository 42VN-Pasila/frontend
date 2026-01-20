import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "@/shared/components/Footer";
import HomePageNavBar from "./HomePageNavBar";
import { HeroText } from "./HeroText";
import { HeroSubTitle } from "./HeroText";
import HomePageButton from "./HomePageButton";
import About from "./About";

export enum HomePages { // endpoint changes -> do not call it body, call it page :)
  HomePage,
  About,
  Contact,
}

const PATH_TO_BODY: Record<string, HomePages> = {
  "/": HomePages.HomePage,
  "/about": HomePages.About,
  "/contact": HomePages.Contact,
};

const useHomePageBody = (): HomePages => {
  const { pathname } = useLocation();
  return PATH_TO_BODY[pathname] ?? HomePages.HomePage;
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
  const [currentBody, setCurrentBody] = useState<HomePages>(bodyFromRoute);

  useEffect(() => {
    setCurrentBody(bodyFromRoute);
  }, [bodyFromRoute]);

  return (
    <main className="h-[100dvh] flex flex-col">

      {currentBody === HomePages.HomePage && (
        <>
          <HomePageNavBar />
          <HeroText />
          <HeroSubTitle />
          <HomePageButton />
          <Footer />
        </>
      )}
      {currentBody === HomePages.About && (<About />)}
      {currentBody === HomePages.Contact && <Contact />}
    </main>
  );
};

export default HomePage;

