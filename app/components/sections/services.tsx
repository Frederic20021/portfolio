import Link from "next/link"
import Image from "next/image"
import { services } from "@/app/constants/services";


export default function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-16" id="services">
          サービス内容
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link key={index} href={service.link} className="group cursor-pointer">
              <div className="bg-gray-100 h-34 rounded-lg mb-4 overflow-hidden group-hover:shadow-lg transition-shadow">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={500}
                  height={500}
                  className="object-cover transition-transform duration-300 transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3 text-center">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed text-center">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
