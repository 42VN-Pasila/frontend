	import { Button } from "@/shared/components";
	import { Link } from "react-router-dom";

const HomePageButton: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10 mt-15 mb-20">
      <Link to="/login">
        <Button className="min-w-[200px] !text-lg">Play now!</Button>
      </Link>
      <Button className="min-w-[200px] border border-[#FF5F24] bg-transparent !text-[#F0E8E5] !text-lg">
        Learn more!
      </Button>
    </div>
  );
};
export default HomePageButton;
