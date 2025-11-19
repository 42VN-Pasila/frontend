import React from "react";

const PongAnimation: React.FC = () => {
  return (
    <div className="relative mx-auto w-[600px] h-[300px] rounded-[5px] border-b-[5px] border-t-[5px] border-[#FF5F24] border-opacity-50">
      <div className="absolute top-0 left-0 w-[7px] h-[90px] bg-[#ccac54] rounded-full animate-left-wall" />

      <div className="absolute top-0 right-0 w-[7px] h-[90px] bg-[#61AE24] rounded-full  animate-right-wall" />

      <div
        className="
          absolute
          top-[40px]
          left-1/2
          -translate-x-1/2
          h-[220px]
          w-[3px]
          bg-[#F0E8E5]
          opacity-50
          rounded-full
        "
      />
      <div className="absolute top-[30px] left-0 w-[20px] h-[20px] bg-[#F0E8E5] opacity-80 rounded-full animate-bounce-ball" />
    </div>
  );
};

export default PongAnimation;
