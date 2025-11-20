import React from "react";

type NavigationItemUnderlineProps = {
  text: React.ReactNode;
};

const NavigationItemUnderline = ({ text }: NavigationItemUnderlineProps) => {
  return (
    <div
      className="
        relative inline-block
        after:content-['']
        after:bg-[#FF5F24]
        after:absolute
        after:h-0.5
        after:w-0
        after:bottom-0
        after:left-0
		after:rounded-md
        hover:after:w-full
        after:transition-all
        after:duration-300
      "
    >
      {text}
    </div>
  );
};

export default NavigationItemUnderline;
