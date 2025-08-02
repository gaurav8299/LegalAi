import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import LegalCategories from "@/components/legal-categories";
import AiChatInterface from "@/components/ai-chat-interface";
import LegalResources from "@/components/legal-resources";
import StatisticsSection from "@/components/statistics-section";
import ResourcesSection from "@/components/resources-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <LegalCategories />
        <AiChatInterface />
        <LegalResources />
        <StatisticsSection />
        <ResourcesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
