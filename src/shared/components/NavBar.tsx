import Button from "@/shared/components/Button";
import Logo from "@/shared/components/Logo";

type NavButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

interface NavBarProps extends React.ComponentPropsWithoutRef<"nav"> {
  button?: NavButtonProps;
}

const NavBar = ({ className = "", button, ...props }: NavBarProps) => {
  const { children: buttonContent, ...buttonProps } = button || {};

  return (
    <nav {...props} className={`w-full ${className}`}>
      <div className="m-auto w-full max-w-[70vw] px-2 py-4 flex items-center justify-between">
        <Logo />
        {button && (
          <Button
            variant="inverse"
            emphasis="low"
            size="small"
            {...buttonProps}
          >
            {buttonContent}
          </Button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
