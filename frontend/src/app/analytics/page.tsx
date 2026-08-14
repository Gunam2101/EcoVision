'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell
} from 'recharts';
import { BarChart3, TrendingUp, Award, Zap, Download } from 'lucide-react';
import axios from 'axios';

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    totalScans: 25430,
    totalObjectsDetected: 25430,
    totalRecyclableCount: 22480,
    totalCo2SavedKg: 5430.5,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/detection/stats');
        if (res.data?.data) {
          setStats((prev) => ({
            ...prev,
            ...res.data.data,
          }));
        }
      } catch (e) {}
    };
    fetchAnalytics();
  }, []);

  const weeklyTrendData = [
    { week: 'Week 1', reusable: 3200, singleUse: 420 },
    { week: 'Week 2', reusable: 4100, singleUse: 380 },
    { week: 'Week 3', reusable: 5400, singleUse: 310 },
    { week: 'Week 4', reusable: 6800, singleUse: 250 },
  ];

  const categoryDistribution = [
    { name: 'Mobiles & Electronics', count: 8500, color: '#10B981' },
    { name: 'Glass & Food Containers', count: 6200, color: '#3B82F6' },
    { name: 'Refillable Pens', count: 4800, color: '#F59E0B' },
    { name: 'Canvas Totes', count: 3900, color: '#8B5CF6' },
    { name: 'Single-Use Waste', count: 2030, color: '#EF4444' },
  ];

  return (
    <div className="min-h-screen bg-[#070A0F] text-gray-100 flex">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800/80 pb-6">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
              <BarChart3 className="w-7 h-7 text-emerald-400" />
              Advanced Analytics & Carbon Impact
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Detailed metrics on Reusable vs Single-Use item distributions and environmental offset.
            </p>
          </div>
        </div>

        {/* 3 Metric Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase">Total Items Classified</span>
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white font-mono">{stats.totalObjectsDetected.toLocaleString()}</div>
            <p className="text-xs text-emerald-400 font-mono font-bold">+14.2% month-over-month</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase">Reusable Rate</span>
              <Award className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white font-mono">88.4%</div>
            <p className="text-xs text-emerald-400 font-mono font-bold">High Reusability Efficiency</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase">Net CO₂ Offset Saved</span>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white font-mono">{stats.totalCo2SavedKg.toLocaleString()} kg</div>
            <p className="text-xs text-emerald-400 font-mono font-bold">+18.5% carbon emissions avoided</p>
          </div>

        </div>

        {/* Bar Chart Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="text-base font-bold text-white">Reusable vs Single-Use Trend</h3>
            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                  <XAxis dataKey="week" stroke="#9CA3AF" fontSize={11} />
                  <YAxis stroke="#9CA3AF" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0B0F17', borderColor: '#1F2937', borderRadius: '0.5rem', color: '#fff' }} />
                  <Bar dataKey="reusable" fill="#10B981" radius={[4, 4, 0, 0]} name="Reusable Items" />
                  <Bar dataKey="singleUse" fill="#EF4444" radius={[4, 4, 0, 0]} name="Single-Use Items" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="text-base font-bold text-white">Item Classification Volume</h3>
            <div className="space-y-3 pt-2">
              {categoryDistribution.map((item, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-gray-300">{item.name}</span>
                    <span className="font-mono text-emerald-400">{item.count.toLocaleString()} items</span>
                  </div>
                  <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden border border-gray-800">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(item.count / stats.totalObjectsDetected) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
