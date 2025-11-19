import React from "react";

const PongAnimation: React.FC = () => {
  return (
    <div className="relative mx-auto w-[600px] h-[300px] border-b-[30px] border-[#D0D102]">
      {/* Left wall */}
      <div className="absolute left-0 w-[30px] h-[100px] bg-[#61AE24] animate-left-wall" />

      {/* Right wall */}
      <div className="absolute right-0 w-[30px] h-[100px] bg-[#61AE24] animate-right-wall" />

      {/* Ball */}
      <div className="absolute w-[50px] h-[50px] bg-[#F18D05] rounded-full animate-bounce-ball" />
    </div>
  );
};

export default PongAnimation;