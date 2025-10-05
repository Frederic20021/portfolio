import Link from "next/link";
import { mainServices } from "@/app/constants/services";

export default function MainService() {

  return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 text-black bg-gray-50">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
         人材・職業紹介サービス
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
          {mainServices.map((service, index) => (
            <Link 
              key={service.id}
              href={`#${service.id}`} 
              className={`bg-white p-4 sm:p-6 md:p-8 rounded-2xl hover:translate-y-[-10px] sm:hover:translate-y-[-20px] transition-all duration-500 ease-out shadow hover:shadow-xl ${
                index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'
              }`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl flex flex-col sm:flex-row items-start sm:items-center font-semibold mb-3 sm:mb-4">
                <span className="mb-2 sm:mb-0 sm:mr-2">{service.title}</span>
                <span className="text-2xl sm:text-3xl md:text-4xl">{service.emoji}</span>
              </h3>
              <p className="mb-4 text-sm sm:text-base md:text-lg lg:text-xl indent-4 leading-relaxed">
                {service.description}
              </p>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-left">
                {service.features.map((feature, index) => (
                  <li className="text-xs sm:text-sm md:text-base break-words" key={index}>{feature}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>
  )
}
