import Image from "next/image";
import { serviceTypes, supportServices } from "../../constants/services";
import ForeignFlow from "./ForeignFlow";

export default function Foreign() {


  return (
    <div>
      {/* Detailed Service 1 Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" id="service1">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-blue-600">
            外国人材採用・雇用支援サービス詳細
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12 lg:mb-16">
            {serviceTypes.map((serviceType) => (
              <div
                key={serviceType.id}
                className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg"
              >
                <div className="text-center mb-4 sm:mb-6">
                  <h3
                    className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 ${serviceType.titleColor}`}
                  >
                    {serviceType.title}
                  </h3>
                  <Image
                    src={serviceType.image}
                    alt={serviceType.alt}
                    width={300}
                    height={200}
                    className="w-full max-w-[250px] sm:max-w-[300px] h-auto mx-auto rounded-lg"
                  />
                </div>

                <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  {serviceType.description}
                </p>

                <div className="space-y-3 sm:space-y-4">
                  <h4
                    className={`font-bold text-base sm:text-lg md:text-xl ${serviceType.headerColor}`}
                  >
                    {serviceType.fieldsTitle}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                    {serviceType.fields.map((field, index) => (
                      <span
                        key={index}
                        className={`${serviceType.bgColor} ${serviceType.textColor} px-2 sm:px-3 py-1 rounded text-center break-words`}
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                  <h4
                    className={`font-bold text-base sm:text-lg md:text-xl ${serviceType.headerColor}`}
                  >
                    {serviceType.servicesTitle}
                  </h4>
                  <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                    {serviceType.services.map((service, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                        <span className="break-words">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Support Section */}
          <div className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 text-black bg-white rounded-2xl">
            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 sm:mb-12 text-center">サポート体制</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto mb-8 sm:mb-12">
              {supportServices.map((support, index) => (
                <div 
                  key={support.id} 
                  className={`bg-gray-50 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 ${
                    index === 2 ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4 sm:mb-6">
                    <div className={`${support.bgColor} rounded-full p-3 sm:p-4 mb-3 sm:mb-0 sm:mr-4 flex-shrink-0`}>
                      <div className="text-2xl sm:text-3xl md:text-4xl">{support.emoji}</div>
                    </div>
                    <h3 className={`text-sm sm:text-lg md:text-xl font-bold ${support.titleColor} text-center sm:text-left break-words`}>
                      {support.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
                    {support.description}
                  </p>
                  <ul className="text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-2">
                    {support.services.map((service, serviceIndex) => (
                      <li key={serviceIndex}>• {service}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="text-center max-w-4xl mx-auto px-4">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">企業様向け総合サポートシステム</h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-700 mb-4 sm:mb-6">
                単なる「人材紹介」にとどまらず、企業様の採用課題に寄り添いながら、外国人材の定着と長期雇用を実現します。
                経験豊富な専門スタッフが、採用検討段階から入社後の定着支援まで、一貫してサポートいたします。
              </p>
              <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-blue-800">
                  「採用から定着まで」— 企業様の信頼されるパートナーとして、全力でサポートいたします。
                </p>
              </div>
            </div>
          </div>

          <ForeignFlow />
        </div>
      </section>
    </div>
  );
}
