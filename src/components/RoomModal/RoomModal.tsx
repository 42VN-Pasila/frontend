import { useRoomStore } from "@/shared/stores/useRoomStore";

import { CreateRoomModal } from "./CreateRoomModal";
import { RoomSlot } from "./RoomSlot";

export const RoomModal = () => {
  const { id: roomId } = useRoomStore();

  return (
    <div className="relative border-2 border-rave-white/10 rounded-lg text-rave-white font-chakraBold p-6">
      <div
        className={`
                pointer-events-none absolute inset-x-4 top-2 h-16 rounded-xl
                transition-opacity duration-300
                opacity-90
            `}
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 1.6px)",
          backgroundSize: "8px 8px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />
      {roomId ? <RoomSlot /> : <CreateRoomModal />}
    </div>
  );
};
