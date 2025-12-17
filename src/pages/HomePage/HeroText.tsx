export const HeroText = () => {
  return (
    <div className="text-center mt-[10vh] sm:mt-[12vh] lg:mt-[15vh]">
      <p className="
        font-chakraBold font-bold
        text-4xl sm:text-5xl md:text-6xl lg:text-7xl
        tracking-wider sm:tracking-wide
        leading-tight
        mb-2 sm:mb-3
      ">
        Welcome to Blank!
      </p>
    </div>
  );
};

export const HeroSubTitle = () => {
  return (
    <h2 className="
      text-center
      tracking-normal sm:tracking-wide
      mt-4 sm:mt-6 md:mt-8
      text-sm sm:text-base md:text-lg lg:text-xl
      mx-auto
      max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%]
      leading-relaxed
    ">
      Launch into the cosmic arena and prove your ping pong power among the stars.
    </h2>
  );
};