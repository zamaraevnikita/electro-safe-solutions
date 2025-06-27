
import { Link } from "react-router-dom";
import { Shield, Zap, Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-steel-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Shield className="h-8 w-8 text-electric-400" />
                <Zap className="h-4 w-4 text-electric-300 absolute -top-1 -right-1" />
              </div>
              <div>
                <span className="text-lg font-bold">ЭлектроБезопасность</span>
                <p className="text-xs text-steel-400">Лаборатория и СИЗ</p>
              </div>
            </div>
            <p className="text-steel-300 text-sm leading-relaxed">
              Комплексные решения по электробезопасности для промышленных предприятий. 
              Испытания, измерения, продажа СИЗ с 2010 года.
            </p>
            <div className="flex space-x-2">
              <span className="bg-electric-600 text-white px-2 py-1 rounded text-xs">
                Лицензия №12345
              </span>
              <span className="bg-steel-700 text-white px-2 py-1 rounded text-xs">
                ГОСТ-сертификат
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-electric-300">Разделы</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-steel-300 hover:text-electric-300 transition-colors">Услуги лаборатории</Link></li>
              <li><Link to="/catalog" className="text-steel-300 hover:text-electric-300 transition-colors">Каталог СИЗ</Link></li>
              <li><Link to="/about" className="text-steel-300 hover:text-electric-300 transition-colors">О компании</Link></li>
              <li><Link to="/contacts" className="text-steel-300 hover:text-electric-300 transition-colors">Контакты</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-electric-300">Услуги</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-steel-300">Испытания электрооборудования</li>
              <li className="text-steel-300">Измерения сопротивления изоляции</li>
              <li className="text-steel-300">Протоколы по ГОСТ</li>
              <li className="text-steel-300">Выездные работы 24/7</li>
              <li className="text-steel-300">Техническое обслуживание</li>
              <li className="text-steel-300">Продажа СИЗ</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-electric-300">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="h-4 w-4 text-electric-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium">+7 (495) 999-99-99</p>
                  <p className="text-steel-400 text-sm">Круглосуточно</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-electric-400 mt-0.5" />
                <div>
                  <p className="text-white">info@elektrosafety.ru</p>
                  <p className="text-steel-400 text-sm">Ответим в течение часа</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-electric-400 mt-0.5" />
                <div>
                  <p className="text-white">г. Москва, ул. Промышленная, 15</p>
                  <p className="text-steel-400 text-sm">Офис и лаборатория</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-4 w-4 text-electric-400 mt-0.5" />
                <div>
                  <p className="text-white">Пн-Пт: 8:00-18:00</p>
                  <p className="text-steel-400 text-sm">Вызовы 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-steel-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-steel-400 text-sm">
              © 2024 ЭлектроБезопасность. Все права защищены.
            </div>
            <div className="flex space-x-4 text-sm">
              <Link to="/privacy" className="text-steel-400 hover:text-electric-300 transition-colors">
                Политика конфиденциальности
              </Link>
              <Link to="/terms" className="text-steel-400 hover:text-electric-300 transition-colors">
                Публичная оферта
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
