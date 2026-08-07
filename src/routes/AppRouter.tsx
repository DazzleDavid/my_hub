import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <HashRouter>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}