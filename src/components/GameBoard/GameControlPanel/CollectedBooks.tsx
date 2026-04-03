import { Label } from "@/shared/components/Label";
import { useGameSessionStore } from "@/shared/stores/useGameSessionStore";
import { useUserStore } from "@/shared/stores/useUserStore";

export const CollectedBooks = () => {
  const { username } = useUserStore();
  const { books } = useGameSessionStore();
  const currentUsername = username.trim();
  const bookCount = books.filter(
    (book) => book.username === currentUsername,
  ).length;
  return (
    <div
      id="collected-books"
      className="h-fit p-4  border-b-2 border-rave-white/10 "
    >
      <Label className="text-5xl text-rave-red/80">
        SCORE{" "}
        <span className="text-6xl font-mono text-rave-white">{bookCount}</span>
      </Label>
    </div>
  );
};
