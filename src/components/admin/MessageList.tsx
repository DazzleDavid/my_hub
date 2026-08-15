import { Mail } from "lucide-react";
import type { Message } from "@/pages/Admin/Messages";

type MessageListProps = {
  messages: Message[];
  selectedMessage: Message | null;
  onSelect: (message: Message) => void;
};

export default function MessageList({
  messages,
  selectedMessage,
  onSelect,
}: MessageListProps) {
  return (
    <div className="divide-y">
      {messages.map((message) => {
        const unread = message.status === "unread";
        const selected = selectedMessage?.id === message.id;

        return (
          <button
            key={message.id}
            type="button"
            onClick={() => onSelect(message)}
            className={`w-full px-5 py-5 text-left transition ${
              selected
                ? "bg-gray-100"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {unread ? (
                  <span className="block h-2.5 w-2.5 rounded-full bg-black" />
                ) : (
                  <span className="block h-2.5 w-2.5 rounded-full border border-gray-300" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p
                    className={`truncate text-sm ${
                      unread
                        ? "font-semibold text-gray-900"
                        : "font-medium text-gray-700"
                    }`}
                  >
                    {message.name}
                  </p>

                  <span className="shrink-0 text-xs text-gray-400">
                    {message.createdAt
                      ?.toDate()
                      .toLocaleDateString("zh-TW", {
                        month: "2-digit",
                        day: "2-digit",
                      })}
                  </span>
                </div>

                <p
                  className={`mt-1 truncate text-sm ${
                    unread
                      ? "font-medium text-gray-800"
                      : "text-gray-600"
                  }`}
                >
                  {message.subject}
                </p>

                <p className="mt-1 truncate text-xs text-gray-400">
                  {message.message}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-gray-400" />

                  <span className="truncate text-xs text-gray-400">
                    {message.email}
                  </span>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}