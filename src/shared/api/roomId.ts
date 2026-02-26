// export const roomApi = {
//   async RoomId(): Promise<number> {
//   // const res = await fetch("/rooms", { method: "GET/POST" });
//   // const data = await res.json();
//   // return data.roomId;
//   return 1122; // mock
// }
// };

// export const { RoomId } = roomApi;

const KEY = "mock_rooms_v1";

function readRooms(): Array<{ id: string }> {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export const roomApi = {
  async RoomId(): Promise<number> {
    const rooms = readRooms();
    const used = new Set(rooms.map((r) => String(r.id)));

    let id = 0;
    for (let i = 0; i < 50; i++) {
      id = Math.floor(1000 + Math.random() * 9000); // 4 digits
      if (!used.has(String(id))) break;
    }

    return id;
  },
};

export const { RoomId } = roomApi;