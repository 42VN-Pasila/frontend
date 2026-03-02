import SeatCard from "./SeatCard";
import type { User } from "./types";

export default function PlayerRow({
  seats,
  backSrc,
}: {
  seats: (User | null)[];
  backSrc: string;
}) {
  return (
    <div className=" flex-1 flex items-center justify-center gap-20">
      <SeatCard user={seats[0] || null} backSrc={backSrc} />
      <SeatCard user={seats[1] || null} backSrc={backSrc} />
      <SeatCard user={seats[2] || null} backSrc={backSrc} />
      <SeatCard user={seats[3] || null} backSrc={backSrc} />
    </div>
  );
}
