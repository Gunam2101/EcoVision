import React from 'react';
import Link from 'next/link';
import { Leaf, ArrowLeft, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#05080E] text-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full glass-panel rounded-3xl border border-gray-800 p-8 shadow-2xl text-center space-y-6 bg-[#090E17]/90">
        
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
          <AlertTriangle className="w-8 h-8 animate-bounce" />
        </div>

        <div>
          <h1 className="text-4xl font-black text-white font-mono">404</h1>
          <h2 className="text-lg font-bold text-gray-200 mt-1">Page Not Found</h2>
          <p className="text-xs text-gray-400 mt-2">
            The requested EcoVision AI route could not be found on this platform.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Dashboard
        </Link>

      </div>
    </div>
  );
}
