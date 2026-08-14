'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ShieldCheck, Users, Database, Activity, Server, Settings, Cpu } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#070A0F] text-gray-100 flex">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800/80 pb-6">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-emerald-400" />
              Administrative Control Center
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              System health monitoring, microservices status, PostgreSQL database metrics, and user management.
            </p>
          </div>
        </div>

        {/* 4 Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="glass-panel p-5 rounded-2xl border border-gray-800 space-y-2">
            <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase">
              <span>Next.js Frontend</span>
              <Server className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-white">ONLINE</div>
            <span className="text-[11px] text-emerald-400 font-mono">Port 3000 • Ready</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-gray-800 space-y-2">
            <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase">
              <span>Express API Backend</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-white">HEALTHY</div>
            <span className="text-[11px] text-emerald-400 font-mono">Port 5000 • HTTP 200</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-gray-800 space-y-2">
            <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase">
              <span>FastAPI AI Service</span>
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-white">YOLOv11 Tensor</div>
            <span className="text-[11px] text-emerald-400 font-mono">Port 8000 • conf=0.05</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-gray-800 space-y-2">
            <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase">
              <span>PostgreSQL Database</span>
              <Database className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-white">CONNECTED</div>
            <span className="text-[11px] text-emerald-400 font-mono">Prisma ORM • 12 Models</span>
          </div>
        </div>

        {/* User Management List */}
        <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" /> System Accounts & Roles
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-900/60 border-b border-gray-800 text-gray-400 font-mono uppercase">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-gray-300">
                <tr className="hover:bg-gray-900/40">
                  <td className="px-4 py-3 font-bold text-white">System Administrator</td>
                  <td className="px-4 py-3 font-mono text-gray-400">admin@ecovision.ai</td>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-400">ADMIN</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">ACTIVE</span></td>
                </tr>
                <tr className="hover:bg-gray-900/40">
                  <td className="px-4 py-3 font-bold text-white">Guna M</td>
                  <td className="px-4 py-3 font-mono text-gray-400">gunamadhaiyan936@gmail.com</td>
                  <td className="px-4 py-3 font-mono font-bold text-blue-400">USER</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">ACTIVE</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
