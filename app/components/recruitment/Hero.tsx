
export default function Hero() {
  return (
      <div>
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: `url('/recruitment/Hero.jpg')`,
        }}
        className="relative text-white sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 h-[300px] md:h-[500px] flex items-center bg-cover bg-center"
      >
        {/* Background overlay for opacity */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative font-bold max-md:pt-[30px] z-10 w-full max-w-4xl mx-auto text-center">
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-3 sm:mb-4 md:mb-6 drop-shadow-lg break-words leading-tight">
            世界と日本を繋ぐ、
            <br className="block sm:hidden" />
            <span className="font-bold text-blue-400 sm:text-blue-800">人材の架け橋</span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl max-w-full sm:max-w-2xl mx-auto drop-shadow-md break-words leading-relaxed">
            多様な人材と企業を結びつけ、日本社会の活性化に寄与します。
          </p>
        </div>
      </section>

      </div>
  );
}