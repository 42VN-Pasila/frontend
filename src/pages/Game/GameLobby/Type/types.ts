export type User = { id: number; username: string; avatarUrl: string };

export type SeatPos = "top" | "left" | "right" | "bottom";
export type SeatIndex = 1 | 2 | 3 | 4;

export type Seat = {
  SeatIndex: SeatIndex;
  SeatPos: SeatPos;
}

export type Player = {
  user: User;
  seat: Seat;     
  isOwner: boolean;  
};


