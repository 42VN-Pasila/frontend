import Button from "@/shared/components/Button";

type ButtonControllerProps = {
    onExitGame: () => void;
    isExiting: boolean;
};

export const ButtonController = ({ onExitGame, isExiting }: ButtonControllerProps) => {
    return (
        <Button
            variant="primary"
            emphasis="high"
            size="large"
            fullWidth={true}
            onClick={onExitGame}
            disabled={isExiting}
        >
            {isExiting ? "Exiting..." : "Exit Game"}
        </Button>
    );
};