import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { loginWithGoogle, logout } from "@/services/auth/authService";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/services/firebase/config";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const navItems = [
  { name: "Home", description: "個人首頁", path: "/" },
  { name: "Trip", description: "旅行紀錄", path: "/trip" },
  { name: "Experience", description: "經歷總覽", path: "/experience" },
  { name: "About", description: "自我介紹", path: "/about" },
  { name: "Contact", description: "聯絡方式", path: "/contact" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  async function handleLogin() {
    console.log("開始登入");
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.error("登入失敗:", error);
    }
  }

  async function handleLogout() {
    try {
      await logout();
      setUserMenuOpen(false);
      setOpen(false);
      navigate("/");
    } catch (error) {
      console.error("登出失敗:", error);
    }
  }

  return (
    <>
      <header className="w-full border-b bg-white">
        <div className="flex h-14 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 font-serif text-lg font-bold transition duration-300 hover:scale-105">
            <img src={logo} alt="J.D.I Logo" className="h-8 w-8 object-cover" />
            J.D.I.哲哲
          </Link>

          {/* Desktop */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link key={item.name} to={item.path} className="relative text-sm text-gray-600 transition duration-300 hover:text-black after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
                {item.name}
              </Link>
            ))}

            {user ? (
              <div className="relative">
                <button type="button" onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 rounded-full p-1 transition duration-300 hover:bg-gray-100">
                  <img src={user.photoURL || logo} alt={user.displayName || "User"} className="h-9 w-9 rounded-full object-cover" />
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-xl border bg-white shadow-lg">
                    <div className="border-b px-4 py-3">
                      <p className="truncate text-sm font-semibold">{user.displayName}</p>
                      <p className="truncate text-xs text-gray-500">{user.email}</p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <div className="border-t border-gray-200" />
                    <button type="button" onClick={handleLogout} className="w-full px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-100">
                      登出
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button className="transition duration-300 hover:-translate-y-1 hover:shadow-md" onClick={handleLogin}>
                Google 登入
              </Button>
            )}
          </nav>

          {/* Mobile */}
          <button className="transition duration-300 hover:scale-110 md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6 rotate-90 transition duration-300" /> : <Menu className="h-6 w-6 transition duration-300" />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 bg-black/30 transition-opacity duration-300 md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setOpen(false)}>
        <aside className={`h-full w-72 bg-white p-6 shadow-xl transition-transform duration-500 ease-out ${open ? "translate-x-0" : "-translate-x-full"}`} onClick={(e) => e.stopPropagation()}>
          <Link to="/" className="flex items-center gap-2 font-serif text-xl font-bold transition duration-300 hover:scale-105" onClick={() => setOpen(false)}>
            <img src={logo} alt="J.D.I Logo" className="h-10 w-10 object-cover" />
            J.D.I.哲哲
          </Link>

          <nav className="mt-8 space-y-5">
            {navItems.map((item, index) => (
              <Link key={item.name} to={item.path} onClick={() => setOpen(false)} className={`block rounded-lg p-2 transition-all duration-800 hover:translate-x-2 hover:bg-gray-100 hover:text-black ${open ? "translate-x-0 opacity-100" : "-translate-x-5 opacity-0"}`} style={{ transitionDelay: `${index * 50}ms` }}>
                <div className="text-base font-semibold">{item.name}</div>
                <div className="mt-1 text-sm text-gray-500">{item.description}</div>
              </Link>
            ))}
          </nav>

          {/* Mobile User Section */}
          <div className={`mt-8 ${user ? "border-t border-gray-200 pt-6" : ""}`}>
            {user ? (
              <div>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex w-full items-center gap-3 rounded-xl p-2 transition hover:bg-gray-100"
                >
                  <img
                    src={user.photoURL || logo}
                    alt={user.displayName || "User"}
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1 text-left">
                    <div className="truncate text-sm font-semibold">{user.displayName}</div>
                    <div className="truncate text-xs text-gray-500">{user.email}</div>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userMenuOpen && (
                  <div className="mt-2">
                    <Link
                      to="/dashboard"
                      onClick={() => {
                        setUserMenuOpen(false);
                        setOpen(false);
                      }}
                      className="block rounded-lg px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <div className="border-t border-gray-200" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-lg px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-100"
                    >
                      登出
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                className="w-full transition duration-300 hover:-translate-y-1 hover:shadow-md"
                onClick={handleLogin}
              >
                Google 登入
              </Button>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}