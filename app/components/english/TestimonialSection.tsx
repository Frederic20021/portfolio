'use client';

import Image from 'next/image';
import { testimonials } from '@/app/constants/english';

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
  testimonial: (typeof testimonials)[number];
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
      <div className="md:flex grid gap-4 mb-4">
        <div className="flex-shrink-0 md:grid md:w-[100px] justify-between">
          <div className="md:grid flex gap-2 mx-auto max-md:w-16 max-md:h-16 overflow-hidden">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
            <span className="text-center font-bold text-xs text-gray-500">
              {testimonial.name}
            </span>
          <div className='grid gap-2'>
              <span className="bg-gradient-to-r from-blue-400 to-blue-800 text-center p-2 font-bold mt-8 rounded-lg">
                担当講師
              </span>
              <span className="bg-gradient-to-r from-gray-600 to-black text-center p-2 font-bold rounded-lg">
                {testimonial.responsibleProf}
              </span>
            </div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2 text-gray-800">
            {testimonial.headline}
            <span className="ml-2 text-blue-500">›</span>
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            {testimonial.content}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 whitespace-pre-line">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;