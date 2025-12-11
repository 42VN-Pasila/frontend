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
          <Link to="/dashboard" className="block">
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
      <div className="flex justify-center gap-5">
        <Button type="button" variant="game" size="small">
          Register
        </Button>
        <Button type="button" variant="game" size="medium">
          Flip
        </Button>
        <Button type="button" variant="game" size="large">
          Play Now
        </Button>
      </div>

      <div className="flex justify-center gap-5">
        <Button type="button" variant="web" size="small">
          Register
        </Button>
        <Button type="button" variant="web" size="medium">
          Flip
        </Button>
        <Button type="button" variant="web" size="large">
          Play Now
        </Button>
      </div>

      <div className="flex justify-center gap-5">
        <Button type="button" variant="web" emphasis="low" size="small">
          Register
        </Button>
        <Button type="button" variant="web" emphasis="low" size="medium">
          Flip
        </Button>
        <Button type="button" variant="web" emphasis="low" size="large">
          Play Now
        </Button>
      </div>
    </div>
  );
};

export default HomePageButton;
