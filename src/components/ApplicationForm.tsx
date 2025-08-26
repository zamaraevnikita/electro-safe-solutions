import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface ApplicationFormProps {
  title?: string;
  description?: string;
  className?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  company: "",
  requestType: "",
  message: ""
};

export default function ApplicationForm({ 
  title = "Оставить заявку", 
  description = "Оставьте заявку и наш специалист свяжется с вами в течение 30 минут",
  className = "",
  onSuccess,
  onError
}: ApplicationFormProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.from("applications").insert([
        { 
          name: formData.name, 
          phone: formData.phone, 
          email: formData.email, 
          company: formData.company, 
          request_type: formData.requestType, 
          message: formData.message 
        }
      ]);
      
      if (error) throw error;
      
      // Успешная отправка
      setFormData(initialFormData);
      onSuccess?.();
      
      // Показываем уведомление пользователю
      alert("Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.");
      
    } catch (error: any) {
      const errorMessage = "Ошибка при отправке заявки. Попробуйте позже.";
      console.error("Ошибка при отправке заявки:", error);
      onError?.(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 border border-steel-200 ${className}`}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-steel-900 mb-2">
          {title}
        </h2>
        <p className="text-steel-600">
          {description}
        </p>
      </div>
      
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
        
        <Button type="submit" className="w-full h-12 bg-primary hover:bg-electric-700" disabled={loading}>
          <Send className="mr-2 h-5 w-5" />
          {loading ? "Отправка..." : "Отправить заявку"}
        </Button>
        
        <p className="text-xs text-steel-500 text-center">
          Нажимая кнопку, вы соглашаетесь с{" "}
          <a href="/privacy" className="text-primary hover:underline">
            политикой конфиденциальности
          </a>
        </p>
      </form>
    </div>
  );
} 