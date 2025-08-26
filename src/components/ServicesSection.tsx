import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Zap, HardHat, Eye, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { useItems } from "@/hooks/useItems";

const ICONS = { Shield, Zap, HardHat, Eye, Wrench };

const ServicesSection = () => {
  const { items, loading } = useItems({ type: "service" });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-steel-900 mb-4">
            Услуги электролаборатории
          </h2>
          <p className="text-xl text-steel-600 max-w-3xl mx-auto">
            Полный спектр услуг для обеспечения электробезопасности на вашем предприятии. 
            Работаем по ГОСТ, имеем все необходимые лицензии.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
            <div>Загрузка...</div>
          ) : items.length === 0 ? (
            <div>Нет услуг</div>
          ) : (
            items.slice(0, 2).map((service) => {
              const Icon = service.icon && ICONS[service.icon as keyof typeof ICONS];
              return (
                <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 border-steel-200 hover:border-primary overflow-hidden">
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
                  <CardContent className="space-y-4">
                    <CardDescription
                      className="prose prose-steel max-w-none text-base"
                      dangerouslySetInnerHTML={{ __html: service.description }}
                    />
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
                    <Link to="/services">
                      <Button className="w-full mt-4" variant="outline">
                        Заказать услугу
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
        {!loading && items.length > 2 && (
          <div className="flex justify-center mt-8">
            <Link to="/services">
              <Button size="lg" className="bg-primary text-white px-8">Больше услуг</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
