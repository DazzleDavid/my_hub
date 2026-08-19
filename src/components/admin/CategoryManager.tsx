import React, { useEffect, useState } from "react";
import type { EventCategory } from "@/types/calendar";
import * as calendarServiceModule from "@/services/calendar/calendarService";

export default function CategoryManager() {
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal 狀態控制
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // 表單資料狀態：包含 name (內部代碼) 與 displayName (對外顯示)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    displayName: "",
    color: "#d97724",
  });

  // 1. 初始化讀取所有類別
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const catsMap = await calendarServiceModule.getCategories();
      setCategories(Object.values(catsMap));
    } catch (err) {
      console.error("載入類別失敗:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 2. 開啟新增 Modal
  const handleOpenCreateModal = () => {
    setIsEditing(false);
    setFormData({
      id: "",
      name: "",
      displayName: "",
      color: "#d97724",
    });
    setIsModalOpen(true);
  };

  // 3. 開啟編輯 Modal
  const handleOpenEditModal = (cat: EventCategory) => {
    setIsEditing(true);
    setFormData({
      id: cat.id,
      name: cat.name || "",
      displayName: cat.displayName || cat.name || "",
      color: cat.color || "#d97724",
    });
    setIsModalOpen(true);
  };

  // 4. 儲存類別 (新增 / 修改)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id.trim() || !formData.name.trim() || !formData.displayName.trim()) {
      alert("請填寫完整類別 ID、內部代碼與對外顯示名稱");
      return;
    }

    try {
      await calendarServiceModule.saveCategory(
        formData.id.trim(),
        formData.name.trim(),
        formData.displayName.trim(),
        formData.color
      );
      alert(isEditing ? "修改類別成功！" : "新增類別成功！");
      setIsModalOpen(false);
      fetchCategories();
    } catch (err) {
      console.error("儲存失敗:", err);
      alert("儲存失敗，請稍後再試");
    }
  };

  if (loading) return <div className="p-8 text-gray-500">載入行程類別中...</div>;

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">行程類別管理</h1>
          <p className="text-sm text-gray-500">管理用於行程標籤的內部代碼與對外顯示名稱</p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="rounded-lg bg-black px-4 py-2 font-medium text-white shadow hover:bg-gray-800 transition"
        >
          + 新增類別
        </button>
      </div>

      {/* 類別列表表格 */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-6 py-3">類別 ID</th>
              <th className="px-6 py-3">內部代碼/名稱</th>
              <th className="px-6 py-3">對外顯示名稱</th>
              <th className="px-6 py-3">色彩標記</th>
              <th className="px-6 py-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                  目前無任何類別資料
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono font-medium text-gray-900">{cat.id}</td>
                  <td className="px-6 py-4 font-mono text-gray-700">{cat.name}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{cat.displayName}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-4 w-4 rounded-full border border-black/10"
                        style={{ backgroundColor: cat.color || "#d97724" }}
                      />
                      <span className="text-xs text-gray-500">{cat.color || "#d97724"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleOpenEditModal(cat)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      編輯
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal 表單 (新增/編輯) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {isEditing ? "編輯類別" : "新增類別"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">類別 ID *</label>
                <input
                  type="text"
                  required
                  disabled={isEditing}
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="mt-1 w-full rounded-lg border p-2.5 font-mono text-sm outline-none focus:border-black disabled:bg-gray-100 disabled:text-gray-500"
                  placeholder="例如：work / personal / meeting"
                />
                <p className="mt-1 text-xs text-gray-400">寫入 Firestore 做為文件的唯一 Key</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">內部代碼/名稱 *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border p-2.5 font-mono text-sm outline-none focus:border-black"
                  placeholder="例如：meeting_internal"
                />
                <p className="mt-1 text-xs text-gray-400">供管理員在後台識別用</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">對外顯示名稱 *</label>
                <input
                  type="text"
                  required
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className="mt-1 w-full rounded-lg border p-2.5 outline-none focus:border-black"
                  placeholder="例如：工作/會議"
                />
                <p className="mt-1 text-xs text-gray-400">顯示給一般訪客看的名字</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">主題顏色</label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="h-10 w-12 cursor-pointer rounded border border-gray-300 p-1"
                  />
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full rounded-lg border p-2.5 font-mono text-sm outline-none focus:border-black"
                  />
                </div>
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
                  {isEditing ? "更新" : "儲存"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}