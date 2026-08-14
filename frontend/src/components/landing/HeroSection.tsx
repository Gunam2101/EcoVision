'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play, CheckCircle2, Globe, Sparkles } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-[#070A0F]">
      
      {/* Radial Background Glow Accents */}
      <div className="gradient-glow top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>🌿 AI-POWERED SMART WASTE DETECTION</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              Detect. Recycle. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-400">
                Make Earth Better
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed">
              EcoVision AI uses advanced AI to detect recyclable materials in real-time and helps build a cleaner, greener and smarter tomorrow.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/detection"
                className="px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center gap-2.5 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => alert('Opening live vision studio demo...')}
                className="px-7 py-3.5 rounded-xl glass-panel hover:bg-gray-800/80 text-white font-bold text-sm border border-gray-800 transition-all flex items-center gap-2.5"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* 4 KPI Bottom Bar */}
            <div className="grid grid-cols-4 gap-4 pt-10 border-t border-gray-800/80">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">98.7%</div>
                <div className="text-[11px] text-gray-400 font-mono mt-0.5">Accuracy</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">50K+</div>
                <div className="text-[11px] text-gray-400 font-mono mt-0.5">Detections</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">120+</div>
                <div className="text-[11px] text-gray-400 font-mono mt-0.5">Materials</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">500+</div>
                <div className="text-[11px] text-gray-400 font-mono mt-0.5">Users</div>
              </div>
            </div>

          </div>

          {/* Right Visual 3D Globe + Floating Live Detection Glass Card (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* 3D Earth Globe Asset */}
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-emerald-600/30 via-teal-500/20 to-lime-400/20 border-2 border-emerald-500/40 p-6 flex items-center justify-center shadow-2xl animate-float">
              <Globe className="w-60 h-60 text-emerald-400/80 stroke-1" />
            </div>

            {/* Floating "Live Detection" Glass Card Overlay */}
            <div className="absolute -bottom-4 right-0 sm:right-4 w-72 glass-panel p-5 rounded-2xl border border-emerald-500/40 shadow-2xl bg-[#0B0F17]/90 backdrop-blur-xl space-y-3 z-20">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-white">Live Detection</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">YOLOv11</span>
              </div>

              {/* Detections List */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-900/80 border border-gray-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-gray-200">Plastic</span>
                  </div>
                  <span className="text-emerald-400 font-bold">Confidence 98%</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-900/80 border border-gray-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-gray-200">Metal</span>
                  </div>
                  <span className="text-amber-400 font-bold">Confidence 96%</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-900/80 border border-gray-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-gray-200">Paper</span>
                  </div>
                  <span className="text-blue-400 font-bold">Confidence 87%</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-900/80 border border-gray-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="text-gray-200">Glass</span>
                  </div>
                  <span className="text-purple-400 font-bold">Confidence 91%</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
