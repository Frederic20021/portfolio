import Image from 'next/image'

type heroText = {
    title?: string;
    subtitle?: string;
}

export default function HeroSection({ heroText }: { heroText: heroText }) {
  return (
    <section className={`relative h-[500px] overflow-hidden`}>
      {/* Background with Mount Fuji and Pagoda */}
      <div className="absolute inset-0 opacity-40">
        <Image
            alt='HeroImage'
            src={"/hero/hero2.jpg"}
            fill
            sizes='100vw'
            className='object-cover '
            priority
            />
      </div>
      
      {/* Content */}
      <div className="whitespace-pre-line relative z-10 container top-8 mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <h1 className="md:text-5xl text-xl font-bold leading-12 text-white drop-shadow-lg">
          {heroText.title}
        </h1>
        <p className="md:text-lg font-bold max-w-4xl text-white drop-shadow-md">
          {heroText.subtitle}
        </p>
      </div>
    </section>
  )
}
