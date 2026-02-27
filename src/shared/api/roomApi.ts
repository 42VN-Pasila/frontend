import {readAll} from "../../pages/Game/GameLobby/Logic/roomStore"

export const roomApi = {
  async RoomId(): Promise<number> {
    const rooms = readAll();
    const used = new Set(rooms.map((r) => String(r.id)));

    let id = 0;
    for (let i = 0; i < 50; i++) {
      id = Math.floor(1000 + Math.random() * 9000);
      if (!used.has(String(id))) break;
    }

    return id;
  },
};

export const { RoomId } = roomApi;