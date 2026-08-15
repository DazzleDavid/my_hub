import { CalendarDays, LayoutDashboard, Mail } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import type { User } from "firebase/auth";

type AdminContext = {
  user: User;
  activeMenu: string;
};

export default function Dashboard() {
  const { user, activeMenu } = useOutletContext<AdminContext>();

  return (
    <section className="min-w-0 px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">{activeMenu}</h1>
          <p className="mt-2 text-gray-500">
            歡迎回來，{user.displayName || "管理者"}。
          </p>
        </div>

        {activeMenu === "總覽" && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <LayoutDashboard className="h-5 w-5" />
                <h2 className="font-semibold">網站總覽</h2>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                查看網站目前的基本狀態。
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5" />
                <h2 className="font-semibold">行程</h2>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                管理網站上的行程與活動。
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5" />
                <h2 className="font-semibold">訊息</h2>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                查看訪客透過聯絡表單傳送的訊息。
              </p>
            </div>
          </div>
        )}

        {activeMenu === "行程管理" && (
          <div className="rounded-xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">行程管理</h2>
            <p className="mt-3 text-gray-500">
              這裡之後可以加入 FullCalendar 與 Firestore 行程管理。
            </p>
          </div>
        )}

        {activeMenu === "聯絡訊息" && (
          <div className="rounded-xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">聯絡訊息</h2>
            <p className="mt-3 text-gray-500">
              這裡之後可以讀取 Firestore 中的聯絡表單資料。
            </p>
          </div>
        )}

        {activeMenu === "網站設定" && (
          <div className="rounded-xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">網站設定</h2>
            <p className="mt-3 text-gray-500">
              這裡之後可以放置網站相關設定。
            </p>
          </div>
        )}
      </div>
    </section>
  );
}