import React from 'react';

import Hero from '@/components/home/Hero';
import EducationLevels from '@/components/home/EducationLevels';
import LmsAppDownload from '@/components/home/LmsAppDownload';
import NewsSection from '@/components/home/NewsSection';
import ArticlesSection from '@/components/home/ArticlesSection';
import EventsSection from '@/components/home/EventsSection';
import Partners from '@/components/home/Partners';


export default function Home() {
  return (
    <div
      className="home-inner-clay
        bg-transparent
        [&>section]:!bg-transparent
      "
    >
      <Hero />
      <EducationLevels />
      <LmsAppDownload />
      <NewsSection />
      <ArticlesSection />
      <EventsSection />
      <Partners />
    </div>
  );
}
