import { Button } from "@/shared/components";
import { Link } from "react-router-dom";
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
        <Link to="/dashboard">
          <Button variant="primary" glow="primary" size="medium">
            Test Dashboard!
          </Button>
        </Link>

        <Link to="/login">
          <Button variant="primary" glow="primary" size="medium">
            Play now!
          </Button>
        </Link>

        <Link to="/login">
          <Button variant="primary" emphasis="low" glow="primary" size="medium">
            Learn more!
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePageButton;
