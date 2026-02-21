// import { OpenAPI } from '@/gen/core/OpenAPI';

// OpenAPI.BASE = import.meta.env.GameRoom;

export const roomApi = {
  async RoomId(): Promise<number> {
  // const res = await fetch("/rooms", { method: "GET/POST" });
  // const data = await res.json();
  // return data.roomId;
  return 1122; // mock
}
};

export const { RoomId } = roomApi;