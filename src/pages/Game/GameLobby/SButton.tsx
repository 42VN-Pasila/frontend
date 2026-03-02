import styled from "styled-components";

import { Button } from "@/shared/components";
import type { SemanticColor } from "@/shared/components/Button";

export interface SButtonProps {
  text: string;
  color?: SemanticColor;
  size?: string;
  onClick?: () => void;
}

const SButton = ({ text, color, onClick }: SButtonProps) => {
  return (
    <StyledWrapper>
      <Button color={color} className="button" onClick={onClick}>
        {text}
      </Button>
    </StyledWrapper>
  );
};

export const StyledWrapper = styled.div`
  .button {
    padding: 15px 40px 15px 40px;
    margin: 10px;
    font-size: 20px;
    font-family: "Courier New", monospace;
    shape-rendering: crispEdges;
    border: 0;
    box-shadow:
      0px 5px black,
      0px -5px black,
      5px 0px black,
      -5px 0px black,
      0px 10px #00000038,
      5px 5px #00000038,
      -5px 5px #00000038,
      inset 0px 5px #ffffff36;
    cursor: pointer;
  }
  .button:active {
    transform: translateY(5px);
    box-shadow:
      0px 5px black,
      0px -5px black,
      5px 0px black,
      -5px 0px black,
      inset 0px 5px #00000038;
  }
`;

export default SButton;
