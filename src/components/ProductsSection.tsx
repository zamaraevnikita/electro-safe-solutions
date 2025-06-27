
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, HardHat, Eye, Wrench, Zap, Star } from "lucide-react";

const ProductsSection = () => {
  const products = [
    {
      id: 1,
      name: "Диэлектрические перчатки",
      category: "Защита рук",
      price: "1 250 ₽",
      oldPrice: "1 450 ₽",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=300&fit=crop",
      description: "Класс защиты до 1000В, латексные, испытанные",
      features: ["GOST 12.4.103", "Класс 00", "Размеры 8-11"],
      inStock: true,
      popular: true
    },
    {
      id: 2,
      name: "Диэлектрические боты",
      category: "Защита ног",
      price: "3 890 ₽",
      oldPrice: null,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
      description: "Резиновые боты для работы в электроустановках до 1000В",
      features: ["ГОСТ 13385", "Подошва НС", "Размеры 39-47"],
      inStock: true,
      popular: false
    },
    {
      id: 3,
      name: "Защитные каски",
      category: "Защита головы",
      price: "890 ₽",
      oldPrice: "1 100 ₽",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      description: "Каски из ABS-пластика с диэлектрической вставкой",
      features: ["ГОСТ 12.4.087", "Класс G", "Регулируемый размер"],
      inStock: true,
      popular: true
    },
    {
      id: 4,
      name: "Указатели напряжения",
      category: "Измерительные приборы",
      price: "4 560 ₽",
      oldPrice: null,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      description: "Бесконтактные указатели напряжения 0.4-35кВ",
      features: ["УНН-1М", "LED + звук", "Самотестирование"],
      inStock: true,
      popular: false
    },
    {
      id: 5,
      name: "Защитные очки",
      category: "Защита глаз",
      price: "420 ₽",
      oldPrice: "550 ₽",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop",
      description: "Очки с поликарбонатными линзами от УФ и брызг",
      features: ["ГОСТ 12.4.013", "UV400", "Регулируемые дужки"],
      inStock: false,
      popular: false
    },
    {
      id: 6,
      name: "Изолирующие штанги",
      category: "Инструменты",
      price: "12 450 ₽",
      oldPrice: null,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
      description: "Оперативные штанги до 35кВ, длина 1.2-3.6м",
      features: ["ГОСТ 20494", "Эпоксидные", "Сертификат Ростеста"],
      inStock: true,
      popular: true
    }
  ];

  const categories = [
    { name: "Все товары", count: products.length, active: true },
    { name: "Защита рук", count: 12, active: false },
    { name: "Защита ног", count: 8, active: false },
    { name: "Защита головы", count: 15, active: false },
    { name: "Инструменты", count: 25, active: false },
    { name: "Приборы", count: 18, active: false }
  ];

  return (
    <section className="py-16 bg-steel-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-steel-900 mb-4">
            Каталог средств индивидуальной защиты
          </h2>
          <p className="text-xl text-steel-600 max-w-3xl mx-auto">
            Сертифицированные СИЗ для работы в электроустановках. 
            Все товары соответствуют ГОСТ и имеют необходимые сертификаты.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={category.active ? "default" : "outline"}
              size="sm"
              className={category.active ? "bg-primary" : "border-steel-300"}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 bg-white border-steel-200 overflow-hidden">
              <div className="relative">
                <div className="aspect-[4/3] bg-steel-100 overflow-hidden">
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
                      Популярный
                    </Badge>
                  )}
                  {product.oldPrice && (
                    <Badge variant="destructive">
                      Скидка
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
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-steel-900 group-hover:text-primary transition-colors">
                      {product.name}
                    </CardTitle>
                    <p className="text-sm text-steel-500">{product.category}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-steel-600">
                  {product.description}
                </CardDescription>

                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {product.features.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-steel-100 text-steel-700 px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {product.price}
                    </div>
                    {product.oldPrice && (
                      <div className="text-sm text-steel-500 line-through">
                        {product.oldPrice}
                      </div>
                    )}
                  </div>
                  
                  <Button
                    size="sm"
                    className={`${product.inStock ? 'bg-primary hover:bg-electric-700' : 'bg-steel-400'}`}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'В корзину' : 'Под заказ'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
