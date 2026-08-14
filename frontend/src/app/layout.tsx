import './globals.css';
import React from 'react';
import { AiAssistant } from '@/components/ai/AiAssistant';

export const metadata = {
  title: 'EcoVision AI - Production Smart Waste & Recycling Platform',
  description: 'AI Powered Smart Waste Detection & Smart Recycling Platform utilizing YOLOv11 and Next.js 15 microservices.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#070A0F] text-gray-100 antialiased min-h-screen relative">
        {children}
        <AiAssistant />
      </body>
    </html>
  );
}
