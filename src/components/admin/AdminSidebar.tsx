import {
  LayoutDashboard,
  CalendarDays,
  Mail,
  Settings,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";

const menuItems = [
  {
    name: "總覽",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "行程管理",
    icon: CalendarDays,
    path: "/dashboard/events",
  },
  {
    name: "聯絡訊息",
    icon: Mail,
    path: "/dashboard/messages",
  },
  {
    name: "網站設定",
    icon: Settings,
    path: "/dashboard/settings",
  },
];

type AdminSidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
}: AdminSidebarProps) {
  const location = useLocation();

  return (
    <>
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
            <h2 className="text-lg font-bold text-gray-900">
              Dashboard
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              管理後台
            </p>
          </div>

          <nav className="mt-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-auto border-t pt-5">
            <Link
              to="/"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-black"
            >
              <ArrowLeft className="h-5 w-5" />
              返回首頁
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}