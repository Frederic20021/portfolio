export default function CTA() {
  return (
    <>
    {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center text-white bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            世界と日本をつなぐ新しいキャリアの第一歩を
          </h2>
          <p className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            あなたの未来を共に創り上げましょう。
          </p>
          <a 
            href="https://empowerandlink.com/contact" 
            target="_parent" 
            className="inline-block bg-white text-blue-600 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 text-sm sm:text-base md:text-lg transform hover:scale-105"
          >
            お問い合わせはこちら
          </a>
        </div>
      </section>
    </>
  )
}