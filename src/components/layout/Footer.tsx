const footerLinks = [
  {
    name: "Github",
    url: "#"
  },
  {
    name: "Email",
    url: "#"
  },
  {
    name: "LinkedIn",
    url: "#"
  }
];

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-5xl px-6 py-8 text-center">

        <h2 style={{ fontFamily: "Noto Serif TC" }} className="text-lg font-black">
          J.D.I.哲哲
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          記錄旅程、分享經驗、持續學習。
        </p>

        <div className="mt-6 flex justify-center gap-4 text-sm">
          {footerLinks.map((link, index) => (
            <div key={link.name} className="flex items-center gap-4">
              <a
                href={link.url}
                className="text-gray-600 transition-all duration-300 hover:-translate-y-1 hover:text-black hover:underline"
              >
                {link.name}
              </a>

              {index !== footerLinks.length - 1 && (
                <span className="text-gray-300">
                  |
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="font-serif mt-6 border-t pt-4 text-sm text-gray-400">
          © 2026 J.D.I.哲哲. All rights reserved.
        </div>

      </div>
    </footer>
  );
}