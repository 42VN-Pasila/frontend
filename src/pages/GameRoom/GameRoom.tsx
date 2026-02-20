import CreateRoom from "./CreateRoom";

export const RoomId = 1234;

const GameRoom = () => {
  return (
    <div>
      <CreateRoom roomId={RoomId} />
    </div>
  );
};

export default GameRoom;