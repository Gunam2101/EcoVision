import React from 'react';
import Link from 'next/link';
import { Leaf, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-darkBg border-t border-gray-800/80 pt-16 pb-12 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-limeAccent-400 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">EcoVision AI</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Autonomous computer vision platform empowering smart cities and industrial facilities to automate waste sorting & maximize carbon offset metrics.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/detection" className="hover:text-brand-500 transition-colors">Real-time Vision AI</Link></li>
              <li><Link href="/dashboard" className="hover:text-brand-500 transition-colors">Analytics Dashboard</Link></li>
              <li><Link href="/history" className="hover:text-brand-500 transition-colors">Detection Logs</Link></li>
              <li><Link href="/admin" className="hover:text-brand-500 transition-colors">Admin Console</Link></li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Architecture</h4>
            <ul className="space-y-2.5 text-sm">
              <li><span className="hover:text-gray-300">Next.js 15 App Router</span></li>
              <li><span className="hover:text-gray-300">Node.js Express REST API</span></li>
              <li><span className="hover:text-gray-300">Python FastAPI + YOLOv11</span></li>
              <li><span className="hover:text-gray-300">PostgreSQL + Prisma ORM</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Connect</h4>
            <p className="text-xs text-gray-400 mb-3">Get the latest sustainability AI updates.</p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
              />
              <button className="bg-brand-600 hover:bg-brand-500 text-white font-medium text-xs px-4 py-2 rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="p-2 rounded-lg bg-gray-900 text-gray-400 hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-gray-900 text-gray-400 hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-gray-900 text-gray-400 hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800/60 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs">
          <p>© 2026 EcoVision AI Inc. All rights reserved.</p>
          <div className="flex items-center gap-1 mt-4 sm:mt-0">
            <span>Built with precision & passion for Hackathon 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
