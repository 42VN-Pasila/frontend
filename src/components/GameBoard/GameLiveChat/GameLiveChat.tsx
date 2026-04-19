import { useEffect, useMemo, useRef, useState } from "react";

import type { MatchMessageDto, SendMessageEvent } from "@/gen/director";
import {
  onLatestChatMessage,
  socketSendMatchMessage,
} from "@/shared/api/directorClient";
import { Label } from "@/shared/components/Label";
import { useGameSessionStore } from "@/shared/stores/useGameSessionStore";
import { useUserStore } from "@/shared/stores/useUserStore";

import { ChatMessage } from "./ChatMessage";

interface GameLiveChatProps {
  initialMessages?: MatchMessageDto[];
}

export const GameLiveChat = ({ initialMessages = [] }: GameLiveChatProps) => {
  const { matchId } = useGameSessionStore();

  const [messages, setMessages] = useState<MatchMessageDto[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { username } = useUserStore();

  useEffect(() => {
    const unsubscribe = onLatestChatMessage((message) => {
      if (message.matchId !== matchId) return;

      setMessages((prev) => {
        const exists = prev.some(
          (m) =>
            m.createdAt === message.createdAt &&
            m.username === message.username &&
            m.message === message.message &&
            m.matchId === message.matchId,
        );

        if (exists) return prev;
        return [...prev, message];
      });
    });

    return () => {
      unsubscribe();
    };
  }, [matchId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const trimmedInput = useMemo(() => input.trim(), [input]);

  const handleSend = async () => {
    if (!matchId) {
      // TODO: Handle error
      console.error("Cannot send message: matchId is missing");
      return;
    }

    if (!trimmedInput || isSending) return;

    const payload: SendMessageEvent = {
      username,
      matchId,
      message: trimmedInput,
    };

    try {
      setIsSending(true);
      await socketSendMatchMessage(payload);
      setInput("");
    } catch (error) {
      // TODO: Handle error
      console.error("Failed to send chat message", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex-1 min-h-0 bg-rave-black p-4 flex flex-col">
      <Label className="text-2xl">Live Chat</Label>

      <div className="mt-3 flex-1 min-h-0 overflow-y-auto space-y-2 pr-1">
        {messages.length === 0 ? (
          <div className="text-xs text-rave-white/50">
            No messages yet. Start the conversation.
          </div>
        ) : (
          messages.map((chatMessage, index) => (
            <div
              key={`${chatMessage.matchId}-${chatMessage.username}-${chatMessage.createdAt}-${index}`}
              className="max-w-[80%]"
            >
              <ChatMessage
                senderUserName={chatMessage.username}
                message={chatMessage.message}
              />
            </div>
          ))
        )}

        <div ref={bottomRef} />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <input
          type="text"
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              void handleSend();
            }
          }}
          disabled={isSending}
          className="flex-1 h-9 border border-rave-white/20 bg-rave-white/5 px-3 text-xs text-rave-white placeholder:text-rave-white/40 outline-none focus:border-rave-red disabled:opacity-50"
        />

        <button
          type="button"
          onClick={() => void handleSend()}
          disabled={!trimmedInput || isSending}
          className="h-9 px-3 text-xs border border-rave-red bg-rave-red/10 text-rave-white hover:bg-rave-red/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};
