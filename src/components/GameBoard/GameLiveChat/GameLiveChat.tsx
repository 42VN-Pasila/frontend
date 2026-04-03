import { Label } from "@/shared/components/Label";

export const GameLiveChat = () => {
  return (
    <div className="flex-1 min-h-0 bg-rave-black p-4 flex flex-col">
      <Label className="text-2xl">Live Chat</Label>
      <div className="mt-3 flex-1 min-h-0 overflow-y-auto space-y-2 pr-1">
        <div className=" rounded-md border border-rave-white/15 bg-rave-white/5 px-3 py-2 text-xs text-rave-white">
          Huong: Anyone has Ace of Hearts?
        </div>
        <div className="ml-auto rounded-md border border-rave-red/40 bg-rave-red/10 px-3 py-2 text-xs text-rave-white">
          You: Nope, I can trade Queen of Clubs.
        </div>
        <div className="max-w-[80%] rounded-md border border-rave-white/15 bg-rave-white/5 px-3 py-2 text-xs text-rave-white">
          Tan: I might have it next turn.
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 h-9 border border-rave-white/20 bg-rave-white/5 px-3 text-xs text-rave-white placeholder:text-rave-white/40 outline-none focus:border-rave-red"
        />
        <button
          type="button"
          className="h-9 px-3 text-xs border border-rave-red bg-rave-red/10 text-rave-white hover:bg-rave-red/20"
        >
          Send
        </button>
      </div>
    </div>
  );
};
