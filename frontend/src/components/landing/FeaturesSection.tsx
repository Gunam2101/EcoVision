import React from 'react';
import { Camera, Zap, Shield, BarChart3, Database, Cloud, RefreshCw, Cpu } from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: 'Real-time WebRTC Camera Stream',
    description: 'Direct high-framerate video inference straight from live webcams or industrial CCTV streams.',
    color: 'text-brand-500',
  },
  {
    icon: Cpu,
    title: 'YOLOv11 Tensor Engine',
    description: 'Sub-45ms latency object detection model trained on multi-class material segmentation.',
    color: 'text-skyAccent-500',
  },
  {
    icon: BarChart3,
    title: 'CO₂ Carbon Offset Analytics',
    description: 'Automated calculations quantifying greenhouse gas reduction per recycled waste item.',
    color: 'text-limeAccent-400',
  },
  {
    icon: Database,
    title: 'PostgreSQL Audit Ledger',
    description: 'Immutable detection records, confidence metrics, and spatial bounding box coordinates.',
    color: 'text-purple-400',
  },
  {
    icon: Shield,
    title: 'Enterprise Role-Based Control',
    description: 'Granular permissions for Administrators, Environmental Researchers, and Facility Operators.',
    color: 'text-emerald-400',
  },
  {
    icon: Cloud,
    title: 'Dockerized Microservices',
    description: 'Decoupled Next.js, Express, PostgreSQL, and FastAPI containers ready for Railway/Vercel.',
    color: 'text-amber-400',
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-darkBg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold text-brand-400 uppercase tracking-widest">
            Enterprise Features
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered for High-Throughput <br /> Smart Waste Facilities
          </p>
          <p className="text-gray-400 text-base">
            Everything needed to deploy, monitor, and scale automated recycling pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-8 rounded-2xl glass-panel-hover border border-gray-800 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
