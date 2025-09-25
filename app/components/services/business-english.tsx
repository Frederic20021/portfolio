import Image from 'next/image'
import { getAssetPath } from '../../utils/paths'

export default function BusinessEnglishSection() {
  return (
    <section className='w-screen'>
            <div className="absolute inset-0 ">
                <div className='bg-[#ffffff] h-[500px] absolute inset-0 opacity-70 z-10'>

                </div>
                <Image
                    alt='Business English'
                    src={getAssetPath('/hero/english-hero1.jpg')}
                    fill
                    className='object-cover object-[top_right]'
                    priority
                />
                {/* White overlay */}
                <div className="absolute inset-0 bg-white opacity-25"></div>
        </div>
    </section>
  )
}