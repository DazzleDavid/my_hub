import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import AdminLayout from "@/layouts/AdminLayout";
import Home from "@/pages/public/Home";
import About from "@/pages/public/About";
import Contact from "@/pages/public/Contact";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Admin/Dashboard";
import Messages from "@/pages/Admin/Messages";

export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>

        <Route element={<PublicLayout />}>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/experience" element={<Experience />} /> */}
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/trip" element={<Trip />} /> */}
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/messages" element={<Messages />} />
          {/* <Route path="/dashboard/schedule" element={<Schedule />} /> */}
          {/* <Route path="/dashboard/profile" element={<Profile />} /> */}
          {/* <Route path="/dashboard/settings" element={<Settings />} /> */}
        </Route>

      </Routes>
    </HashRouter>
  );
}