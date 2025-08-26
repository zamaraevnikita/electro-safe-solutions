import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, HardHat, Eye, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ApplicationForm from "@/components/ApplicationForm";
import PageLoader from "@/components/PageLoader";

const ICONS = {
  Shield,
  Zap,
  HardHat,
  Eye,
  Wrench,
};

interface Item {
  id: number;
  name: string;
  description: string;
  price: number | null;
  type: "product" | "service";
  image?: string;
  icon?: string;
  features?: string[];
  short_description?: string; // Added for modal
  full_description?: string; // Added for modal
}

const Services = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalItem, setModalItem] = useState<any | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("items").select("*");
        if (error) throw error;
        setItems((data || []).filter((item: Item) => item.type === "service"));
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Добавляем функцию для скролла к форме
  const scrollToForm = () => {
    const form = document.getElementById("consultation-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Layout>
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

      {modalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setModalItem(null)}>
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-3 right-3 text-2xl text-steel-400 hover:text-primary" onClick={() => setModalItem(null)}>&times;</button>
            {modalItem.image && <img src={modalItem.image} alt={modalItem.name} loading="lazy" className="w-full h-48 object-cover rounded mb-4" />}
            <h2 className="text-2xl font-bold mb-2">{modalItem.name}</h2>
            <div className="text-lg text-primary font-semibold mb-2">{modalItem.price ? `${modalItem.price.toLocaleString()} ₽` : "по договоренности"}</div>
            <div className="prose prose-steel max-w-none mb-2" dangerouslySetInnerHTML={{ __html: modalItem.full_description || modalItem.description || "" }} />
            <Button className="w-full mt-4" onClick={() => { setModalItem(null); setTimeout(scrollToForm, 200); }}>Оставить заявку</Button>
          </div>
        </div>
      )}

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {loading ? (
              <PageLoader />
            ) : items.length === 0 ? (
              <div>Нет услуг</div>
            ) : (
              items.map((service) => {
                const Icon = service.icon && ICONS[service.icon as keyof typeof ICONS];
                return (
                  <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 border-steel-200 hover:border-primary overflow-hidden cursor-pointer" onClick={() => setModalItem(service)}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          {Icon && (
                            <div className="p-3 bg-electric-50 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                              <Icon className="h-6 w-6 text-primary group-hover:text-white" />
                            </div>
                          )}
                          <div>
                            <CardTitle className="text-xl text-steel-900 group-hover:text-primary transition-colors">
                              {service.name}
                            </CardTitle>
                            <div className="text-lg font-bold text-primary mt-1">
                              {service.price ? `${service.price.toLocaleString()} ₽` : "по договоренности"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 flex flex-col flex-1">
                      <CardDescription
                        className="prose prose-steel max-w-none min-h-[36px]"
                        dangerouslySetInnerHTML={{ __html: service.short_description || service.description || "" }}
                      />
                      {/* features (если появятся) */}
                      {service.features && Array.isArray(service.features) && service.features.length > 0 && (
                        <ul className="space-y-2">
                          {service.features.map((feature: string, featureIndex: number) => (
                            <li key={featureIndex} className="flex items-center space-x-2 text-sm">
                              <div className="w-2 h-2 bg-electric-500 rounded-full"></div>
                              <span className="text-steel-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <Button className="w-full mt-4" variant="outline" onClick={e => { e.stopPropagation(); scrollToForm(); }} type="button">
                        Заказать услугу
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </section>

      <section id="consultation-form" className="py-16 bg-steel-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <ApplicationForm 
              title="Получить консультацию"
              description="Оставьте заявку и наш специалист свяжется с вами в течение 30 минут"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
