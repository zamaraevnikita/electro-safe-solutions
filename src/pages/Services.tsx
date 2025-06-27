
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, FileCheck, Wrench, Clock, Phone, CheckCircle } from "lucide-react";

const Services = () => {
  const services = [
    {
      id: 1,
      icon: Zap,
      title: "Испытания электрооборудования",
      description: "Комплексные испытания всех видов электрооборудования для обеспечения безопасности и соответствия нормам",
      price: "от 5 000 ₽",
      duration: "1-2 дня",
      includes: [
        "Испытания силовых трансформаторов",
        "Испытания электродвигателей",
        "Испытания генераторов",
        "Испытания распределительных устройств",
        "Протокол с заключением",
        "Рекомендации по эксплуатации"
      ],
      gost: "ГОСТ 50571-93"
    },
    {
      id: 2,
      icon: Shield,
      title: "Измерения сопротивления изоляции",
      description: "Точные измерения изоляции кабелей, проводов и электроустановок с использованием современного оборудования",
      price: "от 2 500 ₽",
      duration: "2-6 часов",
      includes: [
        "Измерение изоляции кабельных линий",
        "Измерение изоляции обмоток электромашин",
        "Измерение переходного сопротивления",
        "Оценка состояния изоляции",
        "Протокол измерений",
        "Прогнозирование ресурса"
      ],
      gost: "ГОСТ Р 50571.16-2007"
    },
    {
      id: 3,
      icon: FileCheck,
      title: "Протоколы и заключения",
      description: "Оформление официальных документов для контролирующих органов с юридической силой",
      price: "от 1 500 ₽",
      duration: "1-3 дня",
      includes: [
        "Протоколы измерений по ГОСТ",
        "Технические заключения",
        "Рекомендации по устранению нарушений",
        "Планы мероприятий",
        "Архивное хранение документов",
        "Дубликаты при необходимости"
      ],
      gost: "ГОСТ 50571"
    },
    {
      id: 4,
      icon: Wrench,
      title: "Техническое обслуживание",
      description: "Регулярное обслуживание электрооборудования для предотвращения аварийных ситуаций",
      price: "от 15 000 ₽/мес",
      duration: "по графику",
      includes: [
        "Плановые осмотры и проверки",
        "Профилактические работы",
        "Устранение мелких неисправностей",
        "Ведение технической документации",
        "Консультации по эксплуатации",
        "Приоритетное обслуживание"
      ],
      gost: "ПТЭЭП"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-steel-50 via-white to-electric-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-steel-900 mb-6">
              Услуги электролаборатории
            </h1>
            <p className="text-xl text-steel-600 leading-relaxed mb-8">
              Полный спектр услуг по электробезопасности: от измерений и испытаний 
              до технического обслуживания. Работаем по ГОСТ с выдачей официальных протоколов.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-electric-500 text-white px-4 py-2">Лицензия Ростехнадзора</Badge>
              <Badge className="bg-steel-600 text-white px-4 py-2">Аттестованные специалисты</Badge>
              <Badge className="bg-primary text-white px-4 py-2">Выезд 24/7</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.id} className="hover:shadow-xl transition-all duration-300 border-steel-200 hover:border-primary">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-electric-50 rounded-lg">
                          <IconComponent className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl text-steel-900">
                            {service.title}
                          </CardTitle>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-2xl font-bold text-primary">
                              {service.price}
                            </span>
                            <Badge variant="outline" className="text-steel-600">
                              {service.duration}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <CardDescription className="text-steel-600 text-base leading-relaxed">
                      {service.description}
                    </CardDescription>

                    <div>
                      <h4 className="font-semibold text-steel-900 mb-3">В услугу входит:</h4>
                      <ul className="space-y-2">
                        {service.includes.map((item, index) => (
                          <li key={index} className="flex items-center space-x-3">
                            <CheckCircle className="h-4 w-4 text-electric-500 flex-shrink-0" />
                            <span className="text-steel-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-steel-100">
                      <div className="text-sm text-steel-500">
                        Работы по {service.gost}
                      </div>
                      <Button className="bg-primary hover:bg-electric-700">
                        Заказать услугу
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Service */}
      <section className="py-16 bg-steel-50">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-electric-600 to-electric-700 rounded-2xl p-8 lg:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <Clock className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Экстренные выезды 24/7
              </h2>
              <p className="text-xl text-electric-100 mb-8 leading-relaxed">
                Аварийные ситуации требуют немедленного реагирования. Наши специалисты 
                готовы выехать на объект в любое время суток для проведения срочных измерений 
                и устранения неисправностей.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                  <div className="text-3xl font-bold mb-2">2 часа</div>
                  <div className="text-electric-200">Время выезда в экстренных случаях</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-electric-200">Круглосуточная диспетчерская</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-electric-200">Готовность к выезду</div>
                </div>
              </div>

              <Button size="lg" className="bg-white text-primary hover:bg-electric-50">
                <Phone className="mr-2 h-5 w-5" />
                Экстренный вызов: +7 (495) 999-99-99
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-steel-900 mb-4">
                Получить консультацию
              </h2>
              <p className="text-steel-600">
                Оставьте заявку и наш специалист свяжется с вами в течение 30 минут
              </p>
            </div>
            
            <Card className="border-steel-200">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-steel-700 mb-2">
                        Ваше имя *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Введите ваше имя"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-steel-700 mb-2">
                        Компания
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Название организации"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-steel-700 mb-2">
                        Телефон *
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-steel-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="example@company.ru"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-steel-700 mb-2">
                      Интересующая услуга
                    </label>
                    <select className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>Выберите услугу</option>
                      <option>Испытания электрооборудования</option>
                      <option>Измерения сопротивления изоляции</option>
                      <option>Протоколы и заключения</option>
                      <option>Техническое обслуживание</option>
                      <option>Экстренный вызов</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-steel-700 mb-2">
                      Комментарий
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Опишите ваши задачи и требования..."
                    ></textarea>
                  </div>
                  
                  <Button type="submit" className="w-full bg-primary hover:bg-electric-700" size="lg">
                    Отправить заявку
                  </Button>
                  
                  <p className="text-xs text-steel-500 text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
