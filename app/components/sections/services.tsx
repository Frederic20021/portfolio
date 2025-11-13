import Link from "next/link"
import Image from "next/image"
import { services } from "@/app/constants/services";

export default function Services() {
  return (
    <section className="py-10 bg-gray-100 mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-16" id="services">
          サービス内容
        </h2>

        <div className="lg:flex gap-4 grid md:grid-cols-2 md:bg-blue-200 justify-items-center justify-center items-center max-w-4xl mx-auto">
          {services.map((service, index) => (
            <Link key={index} href={service.link} className="group cursor-pointer hover:translate-y-[-10px] transition-all bg-white max-w-[250px] rounded-lg">
              <div className="h-42 mb-4 overflow-hidden group-hover:shadow-lg transition-shadow rounded-t-lg">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={300}
                  height={300}
                  className="object-cover transition-transform duration-300 transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 my-4 text-center">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 px-4 leading-relaxed text-center mb-6">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
    </section>
  )
}
