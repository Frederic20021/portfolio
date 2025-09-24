import Image from 'next/image'

const philosophyItems = [
  {
    title: "働く人の夢を実現",
    description: "外国人の方々・グローバル人材まわりは働く人々の夢の実現の共明をしまさす。一人ひとりの希望に寄り添い、適適なキャリアを育づけるお手伝いをいたします"
  },
  {
    title: "日本企業の活性化", 
    description: "外国人材やICTの導入による変化への対応力で、日本の会社を元気にします。多様な視点・豊富な経験しがイノベーションをもたらし、企業の成長を促進します"
  },
  {
    title: "多文化共生社会の創造",
    description: "日本を多文化が共生できる社会にします。違う文書を持つ人と人が互いに理解し合い、力を発揮しあえる環境を創りあげます。"
  }
];

export default function PhilosophySection() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="md:text-[40px] text-2xl font-bold text-center text-blue-900 my-6">
          企業理念
        </h2>
        
        <div className="grid md:grid-cols-5 gap-8 items-center">
          {/* Text Content - Slide in from left */}
          <div className="space-y-12 animate-fade-in-left p-4 col-span-2">
            {philosophyItems.map((item, index) => (
              <div key={index} className="animate-fade-in-up text-center" style={{animationDelay: `${index * 1}s`}}>
                <h3 className="text-2xl font-bold text-blue-800 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Image Section - Slide in from right */}
          <div className="max-md:hidden relative animate-fade-in-right col-span-3">
            <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg overflow-hidden">
              {/* Placeholder for business meeting image */}
              <div className="w-full h-full">
                <Image
                  src="/hero/philosophy.jpeg"
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
