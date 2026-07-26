import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import FeatureCard from "@/components/home/FeatureCard";
import Hero from "@/components/home/Hero";
import PreviewDashboard from "@/components/home/PreviewDashboard";
import {
  CalendarDays,
  CheckCircle,
  ChartNoAxesColumn
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="w-full">
        <Hero />

        <section className="px-8 pb-20">
          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={CalendarDays}
              title="行程管理"
              description="管理每天的行程安排，掌握自己的時間。"
            />

            <FeatureCard
              icon={CheckCircle}
              title="任務追蹤"
              description="紀錄待辦事項，追蹤完成進度。"
            />

            <FeatureCard
              icon={ChartNoAxesColumn}
              title="生活分析"
              description="分析時間分配，了解自己的生活模式。"
            />
          </div>
        </section>

        <PreviewDashboard />
      </main>

      <Footer />
    </div>
  );
}