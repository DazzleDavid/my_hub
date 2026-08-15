import {
  LayoutDashboard,
  CalendarDays,
  Mail,
  Settings,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const menuItems = [
  { name: "總覽", icon: LayoutDashboard },
  { name: "行程管理", icon: CalendarDays },
  { name: "聯絡訊息", icon: Mail },
  { name: "網站設定", icon: Settings },
];

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
  activeMenu,
  setActiveMenu,
}: AdminSidebarProps) {
  return (
    <>
      {/* Mobile Menu Button */}
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

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-5">

          {/* Header */}
          <div className="border-b pb-5">
            <h2 className="text-lg font-bold text-gray-900">
              Dashboard
            </h2>
          </div>

          {/* Menu */}
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

          {/* Back Home */}
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
    </>
  );
}