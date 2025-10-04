'use client';

import Image from 'next/image';
import { getAssetPath } from '../../utils/paths';

// Sample testimonial data based on the image
const testimonials = [
  {
    id: 1,
    name: '本橋IP法律事務所',
    title: '教育指導',
    rating: 5,
    headline: '自分の苦手な部分を克服することができました',
    content: 'いつも丁寧な指導をして頂き、有難うございます。先生との授業を通じて自分の苦手な部分を克服することができ、問題演習で間違えた点が、この様に...',
    course: '【GMARCH対策】高校受験対策コース',
    avatar: '/hero/avatar1.jpg' // Using existing image as placeholder
  },
  {
    id: 2,
    name: '高橋社長事務員',
    title: '教育指導',
    rating: 5,
    headline: '実務レベルの英語力が身につきました！',
    content: 'いつも丁寧な指導をして頂き、有難うございます。先生との授業を通じて自分の苦手な部分を克服することができ、問題演習で間違えた点が、この様に...',
    course: '【GMARCH対策】高校受験対策コース',
    avatar: '/hero/avatar2.jpg'
  },
  {
    id: 3,
    name: '国立大学生',
    title: '教育指導',
    rating: 5,
    headline: '表現方法などもきめて分かりやすかった！',
    content: 'いつも丁寧な指導をして頂き、有難うございます。先生との授業を通じて自分の苦手な部分を克服することができ、問題演習で間違えた点が、この様に...',
    course: '【GMARCH対策】高校受験対策コース',
    avatar: '/hero/avatar3.jpg'
  },
  {
    id: 4,
    name: '外国IT法務事務員',
    title: '教育指導',
    rating: 5,
    headline: '英語の理解をより深めることができました',
    content: 'いつも丁寧な指導をして頂き、有難うございます。先生との授業を通じて自分の苦手な部分を克服することができ、問題演習で間違えた点が、この様に...',
    course: '【GMARCH対策】高校受験対策コース',
    avatar: '/hero/avatar1.jpg'
  }
];

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
      <span className="ml-1 text-sm text-gray-600">{rating}</span>
    </div>
  );
};

// Individual testimonial card component
const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      {/* Header with badge and rating */}
      <div className="flex items-center justify-between mb-4">
        <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
          {testimonial.title}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">総合評価</span>
          <StarRating rating={testimonial.rating} />
        </div>
      </div>

      {/* Avatar and content */}
      <div className="flex gap-4 mb-4">
        <div className="flex-shrink-0 w-[100px]">
          <div className="grid mx-auto w-16 h-16 rounded-full overflow-hidden bg-blue-100">
            <Image
              src={getAssetPath(testimonial.avatar)}
              alt={testimonial.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Name */}
          <div className="text-center font-bold">
            <span className="text-xs text-gray-500">{testimonial.name}</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-sm lg:text-xl mb-2 text-gray-800">
            {testimonial.headline}
            <span className="ml-2 text-blue-500">›</span>
          </h3>
          <p className="text-gray-600 text-xs lg:text-lg leading-relaxed mb-3">
            {testimonial.content}
          </p>
          <p className="text-blue-500 text-xs lg:text-md font-medium">
            受けたコース：<span className='text-black font-bold'>{testimonial.course}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Main testimonials section component
const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">VOICE</h2>
          <p className="text-lg text-blue-600 font-medium">お客様の声</p>
        </div>

        {/* Testimonials grid - 1 column on mobile, 2 columns on tablet and above */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;