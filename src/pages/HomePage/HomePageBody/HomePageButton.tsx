import { Button } from "@/shared/components";
import { Link } from "react-router-dom";
import ResponsiveButtonWrapper from "@/shared/components/ResponsiveButtonWrapper";
const HomePageButton: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
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
              variant="landing"
              className="w-full
              text-4xl sm:text-lg md:text-xl
              py-1.5 sm:py-3"
            >
              Play now!
            </Button>
          </Link>
        </ResponsiveButtonWrapper>

        <ResponsiveButtonWrapper>
          <Link to="/login" className="block">
            <Button
              variant="landing"
              emphasis="low"
              className="
              w-full
              text-4xl sm:text-lg md:text-xl
              py-1.5 sm:py-3
            "
            >
              Learn more!
            </Button>
          </Link>
        </ResponsiveButtonWrapper>

        <ResponsiveButtonWrapper>
          <Link to="/dashboard" className="block">
            <Button
              variant="landing"
              emphasis="low"
              className="
              inline-flex
              w-full
              text-4xl sm:text-lg md:text-xl
              py-1.5 sm:py-3
            "
            >
              Test Dashboard
            </Button>
          </Link>
        </ResponsiveButtonWrapper>
      </div>
    </div>
  );
};

export default HomePageButton;
