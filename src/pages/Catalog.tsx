import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Search, Filter, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useCart } from "@/hooks/CartContext";
import PageLoader from "@/components/PageLoader";

interface Item {
  id: number;
  name: string;
  short_description?: string;
  full_description?: string;
  description: string;
  price: number | null;
  type: "product" | "service";
  image?: string;
  tags?: string[];
}

const categories = [
  { id: "all", name: "Все товары" },
  // теги будут добавлены динамически
];

const Catalog = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const [modalItem, setModalItem] = useState<any | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

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

  // Фильтрация и сортировка
  // Фильтрация по категории/тегу и поиску
  let filtered = items;
  if (selectedCategory && selectedCategory !== "all") {
    filtered = filtered.filter(item => (item.tags || []).includes(selectedCategory));
  }
  if (searchTerm) {
    filtered = filtered.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  // Сортировка (по умолчанию — по id)
  if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
  if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  if (sortBy === "name") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  // Фильтрация по тегу
  if (selectedTag) {
    filtered = filtered.filter(item => (item.tags || []).includes(selectedTag));
  }

  // Фильтрация по цене
  if (minPrice) {
    filtered = filtered.filter(item => (item.price ?? 0) >= Number(minPrice));
  }
  if (maxPrice) {
    filtered = filtered.filter(item => (item.price ?? 0) <= Number(maxPrice));
  }

  // Получаем все уникальные теги
  const allTags = Array.from(new Set(items.flatMap(item => item.tags || [])));

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
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === "all" ? "bg-primary text-white" : "text-steel-700 hover:bg-steel-100"}`}
                  >
                    <div className="flex justify-between items-center">
                      <span>Все товары</span>
                    </div>
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedCategory(tag)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === tag ? "bg-primary text-white" : "text-steel-700 hover:bg-steel-100"}`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{tag}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              {/* Удаляю блок фильтра по цене: */}
              {/* <div>
                <h3 className="text-lg font-semibold text-steel-900 mb-3">Цена</h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input placeholder="От" type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                    <Input placeholder="До" type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                  </div>
                  <Button variant="outline" size="sm" className="w-full" onClick={e => { e.preventDefault(); }}>
                    <Filter className="h-4 w-4 mr-2" />
                    Применить
                  </Button>
                </div>
              </div> */}

            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-steel-900">
                  Найдено товаров: {filtered.length}
                </h2>
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Сортировать по" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">По умолчанию</SelectItem>
                  <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                  <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                  <SelectItem value="name">По названию</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
              {loading ? (
                <PageLoader />
              ) : filtered.length === 0 ? (
                <div>Нет товаров</div>
              ) : (
                filtered.map((item) => (
                  <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 bg-white border-steel-200 overflow-hidden cursor-pointer flex flex-col h-full" onClick={() => setModalItem(item)}>
                    <div className="relative">
                      <div className="aspect-[4/3] bg-steel-100 overflow-hidden">
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
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-steel-900 group-hover:text-primary transition-colors line-clamp-2">
                        {item.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 flex flex-col flex-1">
                      <CardDescription
                        className="prose prose-steel max-w-none min-h-[36px]"
                        dangerouslySetInnerHTML={{ __html: item.short_description || item.description || "" }}
                      />
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="text-2xl font-bold text-primary">
                          {item.price ? `${item.price.toLocaleString()} ₽` : "по договоренности"}
                        </div>
                        <Button size="sm" className="bg-primary hover:bg-electric-700 text-white" onClick={e => { e.stopPropagation(); addToCart({ id: item.id, name: item.name, price: item.price, image: item.image }); }}>
                          В корзину
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {modalItem && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setModalItem(null)}>
    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative" onClick={e => e.stopPropagation()}>
      <button className="absolute top-[-0.3rem] right-3 text-2xl text-steel-400 hover:text-primary" onClick={() => setModalItem(null)}>&times;</button>
      {modalItem.image && <img src={modalItem.image} alt={modalItem.name} loading="lazy" className="w-full h-48 object-cover rounded mb-4" />}
      <h2 className="text-2xl font-bold mb-2">{modalItem.name}</h2>
      <div className="text-lg text-primary font-semibold mb-2">{modalItem.price ? `${modalItem.price.toLocaleString()} ₽` : "по договоренности"}</div>
      <div className="prose prose-steel max-w-none mb-2" dangerouslySetInnerHTML={{ __html: modalItem.full_description || modalItem.description || "" }} />
      <Button className="w-full mt-4" onClick={() => { addToCart({ id: modalItem.id, name: modalItem.name, price: modalItem.price, image: modalItem.image }); setModalItem(null); }}>В корзину</Button>
    </div>
  </div>
)}

          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;
