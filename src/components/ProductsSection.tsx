import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, HardHat, Eye, Wrench, Zap, Star, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number | null;
  type: "product" | "service";
  image?: string;
}

const ProductsSection = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("items").select("*");
        if (error) throw error;
        setItems((data || []).filter((item: Item) => item.type === "product"));
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

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
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {loading ? (
            <div>Загрузка...</div>
          ) : items.length === 0 ? (
            <div>Нет товаров</div>
          ) : (
            items.slice(0, 4).map((item) => (
              <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 bg-white border-steel-200 overflow-hidden p-2">
                <div className="relative">
                  <div className="aspect-[4/3] bg-steel-100 overflow-hidden rounded-md" style={{ minHeight: 120 }}>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                </div>
                <CardHeader className="pb-2 px-2">
                  <CardTitle className="text-base font-semibold text-steel-900 group-hover:text-primary transition-colors line-clamp-2">
                    {item.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 px-2 pb-2">
                  <CardDescription
                    className="prose prose-steel max-w-none text-xs line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                  <div className="flex items-center justify-between pt-1">
                    <div className="text-lg font-bold text-primary">
                      {item.price ? `${item.price.toLocaleString()} ₽` : "по договоренности"}
                    </div>
                    <Link to="/contacts">
                      <Button size="sm" className="bg-primary hover:bg-electric-700 px-2 py-1 text-xs h-8 min-w-0">
                        <Phone className="h-4 w-4 mr-1" />
                        Заказать
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        {!loading && items.length > 4 && (
          <div className="flex justify-center mt-8">
            <Link to="/catalog">
              <Button size="lg" className="bg-primary text-white px-8">Больше товаров</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
