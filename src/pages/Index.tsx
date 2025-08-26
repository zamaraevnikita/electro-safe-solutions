
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProductsSection from "@/components/ProductsSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import WorkProcessSection from "@/components/WorkProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => (
  <section className="py-8 bg-gradient-to-b from-steel-50 to-white">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-xl border border-steel-100 p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Часто задаваемые вопросы</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="q1">
            <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
              <HelpCircle className="inline-block mr-2 text-electric-500" />
              Какие услуги предоставляет электролаборатория?
            </AccordionTrigger>
            <AccordionContent className="bg-steel-50 rounded-xl px-4 py-3 mt-2">
              Мы проводим измерения и испытания электрооборудования до и выше 1000 В, испытания средств защиты, проверку заземления, тепловизионное обследование, поиск повреждений кабеля и многое другое.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
              <HelpCircle className="inline-block mr-2 text-electric-500" />
              Какие документы я получу после проведения испытаний?
            </AccordionTrigger>
            <AccordionContent className="bg-steel-50 rounded-xl px-4 py-3 mt-2">
              После завершения работ вы получите официальный протокол испытаний, оформленный по ГОСТ и ПТЭЭП, а также рекомендации по устранению выявленных недостатков (если есть).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
              <HelpCircle className="inline-block mr-2 text-electric-500" />
              Как часто нужно проводить испытания средств защиты?
            </AccordionTrigger>
            <AccordionContent className="bg-steel-50 rounded-xl px-4 py-3 mt-2">
              Периодичность испытаний зависит от типа СИЗ: диэлектрические перчатки — раз в 6 месяцев, боты и галоши — раз в 12 месяцев, указатели напряжения — раз в 12 месяцев. Мы всегда подскажем актуальные сроки.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q4">
            <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
              <HelpCircle className="inline-block mr-2 text-electric-500" />
              Можно ли заказать выезд электролаборатории на объект?
            </AccordionTrigger>
            <AccordionContent className="bg-steel-50 rounded-xl px-4 py-3 mt-2">
              Да, наши специалисты выезжают на объекты по всей России. Мы работаем как с юридическими, так и с частными лицами. Оставьте заявку — и мы согласуем удобное время.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q5">
            <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
              <HelpCircle className="inline-block mr-2 text-electric-500" />
              Какое оборудование используется для испытаний?
            </AccordionTrigger>
            <AccordionContent className="bg-steel-50 rounded-xl px-4 py-3 mt-2">
              Мы используем только современное, поверенное оборудование ведущих производителей: мегомметры, приборы для измерения сопротивления заземления, тепловизоры, испытательные установки и др.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex justify-center mt-8">
        <Link to="/contacts">
          <button className="bg-primary hover:bg-electric-700 text-white text-lg font-semibold rounded-xl px-8 py-4 shadow transition-colors">
            Остались вопросы?
          </button>
        </Link>
      </div>
    </div>
  </section>
);

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <AdvantagesSection />
      <WorkProcessSection />
      <TestimonialsSection />
      <FAQ />
    </Layout>
  );
};

export default Index;
