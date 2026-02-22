import Ed from "@assets/Ed.png";
import Edd from "@assets/Edd.png";
import Eddy from "@assets/Eddy.png";
import Plank from "@assets/Plank 1.png";
import type { User } from "./types";

export const MOCK_USERS: User[] = [
  { id: 938472, username: "Huong", avatarUrl: Ed },
  { id: 51002, username: "Tan", avatarUrl: Edd },
  { id: 777301, username: "Triet", avatarUrl: Eddy },
  { id: 120999, username: "Kha", avatarUrl: Plank }, // mock owner
];
