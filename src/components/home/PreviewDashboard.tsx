import { motion } from "framer-motion";

export default function PreviewDashboard() {
  return (
    <section className="px-8 pb-24">
      <motion.div
        initial={{
          opacity: 0
        }}
        whileInView={{
          opacity: 1
        }}
        className="
          rounded-2xl
          bg-white
          p-8
          shadow
        "
      >
        <h2 className="text-2xl font-bold">
          Dashboard Preview
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-gray-100 p-6">
            <p className="text-gray-500">
              今日行程
            </p>

            <p className="mt-3 text-4xl font-bold">
              5
            </p>
          </div>

          <div className="rounded-xl bg-gray-100 p-6">
            <p className="text-gray-500">
              完成任務
            </p>

            <p className="mt-3 text-4xl font-bold">
              12
            </p>
          </div>

          <div className="rounded-xl bg-gray-100 p-6">
            <p className="text-gray-500">
              專注時間
            </p>

            <p className="mt-3 text-4xl font-bold">
              8h
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}