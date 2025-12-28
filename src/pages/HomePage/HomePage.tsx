// import { useState } from 'react';
import { useLocation } from "react-router-dom";
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
    <>
      <HeroText />
      <HeroSubTitle />
      <HomePageButton />
    </>
  );
}

const AboutUs = () => {
  return (
    <>
      <HeroText />
      <HeroSubTitle />
      <HomePageButton />
    </>
  );
}

const ContactUs = () => {
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

  return (
    <main className="h-[100dvh] flex flex-col">
      <HomePageNavBar />

      {activeBody === HomePageBody.Landing && <Landing />}
      {activeBody === HomePageBody.AboutUs && <AboutUs />}
      {activeBody === HomePageBody.ContactUs && <ContactUs />}

      <Footer />
    </main>
  );
};

export default HomePage;

