import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  type Timestamp,
} from "firebase/firestore";
import { db } from "@/services/firebase/config";
import MessageList from "@/components/admin/MessageList";
import MessageDetail from "@/components/admin/MessageDetail";

export type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "read" | "unread";
  createdAt: Timestamp | null;
};

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] =
    useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Message[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];

      setMessages(data);

      // 當 Firebase 數據更新時，同步更新 selectedMessage
      setSelectedMessage((prevSelected) => {
        if (!prevSelected) return null;
        return data.find((msg) => msg.id === prevSelected.id) || null;
      });

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 選擇訊息時：切換選取狀態，若為未讀則自動標記為已讀
  const handleSelectMessage = async (message: Message) => {
    setSelectedMessage(message);

    if (message.status === "unread") {
      try {
        await updateDoc(doc(db, "messages", message.id), {
          status: "read",
        });
      } catch (error) {
        console.error("更新已讀狀態失敗:", error);
      }
    }
  };

  const unreadCount = messages.filter(
    (message) => message.status === "unread"
  ).length;

  const readCount = messages.filter(
    (message) => message.status === "read"
  ).length;

  return (
    <section className="min-w-0 flex-1 px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* 統計 */}
        <div className="mb-8 grid grid-cols-3 gap-3 sm:gap-5">
          <div className="rounded-xl border bg-white px-3 py-4 text-center shadow-sm sm:px-6">
            <div className="text-2xl font-bold text-gray-900">
              {messages.length}
            </div>

            <div className="mt-1 text-xs text-gray-500 sm:text-sm">
              全部訊息
            </div>
          </div>

          <div className="rounded-xl border bg-white px-3 py-4 text-center shadow-sm sm:px-6">
            <div className="text-2xl font-bold text-gray-900">
              {unreadCount}
            </div>

            <div className="mt-1 text-xs text-gray-500 sm:text-sm">
              未讀訊息
            </div>
          </div>

          <div className="rounded-xl border bg-white px-3 py-4 text-center shadow-sm sm:px-6">
            <div className="text-2xl font-bold text-gray-900">
              {readCount}
            </div>

            <div className="mt-1 text-xs text-gray-500 sm:text-sm">
              已讀訊息
            </div>
          </div>
        </div>

        {/* 訊息區域 */}
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          {loading ? (
            <div className="flex min-h-[520px] items-center justify-center text-sm text-gray-400">
              載入中...
            </div>
          ) : messages.length === 0 ? (
            <div className="flex min-h-[520px] items-center justify-center text-sm text-gray-400">
              目前沒有訊息
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-[360px_minmax(0,1fr)]">
              {/* 左側訊息列表 */}
              <MessageList
                messages={messages}
                selectedMessage={selectedMessage}
                onSelect={handleSelectMessage}
              />

              {/* 桌面版 Detail */}
              <div className="hidden lg:block">
                <MessageDetail
                  message={selectedMessage}
                  mobile={false}
                />
              </div>
            </div>
          )}
        </div>

        {/* 手機版 Overlay 全螢幕覆蓋視窗 */}
        {selectedMessage && (
          <div className="fixed inset-0 z-50 bg-white lg:hidden">
            <MessageDetail
              message={selectedMessage}
              mobile
              onBack={() => setSelectedMessage(null)}
            />
          </div>
        )}
      </div>
    </section>
  );
}