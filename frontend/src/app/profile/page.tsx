'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { User, Shield, Bell, Sliders, Mail, Phone, MapPin, Camera, Save, CheckCircle2 } from 'lucide-react';
import { getAuthUser, AuthUser } from '@/utils/authGuard';
import { getProfileAvatar } from '@/utils/avatarUtils';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'PROFILE' | 'SECURITY' | 'NOTIFICATIONS' | 'PREFERENCES'>('PROFILE');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    setUser(getAuthUser());
  }, []);

  const displayName = user?.fullName || 'User';
  const avatarUrl = getProfileAvatar(displayName, user?.avatarUrl);

  return (
    <div className="min-h-screen bg-[#070A0F] text-gray-100 flex">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800/80 pb-6">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
              <User className="w-7 h-7 text-emerald-400" />
              Profile & Account Settings
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Manage your registered name, credentials, and environmental preferences.
            </p>
          </div>

          {/* Sub Nav Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-900 border border-gray-800 text-xs">
            <button
              onClick={() => setActiveTab('PROFILE')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                activeTab === 'PROFILE' ? 'bg-emerald-500 text-black shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('SECURITY')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                activeTab === 'SECURITY' ? 'bg-emerald-500 text-black shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('NOTIFICATIONS')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                activeTab === 'NOTIFICATIONS' ? 'bg-emerald-500 text-black shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('PREFERENCES')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                activeTab === 'PREFERENCES' ? 'bg-emerald-500 text-black shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Preferences
            </button>
          </div>
        </div>

        {notice && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-4 h-4" /> {notice}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Avatar Card */}
          <div className="glass-panel p-6 rounded-2xl border border-gray-800 text-center space-y-4 bg-[#090E17]">
            <div className="relative w-28 h-28 mx-auto">
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-28 h-28 rounded-full object-cover border-4 border-emerald-500/50 shadow-2xl"
              />
              <button className="absolute bottom-0 right-0 p-2.5 rounded-full bg-emerald-500 text-black hover:bg-emerald-400 transition-colors shadow-lg">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h2 className="text-xl font-black text-white">{displayName}</h2>
              <span className="inline-block mt-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                Registered Eco Warrior
              </span>
            </div>

            <div className="pt-4 border-t border-gray-800/80 text-xs text-gray-400 space-y-2.5 text-left">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-400" /> Account: <strong className="text-white">{displayName}</strong>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" /> Status: Active Member
              </div>
            </div>

            <div className="pt-2 text-[11px] text-gray-500 font-mono">
              Member since 2026
            </div>
          </div>

          {/* Right Form Fields (2 Cols) */}
          <div className="glass-panel p-6 rounded-2xl border border-gray-800 lg:col-span-2 space-y-6 bg-[#090E17]">
            <h3 className="text-base font-bold text-white">Registered User Details</h3>

            <form className="space-y-4 text-xs">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Registered Full Name</label>
                  <input
                    type="text"
                    defaultValue={displayName}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Bio / Sustainability Goals</label>
                <textarea
                  rows={3}
                  defaultValue="Passionate about AI Smart Waste Classification, Carbon Footprint Reduction, and Environmental Automation."
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setNotice('Profile updated successfully!');
                  setTimeout(() => setNotice(null), 3000);
                }}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Save className="w-4 h-4" /> Save Profile Details
              </button>
            </form>
          </div>

        </div>

      </main>
    </div>
  );
}
