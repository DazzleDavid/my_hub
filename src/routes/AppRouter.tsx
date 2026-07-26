import {
    HashRouter,
    Routes,
    Route,
} from "react-router-dom";

import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Dashboard from "@/pages/Dashboard/Dashboard";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
    return (
        <HashRouter>
            <Routes>

                {/* 公開首頁 */}
                <Route
                    path="/"
                    element={
                        <Home />
                    }
                />

                {/* 登入頁 */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* 管理後台 */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </HashRouter>
    );
}