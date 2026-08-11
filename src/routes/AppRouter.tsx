import {
  HashRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ProtectedRoute from "./ProtectedRoute";

function AppLayout() {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer compact={isDashboard} />
    </div>
  );
}

export default function AppRouter() {
  return (
    <HashRouter>
      <AppLayout />
    </HashRouter>
  );
}