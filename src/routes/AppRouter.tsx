import {
    HashRouter,
    Routes,
    Route,
} from "react-router-dom";

import Home from "@/pages/Home";
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