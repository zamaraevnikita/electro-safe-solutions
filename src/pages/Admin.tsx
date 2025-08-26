import { useEffect, useState, ChangeEvent } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Zap, HardHat, Eye, Wrench, Star } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabaseClient";
import PageLoader from "@/components/PageLoader";

const ICONS = [
  { value: "Shield", label: "Щит", icon: Shield },
  { value: "Zap", label: "Молния", icon: Zap },
  { value: "HardHat", label: "Каска", icon: HardHat },
  { value: "Eye", label: "Очки", icon: Eye },
  { value: "Wrench", label: "Ключ", icon: Wrench },
];

interface Item {
  id: number;
  name: string;
  short_description?: string;
  full_description?: string;
  description: string; // legacy
  price: number | null;
  type: "product" | "service";
  image?: string;
  icon?: string;
  tags?: string[];
}

const emptyForm: Omit<Item, "id"> = {
  name: "",
  short_description: "",
  full_description: "",
  description: "",
  price: null,
  type: "product",
  image: "",
  icon: "",
  tags: [],
};

// --- ДОБАВИТЬ тип для отзыва ---
interface Testimonial {
  id: number;
  author: string;
  position: string;
  company: string;
  company_url?: string;
  text: string;
  rating: number;
  created_at?: string;
}

const emptyTestimonial: Omit<Testimonial, "id"> = {
  author: "",
  position: "",
  company: "",
  company_url: "",
  text: "",
  rating: 5,
};

export default function Admin() {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for applications
  const [applications, setApplications] = useState<any[]>([]);
  const [appsLoading, setAppsLoading] = useState(false);
  const [appsError, setAppsError] = useState<string | null>(null);

  // Auth state
  const [authUser, setAuthUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginLoading, setLoginLoading] = useState(false);

  // --- СОСТОЯНИЯ ДЛЯ ОТЗЫВОВ ---
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonialForm, setTestimonialForm] = useState(emptyTestimonial);
  const [testimonialEditingId, setTestimonialEditingId] = useState<number | null>(null);
  const [testimonialLoading, setTestimonialLoading] = useState(false);
  const [testimonialError, setTestimonialError] = useState<string | null>(null);

  // Check auth on mount
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setAuthUser(data.user);
      setAuthLoading(false);
    });
    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null);
    });
    return () => { listener?.subscription.unsubscribe(); };
  }, []);

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setAuthError(null);
    const { email, password } = loginForm;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
    setLoginLoading(false);
  };

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthUser(null);
  };

  // Fetch items
  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("items").select("*");
      if (error) throw error;
      setItems(data || []);
    } catch (e) {
      setError("Ошибка загрузки данных");
    } finally {
      setLoading(false);
    }
  };

  // Fetch applications from Supabase
  const fetchApplications = async () => {
    setAppsLoading(true);
    setAppsError(null);
    try {
      const { data, error } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      setApplications(data || []);
    } catch (e: any) {
      setAppsError(e.message || "Ошибка загрузки заявок");
    } finally {
      setAppsLoading(false);
    }
  };

  // --- ЗАГРУЗКА ОТЗЫВОВ ---
  const fetchTestimonials = async () => {
    setTestimonialLoading(true);
    setTestimonialError(null);
    try {
      const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      setTestimonials(data || []);
    } catch (e) {
      setTestimonialError("Ошибка загрузки отзывов");
    } finally {
      setTestimonialLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchApplications();
    fetchTestimonials();
  }, []);

  const [tagsInput, setTagsInput] = useState("");

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setTagsInput(value);
    } else {
      setForm((f) => ({ ...f, [name]: name === "price" ? (value === "" ? null : Number(value)) : value }));
    }
  };

  // Handle type change
  const handleTypeChange = (value: "product" | "service") => {
    setForm((f) => ({ ...f, type: value }));
  };

  // Handle icon change
  const handleIconChange = (value: string) => {
    setForm((f) => ({ ...f, icon: value }));
  };

  // Handle image file upload
  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((f) => ({ ...f, image: ev.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  // Add or update item
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
      const payload = {
        ...form,
        description: form.short_description,
        tags,
      };
      if (editingId) {
        await supabase.from("items").update(payload).eq("id", editingId);
      } else {
        await supabase.from("items").insert([payload]);
      }
      setForm(emptyForm);
      setTagsInput("");
      setEditingId(null);
      fetchItems();
    } catch (e) {
      setError("Ошибка сохранения");
    } finally {
      setLoading(false);
    }
  };

  // Edit item
  const handleEdit = (item: Item) => {
    setForm({
      ...emptyForm,
      ...item,
      short_description: item.short_description || item.description || "",
      full_description: item.full_description || "",
      tags: item.tags || [],
    });
    setTagsInput(item.tags ? item.tags.join(", ") : "");
    setEditingId(item.id);
  };

  // Delete item
  const handleDelete = async (id: number) => {
    if (!window.confirm("Удалить этот элемент?")) return;
    setLoading(true);
    setError(null);
    try {
      await supabase.from("items").delete().eq("id", id);
      fetchItems();
    } catch (e) {
      setError("Ошибка удаления");
    } finally {
      setLoading(false);
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  // --- CRUD для отзывов ---
  const handleTestimonialChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTestimonialForm((f) => ({ ...f, [name]: name === "rating" ? Number(value) : value }));
  };
  const handleTestimonialRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTestimonialForm((f) => ({ ...f, rating: Number(e.target.value) }));
  };
  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTestimonialLoading(true);
    setTestimonialError(null);
    try {
      if (testimonialEditingId) {
        await supabase.from("testimonials").update(testimonialForm).eq("id", testimonialEditingId);
      } else {
        await supabase.from("testimonials").insert([testimonialForm]);
      }
      setTestimonialForm(emptyTestimonial);
      setTestimonialEditingId(null);
      fetchTestimonials();
    } catch (e) {
      setTestimonialError("Ошибка сохранения");
    } finally {
      setTestimonialLoading(false);
    }
  };
  const handleTestimonialEdit = (t: Testimonial) => {
    setTestimonialForm({ ...t });
    setTestimonialEditingId(t.id);
  };
  const handleTestimonialDelete = async (id: number) => {
    if (!window.confirm("Удалить этот отзыв?")) return;
    setTestimonialLoading(true);
    setTestimonialError(null);
    try {
      await supabase.from("testimonials").delete().eq("id", id);
      fetchTestimonials();
    } catch (e) {
      setTestimonialError("Ошибка удаления");
    } finally {
      setTestimonialLoading(false);
    }
  };
  const handleTestimonialCancel = () => {
    setTestimonialForm(emptyTestimonial);
    setTestimonialEditingId(null);
  };

  if (authLoading) return <PageLoader text="Загрузка админки..." />;
  if (!authUser) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <form onSubmit={handleLogin} className="bg-white rounded shadow p-8 w-full max-w-sm space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Вход в админ-панель</h2>
            <Input
              type="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
              required
            />
            <Input
              type="password"
              placeholder="Пароль"
              value={loginForm.password}
              onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
              required
            />
            <Button type="submit" className="w-full" disabled={loginLoading}>
              {loginLoading ? "Вход..." : "Войти"}
            </Button>
            {authError && <div className="text-red-500 text-center">{authError}</div>}
          </form>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Админ-панель</h1>
          <div>
            <span className="mr-4 text-steel-600">{authUser.email}</span>
            <Button variant="outline" onClick={handleLogout}>Выйти</Button>
          </div>
        </div>
        <Tabs defaultValue="items" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="items">Товары и услуги</TabsTrigger>
            <TabsTrigger value="applications">Заявки</TabsTrigger>
            <TabsTrigger value="testimonials">Отзывы</TabsTrigger>
          </TabsList>
          <TabsContent value="items">
            {/* --- Товары и услуги --- */}
            <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  name="name"
                  placeholder="Название"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="flex-1"
                />
                <Select value={form.type} onValueChange={handleTypeChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">Товар</SelectItem>
                    <SelectItem value="service">Услуга</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  name="price"
                  type="number"
                  placeholder="Цена (если есть)"
                  value={form.price ?? ""}
                  onChange={handleChange}
                  min={0}
                  step={0.01}
                  className="w-40"
                />
              </div>
              {/* SVG Icon Picker */}
              <div>
                <label className="block text-sm font-medium mb-1">SVG-иконка для услуги:</label>
                <Select value={form.icon ?? ""} onValueChange={handleIconChange}>
                  <SelectTrigger className="w-60">
                    <SelectValue placeholder="Выберите иконку" />
                  </SelectTrigger>
                  <SelectContent>
                    {ICONS.map(({ value, label, icon: Icon }) => (
                      <SelectItem key={value} value={value} className="flex items-center gap-2">
                        <Icon className="inline-block mr-2 w-5 h-5" />
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.icon && (
                  <div className="mt-2 flex items-center gap-2 text-steel-700">
                    {(() => {
                      const Icon = ICONS.find(i => i.value === form.icon)?.icon;
                      return Icon ? <Icon className="w-6 h-6" /> : null;
                    })()}
                    <span className="text-sm">{ICONS.find(i => i.value === form.icon)?.label}</span>
                  </div>
                )}
              </div>
              <Input
                name="image"
                placeholder="Ссылка на изображение (URL)"
                value={form.image ?? ""}
                onChange={handleChange}
                className="w-full"
              />
              <div>
                <label className="block text-sm font-medium mb-1">Или загрузите изображение с компьютера:</label>
                <input type="file" accept="image/*" onChange={handleImageFile} />
                {form.image && (
                  <img src={form.image} alt="preview" loading="lazy" className="mt-2 max-h-32 rounded" />
                )}
              </div>
              <Input
                name="tags"
                type="text"
                placeholder="Теги (через запятую, например: зима, новинка, для детей)"
                value={tagsInput}
                onChange={handleChange}
                className="w-full"
              />
              <textarea
                name="short_description"
                placeholder="Краткое описание (отображается в карточке товара)"
                value={form.short_description}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 min-h-[60px]"
                maxLength={200}
                required
              />
              <ReactQuill
                value={form.full_description}
                onChange={val => setForm(f => ({ ...f, full_description: val }))}
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['clean']
                  ]
                }}
                className="bg-white rounded border min-h-[120px] mb-2"
                placeholder="Полное описание (отображается при клике на товар)"
              />
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {editingId ? "Сохранить" : "Добавить"}
                </Button>
                {editingId && (
                  <Button type="button" variant="secondary" onClick={handleCancel}>
                    Отмена
                  </Button>
                )}
              </div>
              {error && <div className="text-red-500">{error}</div>}
            </form>
            <div className="bg-white rounded shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Список</h2>
              {loading ? (
                <PageLoader text="Загрузка данных..." />
              ) : items.length === 0 ? (
                <div>Нет данных</div>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border">ID</th>
                      <th className="p-2 border">Название</th>
                      <th className="p-2 border">Тип</th>
                      <th className="p-2 border">Цена</th>
                      <th className="p-2 border">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td className="p-2 border text-center">{item.id}</td>
                        <td className="p-2 border">{item.name}</td>
                        <td className="p-2 border text-center">{item.type === "product" ? "Товар" : "Услуга"}</td>
                        <td className="p-2 border text-center">{item.type === "product" ? item.price : "-"}</td>
                        <td className="p-2 border text-center">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(item)} className="mr-2">Редактировать</Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>Удалить</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </TabsContent>
          <TabsContent value="applications">
            {/* --- Заявки --- */}
            <div className="bg-white rounded shadow p-4">
              <h2 className="text-xl font-semibold mb-4">Заявки с сайта</h2>
              {appsLoading ? (
                <PageLoader text="Загрузка заявок..." />
              ) : appsError ? (
                <div className="text-red-500">{appsError}</div>
              ) : applications.length === 0 ? (
                <div>Нет заявок</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border">
                    <thead>
                      <tr className="bg-steel-100">
                        <th className="p-2 border">Дата</th>
                        <th className="p-2 border">Имя</th>
                        <th className="p-2 border">Телефон</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Компания</th>
                        <th className="p-2 border">Тип запроса</th>
                        <th className="p-2 border">Сообщение</th>
                        <th className="p-2 border">Корзина</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr key={app.id} className="border-b hover:bg-steel-50">
                          <td className="p-2 border whitespace-nowrap">{app.created_at ? new Date(app.created_at).toLocaleString() : "-"}</td>
                          <td className="p-2 border">{app.name}</td>
                          <td className="p-2 border">{app.phone}</td>
                          <td className="p-2 border">{app.email}</td>
                          <td className="p-2 border">{app.company}</td>
                          <td className="p-2 border">{app.request_type || app.requestType}</td>
                          <td className="p-2 border max-w-xs break-words">{app.message}</td>
                          <td className="p-2 border max-w-xs break-words">
                            {Array.isArray(app.cart) && app.cart.length > 0 ? (
                              <ul className="list-disc pl-4">
                                {app.cart.map((item: any, idx: number) => (
                                  <li key={idx}>
                                    {item.name} x{item.quantity} {item.price ? `(${item.price}₽)` : ""}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="testimonials">
            <div className="bg-white rounded shadow p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Добавить/редактировать отзыв</h2>
              <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input name="author" placeholder="Имя автора*" value={testimonialForm.author} onChange={handleTestimonialChange} required />
                  <Input name="position" placeholder="Должность" value={testimonialForm.position} onChange={handleTestimonialChange} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input name="company" placeholder="Компания" value={testimonialForm.company} onChange={handleTestimonialChange} />
                  <Input name="company_url" placeholder="Сайт компании (URL)" value={testimonialForm.company_url} onChange={handleTestimonialChange} />
                </div>
                <textarea name="text" placeholder="Текст отзыва*" value={testimonialForm.text} onChange={handleTestimonialChange} required className="w-full border rounded px-3 py-2 min-h-[80px]" />
                <div>
                  <label className="block text-sm font-medium mb-1">Оценка:</label>
                  <select name="rating" value={testimonialForm.rating} onChange={handleTestimonialRatingChange} className="border rounded px-2 py-1">
                    {[5,4,3,2,1].map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <span className="ml-2">
                    {[...Array(5)].map((_,i) => <Star key={i} className={"inline h-4 w-4 " + (i < testimonialForm.rating ? "fill-yellow-400 text-yellow-400" : "text-steel-300")} />)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={testimonialLoading}>{testimonialEditingId ? "Сохранить" : "Добавить"}</Button>
                  {testimonialEditingId && (
                    <Button type="button" variant="secondary" onClick={handleTestimonialCancel}>Отмена</Button>
                  )}
                </div>
                {testimonialError && <div className="text-red-500">{testimonialError}</div>}
              </form>
            </div>
            <div className="bg-white rounded shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Список отзывов</h2>
              {testimonialLoading ? (
                <PageLoader text="Загрузка отзывов..." />
              ) : testimonials.length === 0 ? (
                <div>Нет отзывов</div>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border">ID</th>
                      <th className="p-2 border">Автор</th>
                      <th className="p-2 border">Должность</th>
                      <th className="p-2 border">Компания</th>
                      <th className="p-2 border">Оценка</th>
                      <th className="p-2 border">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testimonials.map((t) => (
                      <tr key={t.id}>
                        <td className="p-2 border text-center">{t.id}</td>
                        <td className="p-2 border">{t.author}</td>
                        <td className="p-2 border">{t.position}</td>
                        <td className="p-2 border">{t.company}</td>
                        <td className="p-2 border text-center">{[...Array(5)].map((_,i) => <Star key={i} className={"inline h-4 w-4 " + (i < t.rating ? "fill-yellow-400 text-yellow-400" : "text-steel-300")} />)}</td>
                        <td className="p-2 border text-center">
                          <Button size="sm" variant="outline" onClick={() => handleTestimonialEdit(t)} className="mr-2">Редактировать</Button>
                          <Button size="sm" variant="destructive" onClick={() => handleTestimonialDelete(t.id)}>Удалить</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
} 