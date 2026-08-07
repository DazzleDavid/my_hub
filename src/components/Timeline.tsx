import type { TimelineItem } from "@/types/timeline";


interface TimelineProps {
  items: TimelineItem[];
}


export default function Timeline({
  items,
}: TimelineProps) {
  return (
    <div className="relative mt-10">


      {/* Timeline 線 */}
      <div
        className="
          absolute
          bottom-0
          left-2
          top-2
          w-px
          bg-gray-300
        "
      />


      <div className="space-y-8">


        {items.map((item) => (

          <div
            key={item.title}
            className="
              relative
              flex
              items-start
            "
          >


            {/* 點點 */}
            <div
              className="
                absolute
                left-0
                top-1
                h-5
                w-5
                rounded-full
                border-4
                border-white
                bg-black
              "
            />



            {/* 右側內容 */}
            <div
              className="
                ml-8
                flex
                w-full
                flex-col
                gap-4

                md:flex-row
                md:items-start
                md:justify-between
                md:gap-8
              "
            >



              {/* 文字區 */}
              <div
                className="
                  flex
                  min-w-0
                  flex-col

                  sm:flex-row
                "
              >



                {/* 日期 */}
                <div
                  className="
                    w-auto
                    shrink-0
                    pt-1
                    mb-2

                    sm:mb-0
                    sm:w-36
                  "
                >

                  <p
                    className="
                      whitespace-nowrap
                      text-sm
                      text-gray-400
                    "
                  >
                    {item.date}
                  </p>

                </div>





                {/* 內容 */}
                <div
                  className="
                    min-w-0
                  "
                >



                  {/* 標題 + Role */}
                  <div
                    className="
                      flex
                      flex-wrap
                      items-baseline
                      gap-x-3
                      gap-y-1
                    "
                  >


                    <h2
                      className="
                        text-xl
                        font-bold
                        leading-tight
                        text-gray-900
                      "
                    >
                      {item.title}
                    </h2>



                    {
                      item.role && (
                        <p
                          className="
                            whitespace-nowrap
                            text-gray-600
                          "
                        >
                          {item.role}
                        </p>
                      )
                    }


                  </div>





                  {/* 描述 */}
                  {
                    item.description && (
                      <p
                        className="
                          mt-2
                          max-w-2xl
                          leading-relaxed
                          text-gray-500
                        "
                      >
                        {item.description}
                      </p>
                    )
                  }



                </div>



              </div>






              {/* 右側圖片 */}
              {
                item.image && (
                  <div
                    className="
                      flex
                      h-24
                      w-32
                      shrink-0
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-lg
                      border
                      border-gray-200
                      bg-white

                      md:h-28
                      md:w-40
                    "
                  >

                    <img
                      src={item.image}
                      alt={item.title}
                      className="
                        max-h-full
                        max-w-full
                        object-contain
                      "
                    />

                  </div>
                )
              }



            </div>


          </div>


        ))}


      </div>


    </div>
  );
}