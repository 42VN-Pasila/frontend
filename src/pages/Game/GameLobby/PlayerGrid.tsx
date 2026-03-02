
export default function PlayerGrid() {
  return (
    <div className="flex-1 w-full flex items-center justify-center">
      <div className="grid grid-cols-2 gap-10">
        <GraySlot />
        <GraySlot />
        <GraySlot />
        <GraySlot />
      </div>
    </div>
  );
}

function GraySlot() {
  return (
    <div className="h-[260px] w-[220px] rounded-[28px] bg-gray-400/90" />
  );
}