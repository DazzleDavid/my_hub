import profile from "@/assets/images/profile.jpg";

import {
  Mail,
} from "lucide-react";


const skills = [
  "C++",
  "Python",
  "React",
  "TypeScript",
  "Node.js",
  "AI",
  "LabVIEW",
];


export default function Home() {

  return (
    <main
      className="
        mx-auto
        flex
        max-w-5xl
        flex-col
        items-center
        px-6
        py-20
        text-center
      "
    >


      {/* 照片 */}
      <img
        src={profile}
        alt="profile"
        className="
          h-40
          w-40
          rounded-full
          object-cover
          shadow-md
        "
      />



      {/* 名字 */}
      <h1
        className="
          mt-8
          text-5xl
          font-bold
          text-gray-900
        "
      >
        吳哲瑋
      </h1>



      {/* 身分 */}
      <p
        className="
          mt-3
          text-xl
          text-gray-600
        "
      >
        Computer Science and Information Engineering Master's student
      </p>



      {/* 作用名 / 職稱 */}
      <p
        className="
          mt-2
          text-lg
          font-medium
          text-gray-800
        "
      >
        Just Do It. | Software Developer | AI Enthusiast
      </p>




      {/* 自我介紹 */}
      <p
        className="
          mt-6
          max-w-2xl
          leading-relaxed
          text-gray-500
        "
      >
        目前專攻於資訊工程碩士，學習軟體設計與專案實踐，持續探索適合自己的工作模式。
        <br />
        我也熱愛攝影、閱讀與探索不同地方，透過觀察與學習累積經驗，拓展自己的視野。
      </p>




      {/* 社群 */}
      <div
        className="
          mt-8
          flex
          gap-5
        "
      >

        <a
          href="#"
          className="
            rounded-full
            border
            p-3
            transition
            hover:bg-gray-100
          "
        >
          <Mail size={22}/>
        </a>


        <a
          href="#"
          className="
            rounded-full
            border
            p-3
            transition
            hover:bg-gray-100
          "
        >
          <Mail size={22}/>
        </a>


        <a
          href="#"
          className="
            rounded-full
            border
            p-3
            transition
            hover:bg-gray-100
          "
        >
          <Mail size={22}/>
        </a>


      </div>





      {/* Skills */}
      <div
        className="
          mt-12
          flex
          flex-wrap
          justify-center
          gap-3
        "
      >

        {
          skills.map((skill)=>(
            <span
              key={skill}
              className="
                rounded-full
                bg-gray-100
                px-4
                py-2
                text-sm
                text-gray-700
              "
            >
              {skill}
            </span>
          ))
        }

      </div>



    </main>
  );
}