import { useState } from "react";
import { useCart } from "@/hooks/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { useRef } from "react";
// Удаляю импорт framer-motion
// import { AnimatePresence, motion } from "framer-motion";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  company: "",
  message: "",
};

export default function CartModalContent() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // --- Undo logic ---
  const [pendingRemove, setPendingRemove] = useState<{ id: number; item: any; timer: any } | null>(null);
  const [fadingOutIds, setFadingOutIds] = useState<number[]>([]);
  const [fadeOutRemoveId, setFadeOutRemoveId] = useState<number | null>(null);
  const undoTimeout = useRef<any>(null);

  const handleRemove = (item: any) => {
    setFadingOutIds((ids) => [...ids, item.id]);
  };

  const handleTransitionEnd = (itemId: number, event?: React.TransitionEvent) => {
    if (event && event.propertyName !== 'opacity') return;
    if (fadingOutIds.includes(itemId)) {
      setFadingOutIds((ids) => ids.filter((id) => id !== itemId));
      setPendingRemove({
        id: itemId,
        item: cart.find((i) => i.id === itemId),
        timer: setTimeout(() => {
          setFadeOutRemoveId(itemId);
        }, 4000),
      });
    } else if (fadeOutRemoveId === itemId) {
      removeFromCart(itemId);
      setPendingRemove(null);
      setFadeOutRemoveId(null);
    }
  };

  const handleUndo = () => {
    if (pendingRemove?.timer) clearTimeout(pendingRemove.timer);
    setPendingRemove(null);
    setFadeOutRemoveId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const { data, error } = await supabase.from("applications").insert([
        {
          ...form,
          cart,
        },
      ]);
      if (error) throw error;
      setSuccess("Заявка успешно отправлена!");
      setForm(initialForm);
      clearCart();
    } catch (err: any) {
      setError("Ошибка отправки заявки. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  return (
    <div className="space-y-6">
      {cart.length === 0 && !pendingRemove ? (
        <div className="text-center text-steel-600">Корзина пуста</div>
      ) : (
        <div className="space-y-4">
          <ul className="divide-y divide-steel-200">
            {cart.map((item) => {
              if (pendingRemove?.id === item.id) {
                return (
                  <li
                    key={item.id}
                    className={`flex items-center justify-between py-2 rounded transition-all duration-700 fade-in-out ${fadeOutRemoveId === item.id ? "fade-in-out-leave" : ""}`}
                    onTransitionEnd={(e) => handleTransitionEnd(item.id, e)}
                  >
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img src={item.image} alt={item.name} loading="lazy" className="w-12 h-12 object-cover rounded" />
                      )}
                      <div>
                        <div className="text-sm text-steel-500">
                          {item.price ? `${item.price} ₽` : "по договоренности"}
                        </div>
                        <div className="text-xs text-steel-400">Товар удалён</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={handleUndo}>Вернуть</Button>
                  </li>
                );
              }
              return (
                <li
                  key={item.id}
                  className={`flex items-center justify-between py-2 rounded transition-all duration-700 fade-in-out ${fadingOutIds.includes(item.id) ? "fade-in-out-leave" : ""}`}
                  onTransitionEnd={(e) => handleTransitionEnd(item.id, e)}
                >
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img src={item.image} alt={item.name} loading="lazy" className="w-12 h-12 object-cover rounded" />
                    )}
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-steel-500">
                        {item.price ? `${item.price} ₽` : "по договоренности"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Math.max(1, Number(e.target.value)))}
                      className="w-16 text-center"
                    />
                    <Button variant="ghost" size="sm" onClick={() => handleRemove(item)}>
                      ✕
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-between items-center font-semibold text-lg">
            <span>Итого:</span>
            <span>{total ? `${total} ₽` : "по договоренности"}</span>
          </div>
          <Button variant="outline" onClick={clearCart} className="w-full">Очистить корзину</Button>
        </div>
      )}

      {/* Форма заявки */}
      <form className="space-y-3" onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder="Ваше имя*"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          name="phone"
          placeholder="Телефон*"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          placeholder="Email*"
          value={form.email}
          onChange={handleChange}
          required
          type="email"
        />
        <Input
          name="company"
          placeholder="Компания"
          value={form.company}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Комментарий к заявке"
          value={form.message}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 min-h-[60px]"
        />
        <Button type="submit" className="w-full" disabled={loading || cart.length === 0}>
          {loading ? "Отправка..." : "Оформить заявку"}
        </Button>
        {success && <div className="text-green-600 text-center mt-2">{success}</div>}
        {error && <div className="text-red-600 text-center mt-2">{error}</div>}
      </form>
    </div>
  );
} 