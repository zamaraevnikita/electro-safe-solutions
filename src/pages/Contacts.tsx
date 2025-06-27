
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    requestType: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Here you would typically send the data to your backend
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Телефон",
      content: "+7 (495) 999-99-99",
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
      content: "г. Москва, ул. Промышленная, 15",
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

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-steel-200">
              <h2 className="text-2xl font-bold text-steel-900 mb-6">
                Оставить заявку
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Ваше имя *"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="h-12"
                    required
                  />
                  <Input
                    placeholder="Название компании"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="h-12"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Телефон *"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="h-12"
                    required
                  />
                  <Input
                    placeholder="Email *"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="h-12"
                    required
                  />
                </div>
                
                <Select onValueChange={(value) => setFormData({...formData, requestType: value})}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Тип запроса" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service">Услуги электролаборатории</SelectItem>
                    <SelectItem value="equipment">Покупка СИЗ</SelectItem>
                    <SelectItem value="consultation">Консультация</SelectItem>
                    <SelectItem value="technical">Техническое обслуживание</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
                
                <Textarea
                  placeholder="Опишите ваш запрос подробнее..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="min-h-[120px]"
                />
                
                <Button type="submit" className="w-full h-12 bg-primary hover:bg-electric-700">
                  <Send className="mr-2 h-5 w-5" />
                  Отправить заявку
                </Button>
                
                <p className="text-xs text-steel-500 text-center">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    политикой конфиденциальности
                  </a>
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
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

              {/* Additional Info */}
              <div className="bg-gradient-to-r from-primary to-electric-600 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Экстренные вызовы</h3>
                <p className="text-electric-100 mb-4">
                  В случае аварийной ситуации наши специалисты готовы выехать 
                  на объект в кратчайшие сроки.
                </p>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span className="font-semibold">+7 (495) 999-99-99</span>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-steel-100 rounded-2xl p-6 text-center">
                <MapPin className="h-12 w-12 text-steel-400 mx-auto mb-3" />
                <p className="text-steel-600">
                  Интерактивная карта будет добавлена
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contacts;
