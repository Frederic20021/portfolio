import { pricePlan } from '@/app/constants/offshore';
import { FaGear, FaCheck } from 'react-icons/fa6';

export default function PricePlan() {
    return (
        <div 
            id="price-plan" 
            className="bg-[#CDE9FF] w-full py-10 grid justify-center gap-8">
            <div className="grid font-bold text-center gap-4">
                <span className="text-[#2778FA] text-lg">PRICE</span>
                <span className="text-[#111A24] font-black text-4xl">料金のご案内</span>
                <span className="bg-white border-2 border-[#2778FA] rounded px-6 py-2 text-[#2778FA] font-bold text-center text-lg mx-auto">
                    おすすめプラン一覧
                </span>
                <span className="text-[#111A24] font-black text-lg">プロジェクト規模・スキルに合わせて柔軟に選択可能！</span>
            </div>

            <div className='grid md:flex md:flex-wrap justify-center gap-4 mx-auto '>
                {pricePlan.map((plan, index) => (
                    <div 
                    key={index}
                    className='rounded-lg grid gap-2 h-[350px] font-semibold w-[250px] text-black justify-center bg-white border-[#2778FA] border-2 px-4 py-6'>
                        <div className='h-[80px] mb-2'>
                        <div className='flex items-center whitespace-pre-line text-left'>
                                <FaGear className='text-3xl text-[#2778FA]'/>
                                <span className='ml-2 text-sm leading-5'>{plan.title}</span>
                            </div>
                            <div className='text-center text-2xl'>
                            {plan.price}
                        </div>

                        <div 
                        className='bg-[#50A1FF] h-[30px] mx-auto text-center cursor-pointer text-white text-xs p-2 rounded-lg my-4'>
                            詳しくはご相談ください
                        </div>
                        </div>
                        <div className='grid gap-2'>
                        {plan.features.map((feature, fIndex) => (
                            <div 
                            key={fIndex}
                            className='flex text-sm bg-red-200'>
                                <FaCheck className='text-[#2778FA]'/>
                                <span className='ml-2 text-xs tracking-tight'>{feature}</span>
                            </div>
                        ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}