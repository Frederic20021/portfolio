import Image from 'next/image'

const philosophyItems = [
  {
    title: "働く人の夢を実現",
    description: "外国人の方・グローバル人材をはじめ働く人々の\n夢の実現の後押しをします。一人ひとりの希望に寄り添い、\n最適なキャリアを見つけるお手伝いをいたします。"
  },
  {
    title: "日本企業の活性化", 
    description: "外国人材やICTの導入による変化への対応力で、\n日本の会社を元気にします。多様な視点・業務見直しが\nイノベーションをもたらし、企業の成長を促進します。"
  },
  {
    title: "多文化共生社会の創造",
    description: "日本と世界を繋いで、\n日本を多文化が共生できる社会にします。\n異なる背景を持つ人々が互いに尊重し、\n力を発揮し合える環境を創り上げます。"
  }
];

export default function PhilosophySection() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="md:text-[40px] text-2xl font-bold text-center text-blue-900 my-6">
          企業理念
        </h2>
        
        <div className="flex gap-4 justify-center items-center">
          {/* Text Content - Slide in from left */}
          <div className="space-y-2 animate-fade-in-left py-4 mb-4 justify-self-center">
            {philosophyItems.map((item, index) => (
              <div key={index} className="whitespace-pre-line animate-fade-in-up max-w-[350px] text-center" style={{animationDelay: `${index * 1}s`}}>
                <h3 className="font-extrabold text-blue-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Image Section - Slide in from right */}
          <div className="max-md:hidden relative animate-fade-in-right">
            <div className="max-w-[550px] h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg overflow-hidden">
              {/* Placeholder for business meeting image */}
              <div className="w-full h-full">
                <Image
                  src={'/hero/philosophy.jpeg'}
                  alt="Business Meeting"
                  width={600}
                  height={400}
                  className="w-full rounded-xl h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
