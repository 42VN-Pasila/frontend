import React from "react";

type ResonsiveButtonWrapperProps = {
  children: React.ReactNode;
};

const ResonsiveButtonWrapper = ({ children }: ResonsiveButtonWrapperProps) => {
  return (
    <div
      className="
        w-[160px]                 
        mx-auto                 
        sm:w-[160px]            
        lg:w-[200px]
        rounded-full
        gap-0
      "
    >
      {children}
    </div>
  );
};
export default ResonsiveButtonWrapper;
