'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Trophy, Award, Medal, Crown, Sparkles, TrendingUp } from 'lucide-react';

const podiumTop3 = [
  { rank: 2, name: 'GreenLeaf', points: '4,250 pts', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', crown: '🥈' },
  { rank: 1, name: 'EcoWarrior', points: '5,430 pts', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', crown: '👑' },
  { rank: 3, name: 'RecyclePro', points: '3,870 pts', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', crown: '🥉' },
];

const leaderboardRows = [
  { rank: 4, name: 'NatureLover', points: '3,120 pts', detections: '310', accuracy: '98.4%' },
  { rank: 5, name: 'EarthSaver', points: '2,840 pts', detections: '280', accuracy: '97.9%' },
  { rank: 6, name: 'CleanPlanet', points: '2,120 pts', detections: '240', accuracy: '97.5%' },
  { rank: 7, name: 'GreenFuture', points: '1,890 pts', detections: '210', accuracy: '98.2%' },
];

export default function LeaderboardPage() {
  const [filter, setFilter] = useState<'WEEK' | 'MONTH' | 'ALL'>('WEEK');

  return (
    <div className="min-h-screen bg-[#070A0F] text-gray-100 flex">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800/80 pb-6">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
              <Trophy className="w-7 h-7 text-amber-400" />
              Sustainability Leaderboard
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Top global contributors driving carbon reduction and recycling volume.
            </p>
          </div>

          {/* Timeframe Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-900 border border-gray-800 text-xs">
            <button
              onClick={() => setFilter('WEEK')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                filter === 'WEEK' ? 'bg-emerald-500 text-black shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setFilter('MONTH')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                filter === 'MONTH' ? 'bg-emerald-500 text-black shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setFilter('ALL')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                filter === 'ALL' ? 'bg-emerald-500 text-black shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              All Time
            </button>
          </div>
        </div>

        {/* Top 3 Podium Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {podiumTop3.map((user) => (
            <div
              key={user.rank}
              className={`glass-panel p-6 rounded-3xl border text-center relative flex flex-col items-center justify-between transition-all hover:scale-105 ${
                user.rank === 1
                  ? 'border-amber-500/50 bg-gradient-to-b from-amber-500/10 via-gray-950 to-gray-900 shadow-2xl shadow-amber-500/10 md:-translate-y-4'
                  : 'border-gray-800 bg-gray-900/60'
              }`}
            >
              <div className="text-3xl mb-2">{user.crown}</div>
              
              <div className="relative mb-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className={`w-20 h-20 rounded-full object-cover border-4 ${
                    user.rank === 1 ? 'border-amber-400' : user.rank === 2 ? 'border-gray-400' : 'border-amber-700'
                  }`}
                />
                <span className={`absolute -bottom-2 right-1/2 translate-x-1/2 w-7 h-7 rounded-full text-xs font-black flex items-center justify-center ${
                  user.rank === 1 ? 'bg-amber-400 text-black' : 'bg-gray-800 text-white'
                }`}>
                  #{user.rank}
                </span>
              </div>

              <h3 className="text-lg font-black text-white">{user.name}</h3>
              <div className="text-xs font-mono font-extrabold text-emerald-400 mt-1 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                {user.points}
              </div>
            </div>
          ))}
        </div>

        {/* Full Leaderboard Table */}
        <div className="glass-panel rounded-2xl border border-gray-800 overflow-hidden">
          <div className="p-4 border-b border-gray-800 font-bold text-white text-sm">
            Global Rankings
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-900/80 border-b border-gray-800 text-gray-400 font-mono uppercase">
                <tr>
                  <th className="px-6 py-4">Rank</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Points</th>
                  <th className="px-6 py-4">Detections</th>
                  <th className="px-6 py-4 text-right">Accuracy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-gray-300">
                {leaderboardRows.map((row) => (
                  <tr key={row.rank} className="hover:bg-gray-900/40 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-gray-400">#{row.rank}</td>
                    <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-xs text-emerald-400">
                        👤
                      </div>
                      {row.name}
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-emerald-400">{row.points}</td>
                    <td className="px-6 py-4 font-mono">{row.detections}</td>
                    <td className="px-6 py-4 text-right font-mono text-emerald-400 font-bold">{row.accuracy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
