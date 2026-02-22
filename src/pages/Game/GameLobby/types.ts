export type User = { id: number; username: string; avatarUrl: string };

export type SeatPos = "top" | "left" | "right" | "bottom";
export type SeatIndex = 1 | 2 | 3 | 4;

export type Player = {
  user: User;
  seat: SeatIndex;  
  pos: SeatPos;      
  isOwner: boolean;  
};
