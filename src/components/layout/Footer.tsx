const footerLinks = [
  {
    name: "Github",
    url: "https://github.com/DazzleDavid"
  },
  {
    name: "Email",
    url: "mailto:david700707@gmail.com"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/%E5%93%B2%E7%91%8B-%E5%90%B3-b94a21427/"
  }
];

type FooterProps = {
  compact?: boolean;
};

export default function Footer({ compact = false }: FooterProps) {
  if (compact) {
    return (
      <footer className="font-serif border-t bg-white px-6 py-6 text-center text-sm text-gray-500">
        © 2026 J.D.I.哲哲. All rights reserved.
      </footer>
    );
  }

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
                target="_blank"
                rel="noopener noreferrer"
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