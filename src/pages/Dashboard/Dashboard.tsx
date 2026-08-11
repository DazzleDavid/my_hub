import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Mail,
  Settings,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/services/firebase/config";
import { isAdmin } from "@/services/auth/adminConfig";

const menuItems = [
  { name: "總覽", icon: LayoutDashboard },
  { name: "行程管理", icon: CalendarDays },
  { name: "聯絡訊息", icon: Mail },
  { name: "網站設定", icon: Settings },
];

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("總覽");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(currentUser);
      setAdmin(await isAdmin(currentUser.uid));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!admin) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="w-full max-w-lg text-center">
          <div className="text-6xl">🔒</div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            目前無此功能
          </h1>
          <p className="mt-4 leading-relaxed text-gray-500">
            目前無開發非管理者的後台頁面。
            <br />
            此區域目前僅提供網站管理者使用。
          </p>

          <a
            href="#/"
            className="mt-8 inline-flex items-center gap-2 rounded-lg border border-black px-5 py-2.5 text-sm font-medium text-black transition hover:bg-black hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首頁
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-[calc(100vh-56px)] bg-gray-50">
      <button
        type="button"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-4 top-20 z-40 rounded-lg border bg-white p-2 shadow-sm transition hover:bg-gray-100 lg:hidden"
      >
        {sidebarOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-5">
          <div className="border-b pb-5">
            <h2 className="text-lg font-bold text-gray-900">Dashboard</h2>
            <p className="mt-1 truncate text-sm text-gray-500">
              {user.displayName || user.email}
            </p>
          </div>

          <nav className="mt-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = activeMenu === item.name;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setActiveMenu(item.name);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                    active
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto border-t pt-5">
            <a
              href="#/"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-black"
            >
              <ArrowLeft className="h-5 w-5" />
              返回首頁
            </a>
          </div>
        </div>
      </aside>

      <section className="min-w-0 flex-1 px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900">
              {activeMenu}
            </h1>
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
    </main>
  );
}