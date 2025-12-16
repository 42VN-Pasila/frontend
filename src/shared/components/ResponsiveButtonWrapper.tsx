import React from "react";

type ResponsiveButtonWrapperProps = {
  children: React.ReactNode;
};

const ResponsiveButtonWrapper = ({
  children,
}: ResponsiveButtonWrapperProps) => {
  return (
    <div
      className="
        w-[180px]                 
        mx-auto                 
        sm:w-[160px]            
        lg:w-[200px]
        rounded-full
      "
    >
      {children}
    </div>
  );
};
export default ResponsiveButtonWrapper;
