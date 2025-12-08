import { Button } from "@/shared/components";
import { Link } from "react-router-dom";
import ResponsiveButtonWrapper from "@/shared/components/ResponsiveButtonWrapper";
const HomePageButton: React.FC = () => {
  return (
    <div
      className="
        flex flex-col
        sm:flex-row
        items-center
        justify-center
        gap-2 sm:gap-3 lg:gap-4
        w-fit                     
        mx-auto                 
        mt-12 mb-15
      "
    >
      <ResponsiveButtonWrapper>
        <Link to="/login" className="block">
          <Button
            className="w-full
              text-sm sm:text-base md:text-lg
              py-1.5 sm:py-3
              rounded-full"
          >
            Play now!
          </Button>
        </Link>
      </ResponsiveButtonWrapper>

      <ResponsiveButtonWrapper>
        <Link to="/login" className="block">
          <Button
            className="
              w-full
              text-sm sm:text-base md:text-lg
              py-1.5 sm:py-3
              rounded-full
              border border-[#FF5F24]
              bg-transparent
              !text-[#F0E8E5]
            "
          >
            Learn more!
          </Button>
        </Link>
      </ResponsiveButtonWrapper>

      <ResponsiveButtonWrapper>
        <Link to="/login" className="block">
          <Button
            className="
              inline-flex
              w-full
              text-sm sm:text-base md:text-lg
              py-1.5 sm:py-3
              rounded-full
              border border-[#FF5F24]
              bg-transparent
              !text-[#F0E8E5]
            "
          >
            Test Dashboard
          </Button>
        </Link>
      </ResponsiveButtonWrapper>
    </div>
  );
};

export default HomePageButton;
