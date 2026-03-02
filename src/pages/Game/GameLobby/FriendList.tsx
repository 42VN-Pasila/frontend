import SButton from "./SButton";

export default function FriendList({ onJoin }: { onJoin: () => void }) {
  return (
    <div className="w-full my-[25%] flex justify-center">
      <div className="absolute flex-col gap-5  w-[80%] rounded-2xl flex items-center justify-center h-[60%] bg-(--color-purple-secondary)">
        <SButton text="Invite" color="orange" onClick={onJoin}/>
      </div>
    </div>
  );
}
