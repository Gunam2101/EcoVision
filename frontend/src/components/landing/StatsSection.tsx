import React from 'react';

const stats = [
  { label: 'Classification Precision', value: '99.4%', sub: 'mAP@0.5 score' },
  { label: 'Inference Latency', value: '< 45ms', sub: 'GPU Accelerated' },
  { label: 'Items Scanned', value: '125,000+', sub: 'Platform total' },
  { label: 'CO₂ Offset Quantified', value: '48.2 Tons', sub: 'Verified reduction' },
];

export const StatsSection = () => {
  return (
    <section className="py-20 bg-darkBg border-b border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((item, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl text-center border border-gray-800">
              <div className="text-3xl sm:text-5xl font-black text-white gradient-text tracking-tight mb-2">
                {item.value}
              </div>
              <div className="text-sm font-semibold text-gray-200">{item.label}</div>
              <div className="text-xs text-gray-500 mt-1 font-mono">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
