import { useState } from "react";

import { Button } from "@/shared/components";

import { CardSelectionModal } from "../Game/components/CardSelectionModal/CardSelectionModal";

function pickRandomOpponentId(localId: number) {
  const pool = [1, 2, 3, 4].filter((id) => id !== localId);
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}

const ModalTestPage = () => {
  const [LOCAL_PLAYER_ID] = useState(() => Math.floor(Math.random() * 4) + 1);

  // This state controls the modal:
  // null = hidden, else = Sb's Turn
  const [activeId, setActiveId] = useState<number | null>(null);
  return (
    <div className="h-screen w-full bg-slate-900 flex flex-col items-center justify-center">
      <h1 className="text-white mb-8 text-xl">
        Card Selection UI Component Testing
      </h1>

      <div className="flex gap-4">
        {/* Click this to see the "Interactive" version */}
        <Button
          onClick={() => setActiveId(LOCAL_PLAYER_ID)}
          variant="primary"
          size="large"
          color="purple"
        >
          Mock: My Turn (ID: {LOCAL_PLAYER_ID})
        </Button>

        {/* Click this to see the "Waiting" version */}
        <Button
          onClick={() => setActiveId(pickRandomOpponentId(LOCAL_PLAYER_ID))}
          variant="inverse"
          size="large"
        >
          Mock: Opponent (not ID: ({LOCAL_PLAYER_ID}))
        </Button>
      </div>

      {/* The modal that renders different versions for player's turn and their opponents */}
      <CardSelectionModal
        activePlayerId={activeId}
        localPlayerId={LOCAL_PLAYER_ID}
        onSelect={(payload) => {
          console.log("Mock choice received, send to backend:", payload);
          setActiveId(null); // Close modal on choice
        }}
      />
    </div>
  );
};

export default ModalTestPage;
