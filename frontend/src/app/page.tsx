import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { WorkflowSection } from '@/components/landing/WorkflowSection';
import { StatsSection } from '@/components/landing/StatsSection';
import { FaqSection } from '@/components/landing/FaqSection';

export const metadata = {
  title: 'EcoVision AI - Autonomous Smart Waste Detection Platform',
  description: 'AI-powered waste classification and smart recycling platform utilizing YOLO object detection, carbon offset analytics, and enterprise microservices.',
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-darkBg text-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <WorkflowSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
