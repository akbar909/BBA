import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Gallery from '@/components/sections/Gallery';
import Testimonials from '@/components/sections/Testimonials';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <Gallery />
      <Testimonials />
      <Footer />
    </main>
  );
}