'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How does EcoVision AI achieve sub-45ms inference times?',
    a: 'We leverage Ultralytics YOLOv11 running on Python FastAPI with TensorRT/OpenCV optimization for edge execution, allowing real-time canvas overlays.',
  },
  {
    q: 'What categories of waste materials can the model identify?',
    a: 'The system classifies Plastic, Glass, Metal, Paper, Cardboard, Organic, E-Waste, Hazardous, and General Trash items with confidence scores.',
  },
  {
    q: 'Can EcoVision AI run inside Docker containers?',
    a: 'Yes! The platform is structured into decoupled microservices (Frontend, Express API, FastAPI AI Service, PostgreSQL DB) with multi-stage Dockerfiles and Docker Compose.',
  },
  {
    q: 'How are carbon savings (kg CO₂) calculated?',
    a: 'Each identified recyclable material class is mapped to standard EPA WARM factors for energy and emission offset savings.',
  },
];

export const FaqSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-darkBg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-xs font-bold text-limeAccent-400 uppercase tracking-widest">
            Frequently Asked Questions
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">
            Everything You Need To Know
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-gray-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between text-white font-semibold text-base focus:outline-none"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-brand-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-gray-400 border-t border-gray-800/60 pt-4 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
