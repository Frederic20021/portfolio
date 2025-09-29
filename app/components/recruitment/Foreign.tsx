import Image from "next/image";
import { serviceTypes } from '../../constants/services';
import ForeignFlow from "./ForeignFlow";

export default function Foreign() {
  
  return (
    <div>
      {/* Detailed Service 1 Section */}
      <section className="py-16 px-6 bg-gray-50" id="service1">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
            外国人材と日本企業のマッチング詳細
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {serviceTypes.map((serviceType) => (
              <div key={serviceType.id} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${serviceType.titleColor}`}>
                    {serviceType.title}
                  </h3>
                  <Image
                    src={serviceType.image}
                    alt={serviceType.alt}
                    width={300}
                    height={200}
                    className="mx-auto rounded-lg"
                  />
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {serviceType.description}
                </p>

                <div className="space-y-4">
                  <h4 className={`font-bold text-lg ${serviceType.headerColor}`}>
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

                <div className="mt-6 space-y-3">
                  <h4 className={`font-bold text-lg ${serviceType.headerColor}`}>
                    {serviceType.servicesTitle}
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {serviceType.services.map((service, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

            <ForeignFlow />
          
        </div>
        {/* Support Section */}
        <div className="py-20 px-6 text-black bg-white text-center">
          <h2 className="text-3xl font-semibold mb-12">サポート体制</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 bg-gray-50 rounded-xl shadow">
              <div className="text-4xl mb-2">📝</div>
              <p>書類翻訳 & 在留資格サポート</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow">
              <div className="text-4xl mb-2">🎓</div>
              <p>ビジネスマナー & 研修</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow">
              <div className="text-4xl mb-2">🗣️</div>
              <p>通訳・継続フォロー</p>
            </div>
          </div>
          <p className="mt-8 text-lg">
            「採用から定着まで」—
            信頼されるパートナーとして、全力でサポートいたします。
          </p>
        </div>
      </section>
    </div>
  );
}
