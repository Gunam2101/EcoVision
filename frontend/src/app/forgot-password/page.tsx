'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Leaf, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#05080E] text-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-md w-full glass-panel rounded-3xl border border-gray-800 p-8 shadow-2xl bg-[#090E17]/90 space-y-6">
        
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-black" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              EcoVision <span className="text-emerald-400">AI</span>
            </span>
          </Link>

          <h2 className="text-xl font-bold text-white">Reset Password</h2>
          <p className="text-xs text-gray-400 mt-1">
            Enter your email address to receive password reset instructions.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-sm font-bold text-white">Password Reset Email Sent!</h3>
            <p className="text-xs text-gray-400">
              We sent password recovery instructions to <strong className="text-emerald-400">{email}</strong>.
            </p>
            <Link
              href="/login"
              className="inline-block text-xs font-bold text-emerald-400 hover:underline pt-2"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-4 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="example@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#131B2A] border border-gray-800 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 text-black font-extrabold text-xs shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Send Reset Instructions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="text-center text-xs text-gray-400 pt-2">
          Remembered password?{' '}
          <Link href="/login" className="text-emerald-400 font-bold hover:underline">
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}
