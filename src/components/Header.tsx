
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Zap, Shield, Phone } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Главная", href: "/" },
    { name: "Услуги", href: "/services" },
    { name: "Каталог", href: "/catalog" },
    { name: "О компании", href: "/about" },
    { name: "Блог", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Контакты", href: "/contacts" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-md border-b border-steel-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary" />
              <Zap className="h-4 w-4 text-electric-500 absolute -top-1 -right-1" />
            </div>
            <div>
              <span className="text-xl font-bold text-steel-800">ЭлектроБезопасность</span>
              <p className="text-xs text-steel-600 leading-none">Лаборатория и СИЗ</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary text-white"
                    : "text-steel-700 hover:text-primary hover:bg-steel-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Button & Mobile Menu */}
          <div className="flex items-center space-x-3">
            <a
              href="tel:+74959999999"
              className="hidden lg:flex items-center space-x-2 text-steel-700 hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium">+7 (495) 999-99-99</span>
            </a>
            
            <Link to="/profile">
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                Личный кабинет
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive(item.href)
                          ? "bg-primary text-white"
                          : "text-steel-700 hover:text-primary hover:bg-steel-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t border-steel-200 pt-4">
                    <Link to="/profile" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">Личный кабинет</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
