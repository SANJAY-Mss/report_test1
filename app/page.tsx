import { Header } from "@/components/landing/compute-template/Header";
import { HeroSection } from "@/components/landing/compute-template/HeroSection";
import { FeaturesSection } from "@/components/landing/compute-template/FeaturesSection";
import { ProcessSection } from "@/components/landing/compute-template/ProcessSection";
import { InfraSection } from "@/components/landing/compute-template/InfraSection";
import { MetricsSection } from "@/components/landing/compute-template/MetricsSection";
import { IntegrationsSection } from "@/components/landing/compute-template/IntegrationsSection";
import { SecuritySection } from "@/components/landing/compute-template/SecuritySection";
import { DevelopersSection } from "@/components/landing/compute-template/DevelopersSection";
import { TestimonialsSection } from "@/components/landing/compute-template/TestimonialsSection";
import { PricingSection } from "@/components/landing/compute-template/PricingSection";
import { CtaSection } from "@/components/landing/compute-template/CtaSection";
import { Footer } from "@/components/landing/compute-template/Footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white relative scroll-smooth overflow-x-hidden">
            <Header />
            <HeroSection />
            <FeaturesSection />
            <ProcessSection />
            <InfraSection />
            <MetricsSection />
            <IntegrationsSection />
            <SecuritySection />
            <DevelopersSection />
            <TestimonialsSection />
            <PricingSection />
            <CtaSection />
            <Footer />
        </main>
    );
}
