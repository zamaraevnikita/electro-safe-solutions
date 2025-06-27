
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Award, Clock, CheckCircle, Zap } from "lucide-react";

const About = () => {
  const achievements = [
    { number: "14+", text: "лет на рынке" },
    { number: "500+", text: "выполненных проектов" },
    { number: "150+", text: "постоянных клиентов" },
    { number: "24/7", text: "техническая поддержка" }
  ];

  const advantages = [
    "Аттестованные специалисты с многолетним опытом",
    "Современное поверенное оборудование",
    "Все необходимые лицензии и сертификаты",
    "Работаем строго по ГОСТ и техническим регламентам",
    "Индивидуальный подход к каждому клиенту",
    "Гарантия на все виды выполняемых работ"
  ];

  return (
    <Layout>
      <div className="bg-gradient-to-br from-steel-50 to-electric-50 py-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-steel-900 mb-4">
              О компании ЭлектроБезопасность
            </h1>
            <p className="text-xl text-steel-600 max-w-3xl mx-auto">
              Мы специализируемся на комплексных решениях в области электробезопасности 
              с 2010 года, обеспечивая надежную защиту персонала и оборудования.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-steel-900">Наша миссия</h2>
              <p className="text-steel-600 leading-relaxed">
                Обеспечение максимального уровня электробезопасности на промышленных предприятиях 
                через профессиональные услуги электролаборатории и поставку качественных 
                средств индивидуальной защиты.
              </p>
              <p className="text-steel-600 leading-relaxed">
                Мы понимаем важность безопасности труда и стремимся предоставить нашим клиентам 
                не только качественные услуги, но и надежные решения, которые помогают предотвратить 
                несчастные случаи и обеспечить соответствие всем требованиям законодательства.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-steel-900">Наши принципы</h2>
              <div className="space-y-4">
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-electric-500 mt-0.5 flex-shrink-0" />
                    <span className="text-steel-700">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center p-6 border-steel-200">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-steel-600 text-sm">
                    {achievement.text}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Services Overview */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-steel-200">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-steel-900 mb-4">
                  Комплексный подход
                </h2>
                <p className="text-steel-600 mb-6">
                  Мы предоставляем полный спектр услуг в области электробезопасности: 
                  от проведения измерений и испытаний до поставки сертифицированных СИЗ. 
                  Это позволяет нашим клиентам работать с одним надежным партнером.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-electric-500" />
                    <span className="text-steel-700">Услуги электролаборатории</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-electric-500" />
                    <span className="text-steel-700">Продажа СИЗ</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-electric-500" />
                    <span className="text-steel-700">Консультационные услуги</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-electric-500" />
                    <span className="text-steel-700">Техническое сопровождение</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-electric-50 to-steel-50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-steel-900">Работаем для вас</h3>
                </div>
                <div className="space-y-3 text-steel-700">
                  <div>📞 Консультации: Пн-Пт 8:00-18:00</div>
                  <div>🚗 Выездные работы: круглосуточно</div>
                  <div>📋 Оформление документов: 1-2 дня</div>
                  <div>🏆 Гарантия на работы: 12 месяцев</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
