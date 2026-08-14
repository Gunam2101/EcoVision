'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Leaf, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#070A0F]/80 backdrop-blur-xl border-b border-gray-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              EcoVision <span className="text-emerald-400">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-gray-300">
            <Link href="/" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
              Home
            </Link>
            <a href="#features" className="hover:text-emerald-400 transition-colors">
              Features
            </a>
            <a href="#workflow" className="hover:text-emerald-400 transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">
              Pricing
            </a>
            <a href="#about" className="hover:text-emerald-400 transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">
              Contact
            </a>
          </div>

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#0B0F17] border-b border-gray-800 px-4 pt-2 pb-6 space-y-3 text-xs">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md font-semibold text-emerald-400 hover:bg-gray-800"
          >
            Home
          </Link>
          <a
            href="#features"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md font-semibold text-gray-300 hover:bg-gray-800"
          >
            Features
          </a>
          <a
            href="#workflow"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md font-semibold text-gray-300 hover:bg-gray-800"
          >
            How It Works
          </a>
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md font-bold text-center bg-emerald-500 text-black"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};
