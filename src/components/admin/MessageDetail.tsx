import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/services/firebase/config";
import type { Message } from "@/pages/Admin/Messages";

type MessageDetailProps = {
  message: Message | null;
  mobile?: boolean;
  onBack?: () => void;
};

export default function MessageDetail({
  message,
  mobile = false,
  onBack,
}: MessageDetailProps) {
  const [loading, setLoading] = useState(false);

  if (!message) {
    return (
      <div className="hidden min-h-[520px] items-center justify-center lg:flex">
        <p className="text-sm text-gray-400">
          選擇一則訊息查看詳細內容
        </p>
      </div>
    );
  }

  async function toggleRead() {
    if (loading || !message) {
      return;
    }

    setLoading(true);

    try {
      await updateDoc(doc(db, "messages", message.id), {
        status: message.status === "unread" ? "read" : "unread",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (loading || !message) {
      return;
    }

    if (!window.confirm("確定要刪除這則訊息嗎？")) {
      return;
    }

    setLoading(true);

    try {
      await deleteDoc(doc(db, "messages", message.id));
      onBack?.();
    } finally {
      setLoading(false);
    }
  }

  const dateText = message.createdAt
    ? message.createdAt.toDate().toLocaleString("zh-TW", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "時間未知";

  /* 手機版 */
  if (mobile) {
    return (
      <div className="flex h-full w-full flex-col bg-white">
        {/* 頂部導覽 */}
        <div className="flex h-14 shrink-0 items-center border-b px-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            返回訊息
          </button>
        </div>

        {/* 訊息內容區 */}
        <div className="flex-1 overflow-y-auto px-6 py-7">
          <h2 className="text-2xl font-bold text-gray-900">
            {message.subject}
          </h2>

          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-900">
              {message.name}
            </p>

            <a
              href={`mailto:${message.email}`}
              className="mt-1 inline-flex items-center gap-1 text-sm text-gray-500 transition hover:text-black hover:underline"
            >
              <Mail className="h-3.5 w-3.5" />
              {message.email}
            </a>
          </div>

          <div className="my-7 border-t" />

          <p className="whitespace-pre-wrap leading-7 text-gray-700">
            {message.message}
          </p>

          <p className="mt-10 text-sm text-gray-400">
            {dateText}
          </p>
        </div>

        {/* 底部按鈕區 */}
        <div className="shrink-0 border-t bg-white px-6 py-4 pb-8 sm:pb-4">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={toggleRead}
              className="rounded-lg border px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
            >
              {message.status === "unread"
                ? "標記已讀"
                : "標記未讀"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={handleDelete}
              className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* 桌面版 */
  return (
    <div className="hidden min-h-[520px] lg:flex lg:flex-col">
      <div className="flex-1 px-8 py-7">
        <h2 className="text-xl font-semibold text-gray-900">
          {message.subject}
        </h2>

        <div className="mt-5">
          <p className="text-sm font-medium text-gray-800">
            {message.name}
          </p>

          <a
            href={`mailto:${message.email}`}
            className="mt-1 inline-flex items-center gap-1 text-sm text-gray-500 transition hover:text-black hover:underline"
          >
            <Mail className="h-3.5 w-3.5" />
            {message.email}
          </a>
        </div>

        <div className="my-6 border-t" />

        <p className="whitespace-pre-wrap leading-7 text-gray-700">
          {message.message}
        </p>

        <p className="mt-8 text-sm text-gray-400">
          {dateText}
        </p>
      </div>

      <div className="border-t px-8 py-5">
        <div className="flex justify-end gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={toggleRead}
            className="rounded-lg border px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
          >
            {message.status === "unread"
              ? "標記已讀"
              : "標記未讀"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={handleDelete}
            className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
          >
            刪除
          </button>
        </div>
      </div>
    </div>
  );
}