
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Shield, FileCheck, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesSection = () => {
  const services = [
    {
      icon: Zap,
      title: "Испытания электрооборудования",
      description: "Комплексные испытания трансформаторов, генераторов, электродвигателей и другого оборудования",
      features: ["По ГОСТ 50571", "Протоколы с печатью", "Выезд в день обращения"],
      price: "от 5 000 ₽"
    },
    {
      icon: Shield,
      title: "Измерения сопротивления изоляции",
      description: "Точные измерения изоляции кабелей, проводов и электроустановок с выдачей протоколов",
      features: ["Современное оборудование", "Быстрые результаты", "Рекомендации по ремонту"],
      price: "от 2 500 ₽"
    },
    {
      icon: FileCheck,
      title: "Протоколы и заключения",
      description: "Официальные документы для Ростехнадзора, энергонадзора и других контролирующих органов",
      features: ["Юридическая сила", "Быстрое оформление", "Архив документов"],
      price: "от 1 500 ₽"
    },
    {
      icon: Wrench,
      title: "Техническое обслуживание",
      description: "Плановое ТО электрооборудования, предупреждение аварийных ситуаций",
      features: ["Регулярные проверки", "Договор на год", "Скидки постоянным клиентам"],
      price: "от 15 000 ₽/мес"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-steel-900 mb-4">
            Услуги электролаборатории
          </h2>
          <p className="text-xl text-steel-600 max-w-3xl mx-auto">
            Полный спектр услуг для обеспечения электробезопасности на вашем предприятии. 
            Работаем по ГОСТ, имеем все необходимые лицензии.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-steel-200 hover:border-primary">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-electric-50 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                        <IconComponent className="h-6 w-6 text-primary group-hover:text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-steel-900 group-hover:text-primary transition-colors">
                          {service.title}
                        </CardTitle>
                        <div className="text-lg font-bold text-primary mt-1">
                          {service.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-steel-600 text-base">
                    {service.description}
                  </CardDescription>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-electric-500 rounded-full"></div>
                        <span className="text-steel-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/services">
                    <Button className="w-full mt-4" variant="outline">
                      Заказать услугу
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
