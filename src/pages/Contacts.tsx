import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ApplicationForm from "@/components/ApplicationForm";

const Contacts = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Телефон",
      content: "+7 (999) 999-99-99",
      subtitle: "Круглосуточно для экстренных вызовов"
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@elektrosafety.ru",
      subtitle: "Ответим в течение часа"
    },
    {
      icon: MapPin,
      title: "Адрес",
      content: "г. Томск, где-то",
      subtitle: "Офис и лаборатория"
    },
    {
      icon: Clock,
      title: "Режим работы",
      content: "Пн-Пт: 8:00-18:00",
      subtitle: "Выездные работы 24/7"
    }
  ];

  return (
    <Layout>
      <div className="bg-gradient-to-br from-steel-50 to-electric-50 py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-steel-900 mb-4">
              Свяжитесь с нами
            </h1>
            <p className="text-xl text-steel-600 max-w-3xl mx-auto">
              Готовы ответить на ваши вопросы и предоставить профессиональную консультацию 
              по вопросам электробезопасности.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Contact Form + Нам доверяют */}
            <div className="flex flex-col h-full">
              <ApplicationForm 
                title="Оставить заявку"
                description="Оставьте заявку и наш специалист свяжется с вами в течение 30 минут"
              />
              {/* Блок "Нам доверяют" */}
              <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-steel-200 h-full flex flex-col justify-center min-h-[350px]">
                <h3 className="text-xl font-bold text-center mb-6">Нам доверяют</h3>
                <div className="grid grid-cols-2 grid-rows-2 gap-8 h-full items-center justify-items-center">
                  <div className="flex flex-col items-center">
                    <img src="/partners/tomsknipineft.png" alt="ТомскНИПИнефть" loading="lazy" className="max-h-[120px] object-contain mb-2" />
                    <span className="text-sm text-steel-800 text-center font-medium">ТомскНИПИнефть</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img src="/partners/tomskenergosbyt.png" alt="Томскэнергосбыт" loading="lazy" className="max-h-[120px] object-contain mb-2" />
                    <span className="text-sm text-steel-800 text-center font-medium">Томскэнергосбыт</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img src="/partners/rosneft.png" alt="Роснефть" loading="lazy" className="max-h-[120px] object-contain mb-2" />
                    <span className="text-sm text-steel-800 text-center font-medium">Роснефть</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img src="/partners/sibagro.png" alt="Сибагро" loading="lazy" className="max-h-[120px] object-contain mb-2" />
                    <span className="text-sm text-steel-800 text-center font-medium">Сибагро</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 h-full flex flex-col">
              <h2 className="text-2xl font-bold text-steel-900 mb-6">
                Контактная информация
              </h2>
              
              <div className="grid gap-4">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <Card key={index} className="border-steel-200 hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center space-x-3 text-lg">
                          <div className="p-2 bg-electric-50 rounded-lg">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <span className="text-steel-900">{info.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-steel-900 font-medium mb-1">{info.content}</p>
                        <p className="text-steel-600 text-sm">{info.subtitle}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Map - wide, no card, no extra padding */}
              <div className="flex-1 flex flex-col justify-end">
                <div className="rounded-2xl overflow-hidden shadow-lg mt-4">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=85.016307%2C56.519119&z=16&pt=85.016307,56.519119,pm2rdm"
                    width="100%"
                    height="350"
                    frameBorder="0"
                    allowFullScreen
                    title="Яндекс Карта"
                    style={{ minHeight: 300, display: "block" }}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contacts;
