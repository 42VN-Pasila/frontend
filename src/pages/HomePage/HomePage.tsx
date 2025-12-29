// import { useState } from 'react';
import { useLocation } from "react-router-dom";
import Footer from "@/shared/components/Footer";
import HomePageNavBar from "./HomePageNavBar";
import { HeroText } from "./HeroText";
import { HeroSubTitle } from "./HeroText";
import HomePageButton from "./HomePageButton";
import Landing from "./Landing";
import About from "./About";

export enum HomePageBody {
  Landing,
  About,
  Contact,
}

const PATH_TO_BODY: Record<string, HomePageBody> = {
  "/": HomePageBody.Landing,
  "/about": HomePageBody.About,
  "/contact": HomePageBody.Contact,
};

const useHomePageBody = (): HomePageBody => {
  const { pathname } = useLocation();
  return PATH_TO_BODY[pathname] ?? HomePageBody.Landing;
};

// const AboutUs = () => {
//   return (
//     <>
//       <HeroText />
//       <HeroSubTitle />
//       <HomePageButton />
//     </>
//   );
// }

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
  const activeBody = useHomePageBody();
  console.log(activeBody);

  return (
    <main className="h-[100dvh] flex flex-col">
      <HomePageNavBar />

      {activeBody === HomePageBody.Landing && <Landing />}
      {activeBody === HomePageBody.About && <About />}
      {activeBody === HomePageBody.Contact && <Contact />}

      <Footer />
    </main>
  );
};

export default HomePage;

