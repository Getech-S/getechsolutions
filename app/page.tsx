import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { BentoServices } from "@/components/bento-services";
import { Labs } from "@/components/labs";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <BentoServices />
      <Labs />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
