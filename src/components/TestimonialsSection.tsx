
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { useTestimonials } from "@/hooks/useTestimonials";

const TestimonialsSection = () => {
  const { data: testimonials, isLoading } = useTestimonials();

  if (isLoading) return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center text-steel-600">Загрузка отзывов...</div>
    </section>
  );
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-steel-900 mb-4">
            Отзывы наших клиентов
          </h2>
          <p className="text-xl text-steel-600 max-w-3xl mx-auto">
            Более 500 компаний доверяют нам свою электробезопасность. 
            Читайте реальные отзывы от специалистов и руководителей.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="group hover:shadow-xl transition-all duration-300 border-steel-200 hover:border-primary bg-white">
              <CardContent className="p-6 h-full flex flex-col">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-electric-300" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < (testimonial.rating || 5)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-steel-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-steel-500 ml-2">
                    {(testimonial.rating || 5).toFixed(1)}
                  </span>
                </div>

                {/* Review Text */}
                <blockquote className="text-steel-700 leading-relaxed mb-6 flex-1">
                  "{testimonial.text}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center space-x-3 pt-4 border-t border-steel-100">
                  <Avatar className="h-12 w-12 bg-primary text-white">
                    <AvatarFallback className="bg-primary text-white font-semibold">
                      {testimonial.initials || (testimonial.author ? testimonial.author.split(' ').map(w => w[0]).join('').toUpperCase() : '?')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-steel-900">
                      {testimonial.author || testimonial.name}
                    </div>
                    <div className="text-sm text-steel-600">
                      {testimonial.position}
                    </div>
                    <div className="text-sm text-primary font-medium">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-steel-50 to-electric-50 rounded-2xl p-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-steel-700">Средний рейтинг</div>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-steel-700">Клиентов рекомендуют нас</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-steel-700">Соблюдение сроков</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
