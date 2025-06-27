
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, FileCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const WorkProcessSection = () => {
  const steps = [
    {
      number: "01",
      icon: Phone,
      title: "Оставляете заявку",
      description: "Звоните по телефону, заполняете форму на сайте или пишете на email. Описываете ваши задачи и требования.",
      time: "5 минут",
      action: "Связаться с нами"
    },
    {
      number: "02",
      icon: Calendar,
      title: "Согласовываем детали",
      description: "Наш специалист свяжется с вами в течение 30 минут. Обсуждаем объем работ, сроки и стоимость.",
      time: "30 минут",
      action: "Получаем предложение"
    },
    {
      number: "03",
      icon: FileCheck,
      title: "Выполняем с протоколом",
      description: "Выезжаем на объект, проводим все необходимые измерения и испытания. Выдаем официальные протоколы.",
      time: "1-3 дня",
      action: "Получаем результат"
    }
  ];

  return (
    <section className="py-16 bg-steel-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-steel-900 mb-4">
            Как мы работаем
          </h2>
          <p className="text-xl text-steel-600 max-w-3xl mx-auto">
            Простой и прозрачный процесс сотрудничества. От заявки до получения 
            официальных протоколов всего за 3 шага.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative group">
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-steel-200 hover:border-primary bg-white">
                  <CardContent className="p-8 text-center h-full flex flex-col">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-8 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="mb-6 pt-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-electric-50 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                        <IconComponent className="h-8 w-8 text-primary group-hover:text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-steel-900 mb-3 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      
                      <p className="text-steel-600 leading-relaxed mb-4">
                        {step.description}
                      </p>
                      
                      <div className="inline-flex items-center space-x-2 text-primary font-medium mb-4">
                        <span className="text-sm">Время выполнения:</span>
                        <span className="bg-electric-100 px-2 py-1 rounded text-sm">
                          {step.time}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="text-sm text-steel-500 font-medium">
                      {step.action}
                    </div>
                  </CardContent>
                </Card>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="bg-white rounded-full p-2 shadow-md border border-steel-200">
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-electric-700 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Готовы начать сотрудничество?
          </h3>
          <p className="text-electric-100 text-lg mb-8 max-w-2xl mx-auto">
            Получите бесплатную консультацию и персональное предложение уже сегодня. 
            Наши специалисты ответят на все ваши вопросы.
          </p>
          
          <div className="flex justify-center">
            <Link to="/contacts">
              <Button size="lg" className="bg-white text-primary hover:bg-electric-50">
                <Phone className="mr-2 h-5 w-5" />
                Связаться с нами
              </Button>
            </Link>
          </div>
          
          <div className="mt-6 text-electric-200 text-sm">
            ☎️ +7 (495) 999-99-99 • 📧 info@sibenergocomplex.ru • Работаем 24/7
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcessSection;
