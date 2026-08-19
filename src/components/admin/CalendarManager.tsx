import React, { useEffect, useState } from "react";
import type { CalendarEvent, EventCategory, CalendarEventInput } from "@/types/calendar";
import * as calendarServiceModule from "@/services/calendar/calendarService";

export default function CalendarManager() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [categories, setCategories] = useState<Record<string, EventCategory>>({});
  const [loading, setLoading] = useState(true);

  // Modal 狀態控制
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // 表單資料狀態
  const [formData, setFormData] = useState<CalendarEventInput>({
    title: "",
    start: "",
    end: "",
    categoryId: "work",
    location: "",
    description: "",
  });

  // 1. 初始化資料
  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [catsData, eventsData] = await Promise.all([
        calendarServiceModule.getCategories(),
        calendarServiceModule.getCalendarEvents(),
      ]);
      setCategories(catsData);
      setEvents(eventsData);
    } catch (err) {
      console.error("載入資料失敗:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // 2. 開啟 modal (新增模式)
  const handleOpenCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      start: new Date().toISOString().slice(0, 16), // 格式: YYYY-MM-DDTHH:mm
      end: "",
      categoryId: Object.keys(categories)[0] || "work",
      location: "",
      description: "",
    });
    setIsModalOpen(true);
  };

  // 3. 開啟 modal (編輯模式)
  const handleOpenEditModal = (event: CalendarEvent) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      start: typeof event.start === "string" ? event.start.slice(0, 16) : "",
      end: typeof event.end === "string" ? event.end.slice(0, 16) : "",
      categoryId: event.categoryId || "work",
      location: event.location || "",
      description: event.description || "",
    });
    setIsModalOpen(true);
  };

  // 4. 儲存表單 (新增 / 編輯)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await calendarServiceModule.updateCalendarEvent(editingId, formData);
        alert("修改成功！");
      } else {
        await calendarServiceModule.addCalendarEvent(formData);
        alert("新增成功！");
      }
      setIsModalOpen(false);
      fetchAllData(); // 重新整理清單
    } catch (err) {
      console.error("儲存失敗:", err);
      alert("儲存失敗，請稍後再試");
    }
  };

  // 5. 刪除行程
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`確定要刪除行程「${title}」嗎？`)) return;

    try {
      await calendarServiceModule.deleteCalendarEvent(id);
      alert("刪除成功！");
      fetchAllData();
    } catch (err) {
      console.error("刪除失敗:", err);
      alert("刪除失敗");
    }
  };

  if (loading) return <div className="p-8 text-gray-500">載入行程管理資料中...</div>;

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">行程管理後台</h1>
          <p className="text-sm text-gray-500">在此管理前台 Contact 頁面顯示的行程資訊</p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="rounded-lg bg-black px-4 py-2 font-medium text-white shadow hover:bg-gray-800 transition"
        >
          + 新增行程
        </button>
      </div>

      {/* 行程列表表格 */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-6 py-3">行程名稱</th>
              <th className="px-6 py-3">類型</th>
              <th className="px-6 py-3">開始時間</th>
              <th className="px-6 py-3">結束時間</th>
              <th className="px-6 py-3">地點</th>
              <th className="px-6 py-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                  目前無任何行程資料
                </td>
              </tr>
            ) : (
              events.map((evt) => (
                <tr key={evt.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{evt.title}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-800 border border-orange-200">
                      {evt.categoryName || "未分類"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{String(evt.start)}</td>
                  <td className="px-6 py-4">{evt.end ? String(evt.end) : "-"}</td>
                  <td className="px-6 py-4">{evt.location || "-"}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEditModal(evt)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      編輯
                    </button>
                    <button
                      onClick={() => handleDelete(evt.id, evt.title)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 表單 Modal (新增/編輯共用) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingId ? "編輯行程" : "新增行程"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">行程標題 *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 w-full rounded-lg border p-2.5 outline-none focus:border-black"
                  placeholder="例如：可安排時間 / 專案會議"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">行程類別</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="mt-1 w-full rounded-lg border p-2.5 outline-none focus:border-black"
                >
                  {Object.values(categories).map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">開始時間 *</label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.start}
                    onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                    className="mt-1 w-full rounded-lg border p-2.5 text-sm outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">結束時間</label>
                  <input
                    type="datetime-local"
                    value={formData.end}
                    onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                    className="mt-1 w-full rounded-lg border p-2.5 text-sm outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">地點</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-1 w-full rounded-lg border p-2.5 outline-none focus:border-black"
                  placeholder="例如：線上 / 台北市"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">說明描述</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 w-full rounded-lg border p-2.5 outline-none focus:border-black"
                  placeholder="詳細說明事項..."
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
                >
                  {editingId ? "更新" : "儲存"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}