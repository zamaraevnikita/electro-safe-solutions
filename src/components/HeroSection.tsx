import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

const HeroSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    requestType: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, email, requestType } = formData;
    const { error } = await supabase.from("applications").insert([
      { name, phone, email, request_type: requestType }
    ]);
    if (error) {
      console.error("Ошибка при отправке заявки:", error.message);
      alert("Ошибка при отправке заявки. Попробуйте позже.");
    } else {
      alert("Заявка успешно отправлена!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        requestType: ""
      });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-steel-50 via-white to-electric-50 py-16 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary">
                <Shield className="h-6 w-6" />
                <span className="font-semibold text-sm uppercase tracking-wide">
                  Электробезопасность с 2010 года
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-6xl font-bold text-steel-900 leading-tight">
                {/* Мобильный вариант: три строки */}
                <span className="block sm:hidden">
                  Комплексные<br />
                  решения по<br />
                  <span className="text-primary relative">электробезопасности
                    <Zap className="absolute -top-2 -right-8 h-8 w-8 text-electric-500" />
                  </span>
                </span>
                {/* Десктопный вариант: всё в одну строку */}
                <span className="hidden sm:inline">
                  Комплексные решения по <span className="text-primary relative">электробезопасности
                    <Zap className="absolute -top-2 -right-8 h-8 w-8 text-electric-500" />
                  </span>
                </span>
              </h1>
              
              <p className="text-xl text-steel-600 leading-relaxed">
                От испытаний электрооборудования до защиты персонала. 
                Профессиональные услуги электролаборатории и полный каталог СИЗ 
                для промышленных предприятий.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Лицензированная лаборатория",
                "Выезд специалиста 24/7",
                "Протоколы по ГОСТ",
                "Сертифицированные СИЗ"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-electric-500" />
                  <span className="text-steel-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contacts">
                <Button size="lg" className="bg-primary hover:bg-electric-700 text-white px-8">
                  Получить консультацию
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-steel-300">
                  Посмотреть услуги
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Lead Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-steel-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-steel-900 mb-2">
                Бесплатная консультация
              </h3>
              <p className="text-steel-600">
                Оставьте заявку и получите предложение в течение 30 минут
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="h-12"
                />
              </div>
              
              <div>
                <Input
                  placeholder="Телефон"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="h-12"
                />
              </div>
              
              <div>
                <Input
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="h-12"
                />
              </div>
              
              <div>
                <Select onValueChange={(value) => setFormData({...formData, requestType: value})}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Тип запроса" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service">Услуги электролаборатории</SelectItem>
                    <SelectItem value="equipment">Покупка СИЗ</SelectItem>
                    <SelectItem value="consultation">Консультация</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button type="submit" className="w-full h-12 bg-primary hover:bg-electric-700">
                Получить предложение
              </Button>
              
              <p className="text-xs text-steel-500 text-center">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  политикой конфиденциальности
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
