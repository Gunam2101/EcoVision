import React from 'react';
import { Upload, Cpu, BarChart2, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Capture or Upload',
    desc: 'Stream live webcam frames or upload high-resolution waste batch images directly.',
    icon: Upload,
  },
  {
    step: '02',
    title: 'YOLOv11 Inference',
    desc: 'FastAPI model classifies materials (Plastic, Glass, Metal, Paper, Organic) in sub-45ms.',
    icon: Cpu,
  },
  {
    step: '03',
    title: 'Metrics Calculation',
    desc: 'Compute recyclable status, eco scores, and carbon offset kg CO₂ savings per item.',
    icon: BarChart2,
  },
  {
    step: '04',
    title: 'Database Ledger & Export',
    desc: 'Store indexed detection history in PostgreSQL for compliance, CSV, & PDF reporting.',
    icon: CheckCircle2,
  },
];

export const WorkflowSection = () => {
  return (
    <section className="py-24 bg-gray-950 border-y border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold text-skyAccent-500 uppercase tracking-widest">
            Simple 4-Step Process
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How EcoVision AI Operates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-gray-800 relative space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-brand-500/40 font-mono">{item.step}</span>
                  <div className="p-3 rounded-xl bg-gray-900 border border-gray-800">
                    <Icon className="w-5 h-5 text-brand-500" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
