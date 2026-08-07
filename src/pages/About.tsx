import Timeline from "@/components/Timeline";

import NTUT_Logo from "@/assets/images/NTUT_Logo.jpg";
import NFU_Logo from "@/assets/images/NFU_Logo.jpg";


const education = [
    {
        date: "2026 - Present",
        title: "國立臺北科技大學",
        role: "資訊工程系 碩士",
        image: NTUT_Logo,
        description:
            "就讀資訊工程研究所，研究方向包含軟體工程、人工智慧與相關資訊技術。",
    },
    {
        date: "2022 - 2026",
        title: "國立虎尾科技大學",
        role: "資訊工程系 學士",
        image: NFU_Logo,
        description:
            "學習資料結構、演算法、軟體工程、網頁開發與系統設計。",
    },
];

const experiences = [
    {
        date: "2025-2026",
        title: "國立虎尾科技大學 畢業生聯合會",
        role: "會長",
        description:
            "協助畢業活動規劃與執行，負責團隊協調、工作分配及活動流程管理。",
    },

    {
        date: "2024",
        title: "國立虎尾科技大學 程式設計社群",
        role: "負責人",
        description:
            "負責社團活動規劃、資訊課程教學與團隊管理，協助社員學習程式設計與資訊技術。",
    },

    {
        date: "2018-2019",
        title: "臺北市立內湖高級工業職業學校 資訊研究社",
        role: "副社長",
        description:
            "參與資訊相關活動，負責寒輔營規劃與 LabVIEW 教學，培養程式設計與教學能力。",
    },

    {
        date: "2018-2019",
        title: "臺北市立內湖高級工業職業學校 機器人/電腦軟體設計職類",
        role: "選手",
        description:
            "負責機器人機構設計、3D 列印與自動化控制軟體開發。",
    },
];

const awards = [
    {
        date: "2025",
        title: "TUPC 程式設計競賽",
        role: "Gold Medal",
        description:
            "參與大專院校程式設計競賽並取得金牌。",
    },

    {
        date: "2024-2025",
        title: "ICPC Regional Contest",
        role: "Qualification",
        description:
            "兩次取得 ICPC 區域賽資格，累積團隊競賽與演算法解題經驗。",
    },

    {
        date: "2019",
        title: "工科技藝競賽",
        role: "優勝",
        description:
            "參與電腦軟體設計相關競賽，負責程式撰寫與系統開發。",
    },
];

export default function About() {
    return (
        <main
            className="
        mx-auto
        max-w-5xl
        px-6
        py-16
        text-left
      "
        >

            {/* 個人介紹 */}
            <section>

                <h1
                    className="
            text-4xl
            font-bold
            text-gray-900
          "
                >
                    About Me
                </h1>


                <p
                    className="
            mt-4
            max-w-3xl
            leading-relaxed
            text-gray-600
          "
                >
                    我是一名資訊工程學生，專注於軟體開發、
                    網頁技術與人工智慧相關領域。
                    喜歡透過程式解決問題，並持續累積專案開發經驗。
                </p>

            </section>



            {/* Education */}
            <section className="mt-16">

                <h2
                    className="
            text-3xl
            font-bold
            text-gray-900
          "
                >
                    Education
                </h2>


                <Timeline items={education} />

            </section>



            {/* 分隔線 */}
            <div className="my-16 border-t border-gray-200" />



            {/* Experience */}
            <section>

                <h2
                    className="
            text-3xl
            font-bold
            text-gray-900
          "
                >
                    Experience
                </h2>


                <Timeline items={experiences} />

            </section>



            {/* 分隔線 */}
            <div className="my-16 border-t border-gray-200" />



            {/* Awards */}
            <section>

                <h2
                    className="
            text-3xl
            font-bold
            text-gray-900
          "
                >
                    Awards
                </h2>


                <Timeline items={awards} />

            </section>


        </main>
    );
}