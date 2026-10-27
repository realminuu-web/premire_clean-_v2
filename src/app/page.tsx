import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBadges from '@/components/TrustBadges';
import About from '@/components/About';
import CleaningProcess from '@/components/CleaningProcess';
import Services from '@/components/Services';
import ReviewsSection from '@/components/Reviews/ReviewsSection';
import InstagramSection from '@/components/Reviews/InstagramSection';
import FaqSection from '@/components/FaqSection';
import Contact from '@/components/Contact';
import FloatingActions from '@/components/FloatingActions';
import MobileStickyBar from '@/components/MobileStickyBar';
import Footer from '@/components/Footer';
import { siteConfig } from '@/config/site';
import { SectionId } from '@/types';

// Registry mapping section IDs to React components
const SECTION_COMPONENTS: Record<SectionId, React.ComponentType> = {
  hero: Hero,
  trustBadges: TrustBadges,
  about: About,
  process: CleaningProcess,
  services: Services,
  reviews: ReviewsSection,
  instagram: InstagramSection,
  faq: FaqSection,
  contact: Contact,
};

export default function Home() {
  const sectionOrder = siteConfig.sectionOrder || [
    'hero',
    'trustBadges',
    'about',
    'process',
    'services',
    'reviews',
    'instagram',
    'faq',
    'contact',
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-white text-slate-900 pb-28 md:pb-0">
      {/* Fixed Sticky Header */}
      <Header />

      {/* Main Sections (site.ts의 sectionOrder 순서대로 자유자재 자동 동적 렌더링!) */}
      <main className="flex-1">
        {sectionOrder.map((sectionId) => {
          const Component = SECTION_COMPONENTS[sectionId];
          if (!Component) return null;
          return <Component key={sectionId} />;
        })}
      </main>

      {/* Footer */}
      <Footer />

      {/* Desktop Floating Actions & Scroll-to-Top */}
      <FloatingActions />

      {/* Mobile-Only 3-Part Smart Sticky Bottom Bar */}
      <MobileStickyBar />
    </div>
  );
}
