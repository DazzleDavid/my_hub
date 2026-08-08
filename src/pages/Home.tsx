import { useState } from "react";
import profile from "@/assets/images/Profile.jpg";
import LineModal from "@/components/LineModal";
import { FaInstagram, FaFacebook, FaGithub, FaLinkedin, FaLine, FaCamera } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const contacts = [
  { name: "Instagram", account: "david.wu.9.9", link: "https://www.instagram.com/david.wu.9.9/", icon: FaInstagram },
  { name: "Instagram", account: "_j.d.i.david_99", link: "https://www.instagram.com/_j.d.i.david_99/", icon: FaCamera },
  { name: "Facebook", account: "吳哲瑋", link: "https://www.facebook.com/wu.zhe.wei.879096/", icon: FaFacebook },
  { name: "LINE", account: "吳哲瑋(J.D.I.哲哲)", isQrCode: true, icon: FaLine },
  { name: "GitHub", account: "DazzleDavid", link: "https://github.com/DazzleDavid", icon: FaGithub },
  { name: "LinkedIn", account: "LinkedIn Profile", link: "https://www.linkedin.com/in/%E5%93%B2%E7%91%8B-%E5%90%B3-b94a21427/", icon: FaLinkedin },
  { name: "Email", account: "david700707@gmail.com", link: "mailto:david700707@gmail.com", icon: MdEmail },
];

const skills = ["C++", "Python", "React", "TypeScript", "Node.js", "AI", "LabVIEW"];

export default function Home() {
  const [showLineModal, setShowLineModal] = useState(false);

  return (
    <main className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center">
      <img src={profile} alt="profile" className="h-40 w-40 rounded-full object-cover shadow-md" />

      <h1 className="mt-8 text-5xl font-bold text-gray-900">吳哲瑋</h1>

      <p className="mt-3 text-xl text-gray-600">
        Computer Science and Information Engineering Master's student
      </p>

      <p className="mt-2 text-lg font-medium text-gray-800">
        Just Do It. | Software Developer | AI Enthusiast
      </p>

      <p className="mt-6 max-w-2xl leading-relaxed text-gray-500">
        目前專攻於資訊工程碩士，學習軟體設計與專案實踐，持續探索適合自己的工作模式。
        <br />
        我也熱愛攝影、閱讀與探索不同地方，透過觀察與學習累積經驗，拓展自己的視野。
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-5">
        {contacts.map((item) => {
          const Icon = item.icon;

          if (item.isQrCode) {
            return (
              <button
                key={item.account}
                type="button"
                onClick={() => setShowLineModal(true)}
                aria-label={`${item.name} ${item.account}`}
                className="rounded-full border p-3 transition hover:bg-gray-100"
              >
                <Icon size={22} />
              </button>
            );
          }

          return (
            <a
              key={item.account}
              href={item.link}
              target={item.link?.startsWith("mailto:") ? undefined : "_blank"}
              rel={item.link?.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              aria-label={`${item.name} ${item.account}`}
              className="rounded-full border p-3 transition hover:bg-gray-100"
            >
              <Icon size={22} />
            </a>
          );
        })}
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {skills.map((skill) => (
          <span key={skill} className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700">
            {skill}
          </span>
        ))}
      </div>

      <LineModal
        isOpen={showLineModal}
        onClose={() => setShowLineModal(false)}
      />
    </main>
  );
}