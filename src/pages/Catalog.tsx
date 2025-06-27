import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Star, Search, Filter, Phone } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const categories = [
    { id: "all", name: "Все товары", count: 156 },
    { id: "gloves", name: "Диэлектрические перчатки", count: 24 },
    { id: "boots", name: "Диэлектрические боты", count: 18 },
    { id: "helmets", name: "Защитные каски", count: 15 },
    { id: "tools", name: "Изолирующие инструменты", count: 32 },
    { id: "indicators", name: "Указатели напряжения", count: 12 },
    { id: "mats", name: "Диэлектрические коврики", count: 8 },
    { id: "clothing", name: "Защитная одежда", count: 28 },
    { id: "glasses", name: "Защитные очки", count: 19 }
  ];

  const products = [
    {
      id: 1,
      name: "Перчатки диэлектрические ELSAFETY GL-1000",
      category: "gloves",
      price: 1250,
      oldPrice: 1450,
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=300&h=300&fit=crop",
      description: "Латексные перчатки класса 00 для работы до 1000В",
      features: ["ГОСТ 12.4.103-83", "Класс защиты 00", "Размеры 8-11", "Испытания 6кВ"],
      inStock: true,
      popular: true,
      discount: 14
    },
    {
      id: 2,
      name: "БОТЫ диэлектрические ELSAFE БД-1000",
      category: "boots",
      price: 3890,
      oldPrice: null,
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop",
      description: "Резиновые боты для электроустановок до 1000В",
      features: ["ГОСТ 13385-78", "Подошва НС", "Размеры 39-47", "Маслобензостойкие"],
      inStock: true,
      popular: false,
      discount: 0
    },
    {
      id: 3,
      name: "Каска защитная ИСТОК с диэлектрической вставкой",
      category: "helmets",
      price: 890,
      oldPrice: 1100,
      rating: 4.7,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=300&fit=crop",
      description: "ABS-пластик с диэлектрической защитой",
      features: ["ГОСТ 12.4.087", "Класс защиты G", "Регулируемый размер", "Вентиляция"],
      inStock: true,
      popular: true,
      discount: 19
    },
    {
      id: 4,
      name: "Указатель напряжения УНН-1М бесконтактный",
      category: "indicators",
      price: 4560,
      oldPrice: null,
      rating: 5.0,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=300&fit=crop",
      description: "Бесконтактный указатель напряжения 0.4-35кВ",
      features: ["Диапазон 0.4-35кВ", "LED индикация", "Звуковая сигнализация", "Самотестирование"],
      inStock: true,
      popular: false,
      discount: 0
    },
    {
      id: 5,
      name: "Очки защитные ВИЗИОН поликарбонат",
      category: "glasses",
      price: 420,
      oldPrice: 550,
      rating: 4.6,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=300&fit=crop",
      description: "Поликарбонатные линзы с UV защитой",
      features: ["ГОСТ 12.4.013", "UV400 защита", "Регулируемые дужки", "Антизапотевание"],
      inStock: false,
      popular: false,
      discount: 24
    },
    {
      id: 6,
      name: "Штанга оперативная ШО-35 изолирующая",
      category: "tools",
      price: 12450,
      oldPrice: null,
      rating: 4.9,
      reviews: 43,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop",
      description: "Оперативная штанга до 35кВ, длина 1.2-3.6м",
      features: ["ГОСТ 20494", "Эпоксидный стеклопластик", "Сертификат Ростеста", "Длина 1.2-3.6м"],
      inStock: true,
      popular: true,
      discount: 0
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-steel-50 via-white to-electric-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-steel-900 mb-6">
              Каталог средств индивидуальной защиты
            </h1>
            <p className="text-xl text-steel-600 leading-relaxed mb-8">
              Сертифицированные СИЗ для работы в электроустановках. 
              Все товары соответствуют ГОСТ и имеют необходимые сертификаты качества.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-electric-500 text-white px-4 py-2">Сертификаты ГОСТ</Badge>
              <Badge className="bg-steel-600 text-white px-4 py-2">Быстрая доставка</Badge>
              <Badge className="bg-primary text-white px-4 py-2">Гарантия качества</Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="space-y-6">
              {/* Search */}
              <div>
                <h3 className="text-lg font-semibold text-steel-900 mb-3">Поиск</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-steel-400 h-4 w-4" />
                  <Input
                    placeholder="Найти товар..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold text-steel-900 mb-3">Категории</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? "bg-primary text-white"
                          : "text-steel-700 hover:bg-steel-100"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-sm">({category.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-lg font-semibold text-steel-900 mb-3">Цена</h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input placeholder="От" type="number" />
                    <Input placeholder="До" type="number" />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    Применить
                  </Button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-steel-900">
                  Найдено товаров: {filteredProducts.length}
                </h2>
                <p className="text-steel-600">
                  {selectedCategory !== "all" && 
                    `Категория: ${categories.find(c => c.id === selectedCategory)?.name}`
                  }
                </p>
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Сортировать по" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">По популярности</SelectItem>
                  <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                  <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                  <SelectItem value="rating">По рейтингу</SelectItem>
                  <SelectItem value="name">По названию</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 bg-white border-steel-200 overflow-hidden">
                  <div className="relative">
                    <div className="aspect-square bg-steel-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.popular && (
                        <Badge className="bg-electric-500 text-white">
                          ХИТ
                        </Badge>
                      )}
                      {product.discount > 0 && (
                        <Badge variant="destructive">
                          -{product.discount}%
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge variant="secondary">
                          Под заказ
                        </Badge>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{product.rating}</span>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-steel-900 group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </CardTitle>
                    <p className="text-sm text-steel-600 line-clamp-2">
                      {product.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Features */}
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs bg-steel-100 text-steel-700 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Reviews */}
                    <div className="flex items-center space-x-2 text-sm text-steel-500">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-steel-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span>({product.reviews} отзывов)</span>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <div className="text-xl font-bold text-primary">
                          {product.price.toLocaleString()} ₽
                        </div>
                        {product.oldPrice && (
                          <div className="text-sm text-steel-500 line-through">
                            {product.oldPrice.toLocaleString()} ₽
                          </div>
                        )}
                      </div>
                      
                      <Link to="/contacts">
                        <Button size="sm" className="bg-primary hover:bg-electric-700">
                          <Phone className="h-4 w-4 mr-1" />
                          Заказать
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="border-steel-300">
                Показать ещё товары
              </Button>
            </div>
          </main>
        </div>
      </div>

      {/* Consultation CTA */}
      <section className="py-16 bg-steel-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto border border-steel-200">
            <div className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-steel-900 mb-4">
                Нужна помощь в выборе СИЗ?
              </h3>
              <p className="text-steel-600 mb-6 max-w-2xl mx-auto">
                Наши специалисты помогут подобрать средства защиты под ваши задачи 
                и требования безопасности. Консультация бесплатно.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-electric-700">
                  Получить консультацию
                </Button>
                <Button size="lg" variant="outline" className="border-steel-300">
                  Скачать каталог (PDF)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Catalog;
