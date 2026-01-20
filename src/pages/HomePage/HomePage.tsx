import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "@/shared/components/Footer";
import HomePageNavBar from "./HomePageNavBar";
import { HeroText } from "./HeroText";
import { HeroSubTitle } from "./HeroText";
import HomePageButton from "./HomePageButton";
import AboutPage from "./AboutPage";

export enum Pages {
  HomePage,
  AboutPage,
}

const PATH_TO_PAGE: Record<string, Pages> = {
  "/": Pages.HomePage,
  "/about": Pages.AboutPage,
};

const usePage = (): Pages => {
  const { pathname } = useLocation();
  return PATH_TO_PAGE[pathname] ?? Pages.HomePage;
};

const HomePage = () => {
  const pageFromRoute = usePage();
  const [currentPage, setCurrentPage] = useState<Pages>(pageFromRoute);

  useEffect(() => {
    setCurrentPage(pageFromRoute);
  }, [pageFromRoute]);

  return (
    <main className="h-[100dvh] flex flex-col">

      {currentPage === Pages.HomePage && (
        <>
          <HomePageNavBar />
          <HeroText />
          <HeroSubTitle />
          <HomePageButton />
          <Footer />
        </>
      )}
      {currentPage === Pages.AboutPage && (<AboutPage />)}
    </main>
  );
};

export default HomePage;

