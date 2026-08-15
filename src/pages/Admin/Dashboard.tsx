import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Mail,
} from "lucide-react";
import {
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth } from "@/services/firebase/config";
import { isAdmin } from "@/services/auth/adminConfig";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        if (!currentUser) {
          setUser(null);
          setLoading(false);
          return;
        }

        setUser(currentUser);
        setAdmin(await isAdmin(currentUser.uid));
        setLoading(false);
      }
    );

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
        </div>
      </main>
    );
  }

  return (
    <section className="px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            總覽
          </h1>

          <p className="mt-2 text-gray-500">
            歡迎回來，{user.displayName || "管理者"}。
          </p>
        </div>

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
      </div>
    </section>
  );
}