import { getAssetPath } from "@/app/utils/paths";

export default function Hero() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: `url(${getAssetPath("/recruitment/Hero.jpg")})`,
        }}
        className="relative text-white py-10 px-6 h-[400px] grid items-center bg-cover bg-center"
      >
        {/* Background overlay for opacity */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative font-bold z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-4 drop-shadow-lg break-words">
            世界と日本を繋ぐ、
            <span className="font-bold text-blue-800">人材ブリッジ</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto drop-shadow-md break-words">
            多様な人材と企業を結びつけ、国際社会での活躍を支援します。
          </p>
        </div>
      </section>

      
    </div>
  );
}
