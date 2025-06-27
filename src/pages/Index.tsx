
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProductsSection from "@/components/ProductsSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import WorkProcessSection from "@/components/WorkProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <AdvantagesSection />
      <WorkProcessSection />
      <TestimonialsSection />
    </Layout>
  );
};

export default Index;
