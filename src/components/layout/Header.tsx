import {
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { loginWithGoogle } from "@/services/auth/authService";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const navItems = [
  {
    name: "Home",
    description: "個人首頁",
    path: "/"
  },
  {
    name: "Trip",
    description: "旅行紀錄",
    path: "/trip"
  },
  {
    name: "Experience",
    description: "經歷總覽",
    path: "/experience"
  },
  {
    name: "About",
    description: "自我介紹",
    path: "/about"
  },
  {
    name: "Contact",
    description: "聯絡方式",
    path: "/contact"
  }
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  async function handleLogin() {
    console.log("開始登入");

    try {
      await loginWithGoogle();
      navigate("/dashboard");
    }
    catch (error) {
      console.error("登入失敗:", error);
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

            {
              navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative text-sm text-gray-600 transition duration-300 hover:text-black after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.name}
                </Link>
              ))
            }


            <Button className="transition duration-300 hover:-translate-y-1 hover:shadow-md" onClick={handleLogin}>
              Google 登入
            </Button>

          </nav>


          {/* Mobile */}

          <button
            className="transition duration-300 hover:scale-110 md:hidden"
            onClick={() => setOpen(!open)}
          >
            {
              open
                ? <X className="h-6 w-6 rotate-90 transition duration-300" />
                : <Menu className="h-6 w-6 transition duration-300" />
            }
          </button>

        </div>
      </header>


      {/* Mobile Sidebar */}

      <div
        className={`fixed inset-0 z-50 bg-black/30 transition-opacity duration-300 md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
      >

        <aside
          className={`h-full w-72 bg-white p-6 shadow-xl transition-transform duration-500 ease-out ${open ? "translate-x-0" : "-translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >

          <Link to="/" className="flex items-center gap-2 font-serif text-xl font-bold transition duration-300 hover:scale-105" onClick={() => setOpen(false)}>
            <img src={logo} alt="J.D.I Logo" className="h-10 w-10 object-cover" />
            J.D.I.哲哲
          </Link>


          <nav className="mt-8 space-y-5">

            {
              navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg p-2 transition-all duration-800 hover:translate-x-2 hover:bg-gray-100 hover:text-black ${open ? "translate-x-0 opacity-100" : "-translate-x-5 opacity-0"}`}
                  style={{
                    transitionDelay: `${index * 50}ms`
                  }}
                >

                  <div className="text-base font-semibold">
                    {item.name}
                  </div>


                  <div className="mt-1 text-sm text-gray-500">
                    {item.description}
                  </div>

                </Link>
              ))
            }

          </nav>


          <Button className="mt-8 w-full transition duration-300 hover:-translate-y-1 hover:shadow-md" onClick={handleLogin}>
            Google 登入
          </Button>

        </aside>

      </div>

    </>
  );
}