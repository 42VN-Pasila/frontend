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
          tracking-[0.7vw] text-[#F0E8E5] mt-[15vh]"
          
      >
        Welcome to
      </p>
      <h5
        className="
          block sm:hidden 
          text-center 
          font-chakraBold 
          font-[700] text-[48px] 
          leading-[0.9] 
          tracking-[0.7vw] 
          text-[#F0E8E5] 
          mb-0
          text-transparent"
          style={{ WebkitTextStroke: "1px white" }}
      >
        Cosmos Pong!
      </h5>
      <p
        className="
          hidden sm:block
          text-[48px]
          sm:text-[24px]
          md:text-[60px]
          lg:text-[90px]
          leading-[0.9]
          tracking-[0.5vw]
          md:tracking-[0.3vw]
          font-[700]
          text-[#F0E8E5]
          text-center
          font-chakraBold
          mt-[10vh]
      "
      >
        Welcome to Pong!
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
        text-[#DDD6D4]
        mx-auto
        max-w-[80%]
      "
    >
      Launch into the cosmic arena and prove your ping pong power among the
      stars.
    </h2>
  );
};
