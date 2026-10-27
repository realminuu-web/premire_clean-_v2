import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBadges from '@/components/TrustBadges';
import About from '@/components/About';
import Team from '@/components/Team';
import CleaningProcess from '@/components/CleaningProcess';
import Services from '@/components/Services';
import ReviewsSection from '@/components/Reviews/ReviewsSection';
import InstagramSection from '@/components/Reviews/InstagramSection';
import FaqSection from '@/components/FaqSection';
import Contact from '@/components/Contact';
import FloatingActions from '@/components/FloatingActions';
import MobileStickyBar from '@/components/MobileStickyBar';
import Footer from '@/components/Footer';
import SiteTracker from '@/components/SiteTracker';
import StructuredData from '@/components/StructuredData';
import { ContentProvider } from '@/components/ContentProvider';
import { getContent, getPublicReviews } from '@/lib/content';
import { SectionId } from '@/types';

// 섹션 ID → 화면 조각 (순서와 보이기/숨기기는 관리자 페이지 [문구 수정] > [섹션]에서)
const SECTION_COMPONENTS: Record<SectionId, React.ComponentType> = {
  hero: Hero,
  trustBadges: TrustBadges,
  about: About,
  team: Team,
  process: CleaningProcess,
  services: Services,
  reviews: ReviewsSection,
  instagram: InstagramSection,
  faq: FaqSection,
  contact: Contact,
};

export default async function Home() {
  const [content, reviews] = await Promise.all([getContent(), getPublicReviews()]);
  const visibleSections = content.sectionOrder.filter((id) => content.visibility[id] !== false);

  return (
    <ContentProvider content={content} reviews={reviews}>
      <StructuredData content={content} />
      <div className="relative min-h-screen flex flex-col bg-white text-slate-900 pb-28 md:pb-0">
        <Header />

        <main className="flex-1">
          {visibleSections.map((sectionId) => {
            const Component = SECTION_COMPONENTS[sectionId];
            return Component ? <Component key={sectionId} /> : null;
          })}
        </main>

        <Footer />
        <FloatingActions />
        <MobileStickyBar />
        <SiteTracker sectionIds={visibleSections.map((id) => (id === 'trustBadges' ? 'trust' : id))} />
      </div>
    </ContentProvider>
  );
}
