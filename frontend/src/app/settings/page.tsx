'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Settings, Moon, Sparkles, Shield, Cpu, Camera, Globe, Lock } from 'lucide-react';

export default function SettingsPage() {
  const [animations, setAnimations] = useState(true);
  const [glassmorphism, setGlassmorphism] = useState(true);
  const [compact, setCompact] = useState(false);

  return (
    <div className="min-h-screen bg-[#070A0F] text-gray-100 flex">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl">
        
        {/* Header */}
        <div className="border-b border-gray-800/80 pb-6">
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
            <Settings className="w-7 h-7 text-emerald-400" />
            Application Settings
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Configure system appearance, vision engine parameters, and privacy options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sub Settings Menu */}
          <div className="glass-panel p-3 rounded-2xl border border-gray-800 space-y-1">
            <button className="w-full text-left px-4 py-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 font-bold text-xs flex items-center gap-3">
              <Moon className="w-4 h-4" /> Appearance
            </button>
            <button className="w-full text-left px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900 text-xs flex items-center gap-3">
              <Cpu className="w-4 h-4" /> AI Model Config
            </button>
            <button className="w-full text-left px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900 text-xs flex items-center gap-3">
              <Camera className="w-4 h-4" /> Camera Stream
            </button>
            <button className="w-full text-left px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900 text-xs flex items-center gap-3">
              <Shield className="w-4 h-4" /> Privacy & Security
            </button>
            <button className="w-full text-left px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900 text-xs flex items-center gap-3">
              <Globe className="w-4 h-4" /> Language & Region
            </button>
          </div>

          {/* Right Controls Area (3 Cols) */}
          <div className="glass-panel p-6 rounded-2xl border border-gray-800 lg:col-span-3 space-y-6">
            <h3 className="text-base font-bold text-white">Appearance & Interface Settings</h3>

            <div className="space-y-6 text-xs">
              
              {/* Theme Picker */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <div>
                  <div className="font-bold text-white text-sm">Theme Mode</div>
                  <div className="text-gray-400 mt-0.5">Select interface color theme preference</div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-bold">
                    Dark (Default)
                  </button>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <div>
                  <div className="font-bold text-white text-sm">Enable Animations</div>
                  <div className="text-gray-400 mt-0.5">Smooth page transitions and canvas glow micro-animations</div>
                </div>
                <input
                  type="checkbox"
                  checked={animations}
                  onChange={() => setAnimations(!animations)}
                  className="w-5 h-5 accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <div>
                  <div className="font-bold text-white text-sm">Glassmorphism Effects</div>
                  <div className="text-gray-400 mt-0.5">Translucent backdrop blur cards</div>
                </div>
                <input
                  type="checkbox"
                  checked={glassmorphism}
                  onChange={() => setGlassmorphism(!glassmorphism)}
                  className="w-5 h-5 accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">Language</div>
                  <div className="text-gray-400 mt-0.5">Application display language</div>
                </div>
                <select className="bg-gray-900 border border-gray-800 text-white rounded-xl px-3 py-2">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>

            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
