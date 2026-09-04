import React from 'react';

import Hero from '@/components/home/Hero';
import AboutSection from '@/components/home/AboutSection';
import EducationLevels from '@/components/home/EducationLevels';
import NewsSection from '@/components/home/NewsSection';
import ArticlesSection from '@/components/home/ArticlesSection';
import EventsSection from '@/components/home/EventsSection';
import Gallery from '@/components/home/Gallery';
import Partners from '@/components/home/Partners';


export default function Home() {
  return (
    <div
      className="
        bg-[#FBF6EE]
        [&>section]:!bg-[#FBF6EE]
      "
    >
      <Hero />
      <AboutSection />
      <EducationLevels />
      <NewsSection />
      <ArticlesSection />
      <EventsSection />
      <Gallery />
      <Partners />
    </div>
  );
}