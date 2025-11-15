import Link from "next/link";
import { mainServices } from "@/app/constants/services";

export default function MainService() {

  return (
      <section className="py-10 px-6 text-black bg-gray-50">
        <h2 className="sm:text-3xl text-lg font-bold text-center mb-12">
         人材・職業紹介サービス
        </h2>
        <div className="grid md:grid-cols-2 gap-10 md:mx-8">
          {mainServices.map((service, index) => (
            <Link 
              key={service.id}
              href={`#${service.id}`} 
              className={`bg-white max-sm:text-wrap p-8 rounded-2xl hover:translate-y-[-20px] transition-all duration-500 ease-out shadow hover:shadow-xl ${
                index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'
              }`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <h3 className="sm:text-2xl flex whitespace-pre items-center font-semibold mb-4">
                {service.title}
                <span className="sm:text-4xl ml-2">{service.emoji}</span>
              </h3>
              <p className="mb-4 text-sm md:text-lg indent-4 leading-relaxed">
                {service.description}
              </p>
              <ul className="list-disc list-inside space-y-2 text-left">
                {service.features.map((feature, index) => (
                  <li className="max-sm:text-xs" key={index}>{feature}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>
  )
}
