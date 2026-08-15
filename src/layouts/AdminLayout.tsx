import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Footer from "../components/public/Footer";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/services/firebase/config";
import { isAdmin } from "@/services/auth/adminConfig";
import Header from "@/components/public/Header";
import { ArrowLeft } from "lucide-react";

export default function AdminLayout() {
    const [user, setUser] = useState<User | null>(null);
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
            <div className="flex min-h-screen items-center justify-center text-gray-500">
                Loading...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (!admin) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />

                <main className="flex min-h-[85vh] items-center justify-center px-6">
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

                <Footer compact />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <div className="flex min-h-0 flex-1">
                <AdminSidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                <div className="flex min-w-0 flex-1 flex-col">
                    <main className="flex-1 bg-gray-50">
                        <Outlet />
                    </main>
                    <Footer compact />
                </div>
            </div>
        </div>
    );
}