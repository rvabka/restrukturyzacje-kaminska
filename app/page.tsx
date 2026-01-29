import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyUs from '@/components/WhyUs';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import RecentListings from '@/components/RecentListings';
import Map from '@/components/Map';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { client } from '@/src/sanity/client';
import { recentListingsQuery, ListingCard } from '@/src/sanity/queries';

export const revalidate = 60;

export default async function Home() {
  const listings: ListingCard[] = await client.fetch(recentListingsQuery);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <FAQ />
      <RecentListings listings={listings} />
      <Process />
      <Map />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
