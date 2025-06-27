
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Award, Clock, Users, Shield, MapPin } from "lucide-react";

const AdvantagesSection = () => {
  const advantages = [
    {
      icon: Award,
      title: "Лицензии и сертификаты",
      description: "Работаем строго по ГОСТ. Имеем все необходимые лицензии Ростехнадзора и сертификаты соответствия.",
      stats: "Лицензия №12345"
    },
    {
      icon: Users,
      title: "Опытные специалисты",
      description: "Команда из 15+ аттестованных инженеров со средним опытом работы более 10 лет в электроэнергетике.",
      stats: "10+ лет опыта"
    },
    {
      icon: Clock,
      title: "Круглосуточная служба",
      description: "Экстренные выезды 24/7. Плановые работы в удобное для вас время, включая выходные дни.",
      stats: "Выезд за 2 часа"
    },
    {
      icon: Shield,
      title: "Гарантия качества",
      description: "Предоставляем гарантию на все виды работ. Страхование профессиональной ответственности до 5 млн ₽.",
      stats: "Гарантия 12 мес"
    },
    {
      icon: MapPin,
      title: "Широкая география",
      description: "Обслуживаем Москву и Московскую область. Возможны выезды в регионы при больших объемах работ.",
      stats: "500+ объектов"
    },
    {
      icon: CheckCircle,
      title: "Полный цикл услуг",
      description: "От измерений и испытаний до продажи СИЗ. Все необходимое для электробезопасности в одном месте.",
      stats: "2000+ товаров"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-steel-900 mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-xl text-steel-600 max-w-3xl mx-auto">
            Более 14 лет обеспечиваем электробезопасность промышленных предприятий. 
            Доверяют нам уже более 500 компаний по всей Московской области.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-steel-200 hover:border-primary">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-electric-50 rounded-full group-hover:bg-primary group-hover:text-white transition-colors mb-4">
                      <IconComponent className="h-8 w-8 text-primary group-hover:text-white" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-2">
                      {advantage.stats}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-steel-900 mb-3 group-hover:text-primary transition-colors">
                    {advantage.title}
                  </h3>
                  
                  <p className="text-steel-600 leading-relaxed">
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-steel-50 to-electric-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-steel-700">Довольных клиентов</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">5000+</div>
              <div className="text-steel-700">Выполненных измерений</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-steel-700">Техническая поддержка</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">14</div>
              <div className="text-steel-700">Лет на рынке</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
