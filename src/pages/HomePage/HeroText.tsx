export const HeroText = () => {
  return (
    <div>
      <p
        className="
          text-center 
          font-chakraBold 
          font-[700]
          block sm:hidden 
          text-[28px] leading-[0.9] 
          tracking-[0.7vw] mt-[15vh]"
      >
        Welcome to
      </p>
      <h5
        className="
          block sm:hidden 
          text-center 
          font-chakraBold 
          font-[700]
          leading-[0.9] 
          tracking-[0.7vw] 
          mb-0
          text-transparent"
        style={{ WebkitTextStroke: "1px white" }}
      >
        Blank!
      </h5>
      <p
        className="
          hidden sm:block
          text-[28px]
          sm:text-[24px]
          md:text-[60px]
          lg:text-[80px]
          leading-[0.9]
          tracking-[0.5vw]
          md:tracking-[0.3vw]
          font-[700]
          text-center
          font-chakraBold
          mt-[10vh]
      "
      >
        Welcome to Blank
      </p>
    </div>
  );
};

export const HeroSubTitle = () => {
  return (
    <h2
      className="
        text-center
        tracking-wide
        mt-6 md:mt-3
        text-sm
        sm:text-base
        md:text-sm
        lg:text-lg
        mx-auto
        max-w-[80%]
      "
    >
      Launch into the cosmic arena and prove your ping pong power among the
      stars.
    </h2>
  );
};
