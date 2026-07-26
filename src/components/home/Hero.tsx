import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="px-8 py-24">
      <motion.div
        initial={{
          opacity: 0,
          y: 40
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}
      >
        <h2 className="max-w-4xl text-5xl font-bold leading-tight">
          管理你的生活，
          <br />
          建立自己的 Personal Hub
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-gray-500">
          My Hub 是一個整合行程、任務與生活紀錄的個人管理平台。
        </p>

        <Button className="mt-8">
          開始使用
        </Button>
      </motion.div>
    </section>
  );
}