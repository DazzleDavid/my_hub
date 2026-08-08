import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center px-6 py-20 text-center">
      <div className="relative">
        <div className="select-none text-[clamp(9rem,25vw,20rem)] font-bold leading-none tracking-tighter text-gray-100">
          404
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gray-500">
            Page Not Found
          </p>
        </div>
      </div>

      <div className="mt-8 max-w-md">
        <p className="text-base leading-relaxed text-gray-500">
          你所尋找的頁面不存在，或可能已經被移動。
          <br />
          不妨回到首頁繼續探索。
        </p>
      </div>

      <Link
        to="/"
        className="group relative mt-10 overflow-hidden rounded-xl border border-black bg-white px-8 py-3 font-medium text-black shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
          Back to Home →
        </span>

        <span className="absolute inset-0 -translate-x-full bg-black transition-transform duration-500 ease-out group-hover:translate-x-0" />
      </Link>

    </main>
  );
}
