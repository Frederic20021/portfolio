import Image from "next/image";
import { serviceTypes } from "../../constants/services";
import ForeignFlow from "./ForeignFlow";

export default function Foreign() {

  return (
    <div>
      {/* Detailed Service 1 Section */}
      <section className="py-16 px-6 bg-gray-50" id="service1">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
            外国人材採用・雇用支援サービス詳細
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16 md:mx-12">
            {serviceTypes.map((serviceType) => (
              <div
                key={serviceType.id}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="text-center mb-6">
                  <h3
                    className={`text-2xl font-bold mb-2 ${serviceType.titleColor}`}
                  >
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
                  <h4
                    className={`font-bold text-lg ${serviceType.headerColor}`}
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

                <div className="mt-6 space-y-3">
                  <h4
                    className={`font-bold text-lg ${serviceType.headerColor}`}
                  >
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

          {/* Support Section */}
          <div className="py-20 px-6 text-black bg-white">
            <h2 className="sm:text-3xl text-lg font-semibold mb-12 text-center">サポート体制</h2>
            
            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-12">
              {/* Support 1: Document Translation & Visa Support */}
              <div className="bg-gray-50 rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 rounded-full p-4 mr-4">
                    <div className="text-4xl">📝</div>
                  </div>
                  <h3 className="text-xl font-bold text-blue-600">書類翻訳 & 在留資格サポート</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  外国人材採用に必要な各種書類の翻訳から申請手続きまで、専門の行政書士と連携し、トータルサポートします。
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 在留資格認定証明書交付申請代行</li>
                  <li>• 在留資格変更・更新申請代行</li>
                  <li>• 各種証明書類の翻訳サービス（日本語⇔外国語）</li>
                  <li>• 入管局との連絡・調整業務代行</li>
                  <li>• 申請状況の進捗管理・企業様への報告</li>
                </ul>
              </div>

              {/* Support 2: Business Manners & Training */}
              <div className="bg-gray-50 rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 rounded-full p-4 mr-4">
                    <div className="text-4xl">🎓</div>
                  </div>
                  <h3 className="text-xl font-bold text-green-600">ビジネス研修＆生活サポート</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  特定技能の人材向けに、各国人材・職種に合った登録支援機関と連携して、法定の義務的支援のサービスを提供します。
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 事前ガイダンス（労働条件・生活ルール等の説明）</li>
                  <li>• 出入国する際の送迎</li>
                  <li>• 住居確保・生活に必要な契約支援</li>
                  <li>• 公的手続き等への同行</li>
                  <li>• 日本語学習の機会の提供</li>
                  <li>• 定期的な面談・在留状況の確認</li>
                </ul>
              </div>

              {/* Support 3: Interpretation & Continuous Follow-up */}
              <div className="bg-gray-50 rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-orange-100 rounded-full p-4 mr-4">
                    <div className="text-4xl">🗣️</div>
                  </div>
                  <h3 className="text-xl font-bold text-orange-600">通訳・継続フォロー</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  言語の壁を解消し、企業様と外国人材の円滑なコミュニケーションをサポート。採用後の定着率向上に貢献いたします。
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 職場での通訳・翻訳サービス</li>
                  <li>• 企業様・外国人材間のコミュニケーション支援</li>
                  <li>• 生活面での相談・アドバイス提供</li>
                  <li>• トラブル発生時の迅速な対応・仲裁</li>
                  <li>• 定期的な面談・状況確認レポート</li>
                </ul>
              </div>
            </div>

            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">企業様向け総合サポートシステム</h3>
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                単なる「人材紹介」にとどまらず、企業様の採用課題に寄り添いながら、外国人材の定着と長期雇用を実現します。
                経験豊富な専門スタッフが、採用検討段階から入社後の定着支援まで、一貫してサポートいたします。
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-xl font-semibold text-blue-800">
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
