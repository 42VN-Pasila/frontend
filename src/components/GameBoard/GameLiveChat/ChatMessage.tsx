import { useUserStore } from "@/shared/stores/useUserStore";

export interface ChatModalProps {
  senderUserName: string;
  message: string;
}
export const ChatMessage = ({ senderUserName, message }: ChatModalProps) => {
  const { username } = useUserStore();
  const isSender = username == senderUserName;
  return isSender ? (
    <div className="ml-auto rounded-md border border-rave-red/40 bg-rave-red/10 px-3 py-2 text-xs text-rave-white">
      You: {message}
    </div>
  ) : (
    <div className="rounded-md border border-rave-white/15 bg-rave-white/5 px-3 py-2 text-xs text-rave-white">
      {senderUserName}: {message}
    </div>
  );
};
