'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Leaf,
  LayoutDashboard,
  Camera,
  History,
  BarChart3,
  Trophy,
  FileText,
  Bell,
  Settings,
  LogOut,
  Shield
} from 'lucide-react';
import { getAuthUser, clearAuthSession, AuthUser } from '@/utils/authGuard';
import { getProfileAvatar } from '@/utils/avatarUtils';

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const authUser = getAuthUser();
    if (!authUser && pathname !== '/login' && pathname !== '/register' && pathname !== '/forgot-password' && pathname !== '/') {
      router.push('/login');
    } else {
      setUser(authUser);
    }
  }, [pathname, router]);

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Live Detection', href: '/detection', icon: Camera },
    { label: 'History', href: '/history', icon: History },
    { label: 'Analytics', href: '/analytics', icon: BarChart3 },
    { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    { label: 'Reports', href: '/reports', icon: FileText },
    { label: 'Notifications', href: '/notifications', icon: Bell },
    { label: 'Settings', href: '/settings', icon: Settings },
    { label: 'Admin', href: '/admin', icon: Shield },
  ];

  const displayName = user?.fullName || 'User';
  const avatarUrl = getProfileAvatar(displayName, user?.avatarUrl);

  return (
    <aside className="w-64 bg-[#0B0F17] border-r border-gray-800/80 min-h-screen flex flex-col justify-between p-4 sticky top-0 h-screen z-40">
      
      {/* Brand Header */}
      <div>
        <Link href="/" className="flex items-center gap-3 px-3 py-3 mb-6 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            EcoVision <span className="text-emerald-400">AI</span>
          </span>
        </Link>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-md shadow-emerald-500/10 font-bold'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-gray-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile Pill at Bottom */}
      <div className="pt-4 border-t border-gray-800/80 space-y-3">
        <Link
          href="/profile"
          className="flex items-center gap-3 p-3 rounded-2xl bg-gray-900/90 border border-gray-800 hover:border-emerald-500/40 transition-colors group shadow-lg"
        >
          <div className="relative flex-shrink-0" style={{ width: '40px', height: '40px' }}>
            <img
              src={avatarUrl}
              alt={displayName}
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500/50 shadow-md"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0B0F17] rounded-full" />
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors truncate tracking-tight">
              {displayName}
            </div>
            <div className="text-[11px] text-emerald-400/90 font-semibold font-mono truncate">
              Registered Member
            </div>
          </div>
        </Link>

        <button
          onClick={() => clearAuthSession()}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
};
