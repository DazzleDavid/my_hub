import { FaInstagram, FaFacebook, FaGithub, FaLinkedin, FaLine } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import profile from "@/assets/images/Profile.jpg";
import { sendMessage } from "@/services/contact/contactService";

const contacts = [
  { name: "Instagram", account: "david.wu.9.9", link: "https://www.instagram.com/david.wu.9.9/", icon: FaInstagram },
  { name: "Instagram", account: "_j.d.i.david_99", link: "https://www.instagram.com/_j.d.i.david_99/", icon: FaInstagram },
  { name: "Facebook", account: "吳哲瑋", link: "https://www.facebook.com/wu.zhe.wei.879096/", icon: FaFacebook },
  { name: "LINE", account: "吳哲瑋(J.D.I.哲哲)", link: "https://dazzledavid.github.io/my_hub/#/contact", icon: FaLine },
  { name: "GitHub", account: "DazzleDavid", link: "https://github.com/DazzleDavid", icon: FaGithub },
  { name: "LinkedIn", account: "LinkedIn Profile", link: "https://www.linkedin.com/in/%E5%93%B2%E7%91%8B-%E5%90%B3-b94a21427/", icon: FaLinkedin },
  { name: "Email", account: "david700707@gmail.com", link: "mailto:david700707@gmail.com", icon: MdEmail },
];
function ContactItem({ item }: { item: typeof contacts[number] }) {
  const Icon = item.icon;

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-w-0 items-center gap-4 border-l-2 border-gray-300 pl-5 transition hover:translate-x-2"
    >
      <Icon size={24} className="shrink-0 text-gray-700" />

      <div className="min-w-0 text-left">
        <p className="font-medium text-gray-900">
          {item.name}
        </p>

        <p className="truncate text-sm text-gray-500">
          {item.account}
        </p>
      </div>
    </a>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await sendMessage(form);

      alert("訊息已送出");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

    } catch (error) {
      console.error(error);
      alert("送出失敗");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">

      <section className="text-left">
        <h1 className="text-4xl font-bold text-gray-900">
          Contact
        </h1>

        <p className="mt-4 leading-relaxed text-gray-500">
          若有任何專案合作、技術交流或其他需求，可以透過以下方式與我聯繫。
        </p>

        <div className="mt-8 border-b border-gray-200" />
      </section>


      <section className="mt-12 grid grid-cols-1 gap-10 min-[580px]:grid-cols-[minmax(0,1fr)_224px] min-[580px]:items-center">

        <div className="grid min-w-0 grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-12">
          {contacts.map((item) => (
            <ContactItem
              key={item.account}
              item={item}
            />
          ))}
        </div>


        <div className="hidden h-56 w-56 shrink-0 min-[580px]:flex">
          <img
            src={profile}
            alt="profile"
            className="h-56 w-56 rounded-xl object-cover shadow-md"
          />
        </div>

      </section>


      <section className="my-24 border-y border-gray-200 py-20 text-center">

        <h2 className="text-3xl font-bold">
          Available Schedule
        </h2>

        <p className="mt-4 text-gray-500">
          這裡之後會放置行事曆，
          <br />
          顯示目前可安排的時間。
        </p>

        <div className="mt-8 rounded-xl border p-10 text-gray-400">
          Calendar Placeholder
        </div>

      </section>


      <section>

        <h2 className="text-3xl font-bold">
          Send Message
        </h2>


        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 max-w-xl space-y-6 text-left"
        >

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full rounded-lg border p-3 outline-none focus:border-black"
            />
          </div>


          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              type="email"
              placeholder="Your email"
              className="w-full rounded-lg border p-3 outline-none focus:border-black"
            />
          </div>


          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Subject <span className="text-red-500">*</span>
            </label>

            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              placeholder="Subject"
              className="w-full rounded-lg border p-3 outline-none focus:border-black"
            />
          </div>


          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Message <span className="text-red-500">*</span>
            </label>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Your message"
              className="w-full rounded-lg border p-3 outline-none focus:border-black"
            />
          </div>


          <button
            type="submit"
            className="
              group
              relative
              w-full
              overflow-hidden
              rounded-xl
              border
              border-black
              bg-black
              py-3
              font-medium
              text-white
              shadow-md
              transition-all
              duration-300
              md:bg-white
              md:text-black
              md:shadow-sm
              md:hover:-translate-y-1
              md:hover:shadow-lg
            "
          >

            <span
              className="
                relative
                z-10
                transition-colors
                duration-300
                md:group-hover:text-white
              "
            >
              {loading ? "Sending..." : "Submit"}
            </span>

            <span
              className="
                absolute
                inset-0
                hidden
                -translate-x-full
                bg-black
                transition-transform
                duration-500
                ease-out
                md:block
                md:group-hover:translate-x-0
              "
            />

          </button>

        </form>

      </section>

    </main>
  );
}