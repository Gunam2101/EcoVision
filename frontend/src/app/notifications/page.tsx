'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Bell, CheckCircle2, AlertCircle, Info, Sparkles, Check } from 'lucide-react';

const mockNotifications = [
  { id: '1', title: 'New detection completed', desc: 'Plastic bottle detected with 98% confidence', time: '2 mins ago', unread: true, type: 'SUCCESS' },
  { id: '2', title: 'Weekly report generated', desc: 'Your monthly analytics report is ready for download', time: '1 hour ago', unread: true, type: 'INFO' },
  { id: '3', title: 'Achievement unlocked!', desc: 'You earned Green Champion badge for 5,000 kg CO₂ saved', time: '3 hours ago', unread: true, type: 'REWARD' },
  { id: '4', title: 'System update', desc: 'YOLOv11 model 2.1 is now live with higher mAP accuracy', time: '1 day ago', unread: false, type: 'SYSTEM' },
];

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-[#070A0F] text-gray-100 flex">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800/80 pb-6">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
              <Bell className="w-7 h-7 text-emerald-400" />
              Notifications Center
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Real-time platform alerts, model updates, and milestone achievements.
            </p>
          </div>

          <button className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-xs font-bold text-gray-300 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" /> Mark all as read
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {mockNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-2xl border transition-colors flex items-center justify-between ${
                notif.unread
                  ? 'glass-panel border-emerald-500/30 bg-emerald-500/5'
                  : 'glass-panel border-gray-800/60 opacity-80'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  notif.type === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-400' :
                  notif.type === 'REWARD' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {notif.type === 'REWARD' ? <Sparkles className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    {notif.title}
                    {notif.unread && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5">{notif.desc}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500 font-mono">{notif.time}</span>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
