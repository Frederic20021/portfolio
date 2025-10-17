'use client';

import { useState } from 'react';
import { qaData } from '@/app/constants/english';
import Contact from './Contact';

export default function QandA() {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="pt-8 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">
            よくある質問
          </h2>
        </div>

        {/* Q&A Items */}
        <div className="space-y-4">
          {qaData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg cursor-pointer shadow-md overflow-hidden border border-gray-200"
            >
              {/* Question header */}
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left cursor-pointer flex items-center justify-between hover:bg-blue-50 focus:outline-none focus:bg-blue-50"
              >
                <div className="flex items-center gap-4">
                  {/* Q number circle */}
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    Q
                  </div>
                  {/* Question text */}
                  <span className="text-gray-800 font-medium">
                    {item.question}
                  </span>
                </div>
                {/* Plus/Minus icon */}
                <div className="flex-shrink-0 ml-4">
                  <span className="text-blue-600 text-xl font-bold">
                    {openItems.has(item.id) ? '−' : '+'}
                  </span>
                </div>
              </button>

              {/* Answer content */}
              {openItems.has(item.id) && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-start gap-4">
                      {/* A circle */}
                      <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        A
                      </div>
                      {/* Answer text */}
                      <p className="text-gray-700 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
          <Contact />
      </section>
  );
};