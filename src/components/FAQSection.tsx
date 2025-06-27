
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Phone } from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      question: "Какие документы нужны для проведения измерений?",
      answer: "Для проведения измерений вам понадобятся: техническая документация на оборудование, предыдущие протоколы измерений (если есть), схемы электроснабжения объекта. Наши специалисты помогут подготовить полный пакет документов на этапе согласования работ."
    },
    {
      question: "Как часто нужно проводить испытания электрооборудования?",
      answer: "Периодичность испытаний определяется требованиями ПТЭЭП и зависит от типа оборудования: силовые трансформаторы - 1 раз в 3 года, электродвигатели - 1 раз в 3 года, кабельные линии - 1 раз в 3-6 лет. Точные сроки определяются индивидуально исходя из условий эксплуатации."
    },
    {
      question: "Выдаете ли вы официальные протоколы?",
      answer: "Да, мы выдаем официальные протоколы измерений и испытаний, которые имеют юридическую силу и принимаются всеми контролирующими органами (Ростехнадзор, энергонадзор, Роспотребнадзор). Все протоколы оформляются строго по ГОСТ с печатью и подписями аттестованных специалистов."
    },
    {
      question: "Можете ли выехать в экстренном порядке?",
      answer: "Да, мы предоставляем услуги экстренного выезда 24/7. В случае аварийной ситуации наши специалисты могут выехать на объект в течение 2 часов. Стоимость экстренного выезда увеличивается на 50% в рабочее время и на 100% в ночное время и выходные дни."
    },
    {
      question: "Какие СИЗ вы рекомендуете для работы в электроустановках до 1000В?",
      answer: "Для работы в электроустановках до 1000В обязательны: диэлектрические перчатки (класс 00), диэлектрические боты, защитная каска, защитные очки. Дополнительно рекомендуем: указатели напряжения, диэлектрические коврики, инструмент с изолированными ручками."
    },
    {
      question: "Предоставляете ли вы гарантию на выполненные работы?",
      answer: "Да, мы предоставляем гарантию на все виды выполняемых работ сроком 12 месяцев. Если в течение гарантийного срока будут выявлены недостатки в нашей работе, мы устраним их бесплатно. Также у нас есть страхование профессиональной ответственности на сумму 5 млн рублей."
    },
    {
      question: "Можно ли заключить договор на регулярное обслуживание?",
      answer: "Конечно! Мы предлагаем договоры на комплексное техническое обслуживание электрооборудования с индивидуальным графиком работ. Постоянным клиентам предоставляем скидки до 15% и приоритетное обслуживание. Минимальный срок договора - 12 месяцев."
    },
    {
      question: "Сколько времени занимает проведение измерений?",
      answer: "Время проведения измерений зависит от объема и сложности работ: измерение сопротивления изоляции - от 2 часов, испытание силового трансформатора - 4-6 часов, комплексные измерения на подстанции - 1-2 дня. Точные сроки определяются после осмотра объекта."
    }
  ];

  return (
    <section className="py-16 bg-steel-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-electric-100 rounded-full mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-steel-900 mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="text-xl text-steel-600 max-w-3xl mx-auto">
            Ответы на основные вопросы о наших услугах, требованиях 
            и процедурах проведения измерений.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white border border-steel-200 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left py-6 hover:no-underline">
                  <span className="text-steel-900 font-semibold pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-steel-600 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto border border-steel-200">
            <h3 className="text-2xl font-bold text-steel-900 mb-3">
              Не нашли ответ на свой вопрос?
            </h3>
            <p className="text-steel-600 mb-6">
              Свяжитесь с нашими специалистами для получения подробной консультации. 
              Ответим на любые вопросы по электробезопасности.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-electric-700">
                <Phone className="mr-2 h-5 w-5" />
                Задать вопрос
              </Button>
              <Button size="lg" variant="outline" className="border-steel-300">
                Написать на email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
