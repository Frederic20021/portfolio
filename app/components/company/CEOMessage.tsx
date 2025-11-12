import Image from "next/image";
import { ceoMessage } from "@/app/constants/heroText";

export default function CEOMessage() {
    return (
      <div className="bg-white py-8 mx-auto">
        <div className="container mx-auto px-4">
          {/* CEO Section */}
          <div className="mb-8">
            <h2 className="text-3xl text-black font-bold text-center mb-8">
              代表挨拶
            </h2>
            <div className="grid md:grid-cols-5 gap-8 justify-between items-center">
              <div className="md:col-span-2 text-center text-gray-700">
                <Image
                  src={"/hero/CEO.jpg"}
                  alt="CEO"
                  width={250}
                  height={250}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg mt-4">代表取締役社長</h3>
                <h4 className="text-xl font-bold text-blue-800">
                  {ceoMessage.name}
                </h4>
              </div>
              <div className="indent-4 p-4 md:col-span-3 max-w-[500px] text-gray-700 whitespace-pre-line">
                {ceoMessage.message.split("\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className={index > 0 ? "indent-4" : ""}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}