import CarouselSection from "@/components/CarouselSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TodoSection from "@/components/TodoSection";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <TodoSection />
      <CarouselSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
