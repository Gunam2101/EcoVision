'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { History, Search, Download, FileText, Eye, Calendar, Camera } from 'lucide-react';
import Link from 'next/link';
import { getLiveLogs, DetectionRecord } from '@/utils/detectionStore';

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [logs, setLogs] = useState<DetectionRecord[]>([]);

  useEffect(() => {
    setLogs(getLiveLogs());
    const interval = setInterval(() => {
      setLogs(getLiveLogs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.material.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'ALL' || log.classification === filter;
    return matchesSearch && matchesFilter;
  });

  const exportPDFReport = () => {
    const reportContent = `=======================================================\n` +
      `      ECOVISION AI - LIVE DETECTION AUDIT REPORT       \n` +
      `=======================================================\n\n` +
      `Date Generated: ${new Date().toLocaleString()}\n` +
      `Total Logged Scans: ${logs.length}\n` +
      `AI Engine: YOLOv11 Tensor Core + OpenCV Reusable Engine\n\n` +
      `DETECTION LOG RECORDS:\n` +
      (filteredLogs.length > 0
        ? filteredLogs.map((l, i) => `${i+1}. [${l.classification}] ${l.material} | Confidence: ${l.confidence}% | Time: ${l.dateTime} | Offset: +${l.co2SavedKg} kg CO2`).join('\n')
        : 'No detection records found.') +
      `\n\n=======================================================\n` +
      `Certified by EcoVision AI Platform (http://localhost:3000)\n`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ecovision_live_detection_report_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["ID,Material,Classification,Confidence,Time,CO2 Saved (kg)"]
      .concat(filteredLogs.map(e => `${e.id},${e.material},${e.classification},${e.confidence}%,"${e.dateTime}",${e.co2SavedKg}`))
      .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ecovision_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#070A0F] text-gray-100 flex">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800/80 pb-6">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
              <History className="w-7 h-7 text-emerald-400" />
              Detection History
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Audit log record of actual live camera & upload detections.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportCSV}
              className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-xs font-bold text-gray-300 flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-emerald-400" /> Export CSV
            </button>
            <button
              onClick={exportPDFReport}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <FileText className="w-4 h-4" /> Export PDF Report
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="glass-panel p-4 rounded-2xl border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by item name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-900 border border-gray-800 text-xs text-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-emerald-500 font-mono"
            >
              <option value="ALL">All Items</option>
              <option value="REUSABLE">Reusable Items Only</option>
              <option value="NON_REUSABLE">Single-Use Items Only</option>
            </select>
          </div>
        </div>

        {/* History Table */}
        <div className="glass-panel rounded-2xl border border-gray-800 overflow-hidden">
          {filteredLogs.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-gray-800 space-y-3">
              <Camera className="w-12 h-12 text-emerald-400/50 mx-auto" />
              <h3 className="text-base font-bold text-white">No Detection Records Yet</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Start your camera in Live Detection Studio or upload an image to generate real classification logs.
              </p>
              <Link
                href="/detection"
                className="inline-block px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs"
              >
                Open Live Camera Studio
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-900/80 border-b border-gray-800 text-gray-400 font-mono uppercase">
                  <tr>
                    <th className="px-6 py-4">Item Name</th>
                    <th className="px-6 py-4">Classification</th>
                    <th className="px-6 py-4">Confidence</th>
                    <th className="px-6 py-4">Timestamp</th>
                    <th className="px-6 py-4">CO₂ Saved</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 text-gray-300">
                  {filteredLogs.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-900/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        {row.material}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded font-mono font-extrabold text-[10px] ${
                          row.classification === 'REUSABLE'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {row.classification}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-emerald-400">{row.confidence}%</td>
                      <td className="px-6 py-4 font-mono text-gray-400">{row.dateTime}</td>
                      <td className="px-6 py-4 font-mono font-bold text-emerald-400">+{row.co2SavedKg} kg</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
