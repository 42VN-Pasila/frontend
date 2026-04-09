import { Link } from "react-router-dom";

import { Button } from "@/shared/components";

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
        <Link to="/login">
          <Button variant="primary" size="medium">
            Play now!
          </Button>
        </Link>

        <Link to="/login">
          <Button variant="primary" emphasis="low" size="medium">
            Learn more!
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePageButton;
