import { useState } from "react";
import { CardSelectionModal } from "../Game/components/CardSelectionModal";
import { Button } from "@/shared/components";

const ModalTestPage = () => {
  // Hardcode the local player as ID 1
  const LOCAL_PLAYER_ID = 1;

  // This state controls the modal: 
  // null = hidden, 1 = My Turn, 2 = Opponent Turn
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className="h-screen w-full bg-slate-900 flex flex-col items-center justify-center">
      <h1 className="text-white mb-8 text-xl">Card Selection UI Component Testing</h1>
      
      <div className="flex gap-4">
        {/* Click this to see the "Interactive" version */}
        <Button
            onClick={() => setActiveId(1)}
            variant="primary"
            size="large"
            color="purple"
            >
          Mock: My Turn (ID 1)
        </Button>

        {/* Click this to see the "Waiting" version */}
        <Button
            onClick={() => setActiveId(2)}
            variant="inverse"
            size="large"
            >
          Mock: Opponent Turn (ID 2)
        </Button>
      </div>

      {/* The component you are building */}
      <CardSelectionModal 
        activePlayerId={activeId}
        localPlayerId={LOCAL_PLAYER_ID}
        onSelect={(choice) => {
          console.log("Mock choice received:", choice);
          setActiveId(null); // Close modal on choice
        }}
      />
    </div>
  );
};

export default ModalTestPage;