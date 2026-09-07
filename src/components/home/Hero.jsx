import HeroSlider from '@/components/home/HeroSlider';
import '@/styles/hero-editorial.css';


export default function Hero() {
  return (
    <section
      id="home-hero"
      className="mcoe-fade-hero-section"
    >
      <HeroSlider />
    </section>
  );
}
