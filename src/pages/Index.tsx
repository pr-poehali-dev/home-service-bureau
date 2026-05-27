import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/51c43cc5-e4ab-4fb5-b4d5-6eeedb27040f/files/f4d5704d-c0ed-4c1e-ab3e-8a89a6fdab8e.jpg";
const TEAM_IMG = "https://cdn.poehali.dev/projects/51c43cc5-e4ab-4fb5-b4d5-6eeedb27040f/files/0d9cfec7-5c0a-41db-b0ae-c686ea649482.jpg";

const services = [
  { icon: "Leaf", emoji: "🌿", title: "Уход за садом", desc: "Обрезка кустов, деревьев, формирование живых изгородей", color: "bg-green-100 border-green-300" },
  { icon: "Scissors", emoji: "✂️", title: "Стрижка газона", desc: "Аккуратный покос травы и уборка скошенного", color: "bg-lime-100 border-lime-300" },
  { icon: "Trash2", emoji: "🍂", title: "Уборка территории", desc: "Сбор листьев, мусора, веток после шторма", color: "bg-yellow-100 border-yellow-300" },
  { icon: "Shovel", emoji: "⛏️", title: "Земляные работы", desc: "Вскопка грядок, посадка растений, дренаж", color: "bg-orange-100 border-orange-300" },
  { icon: "Hammer", emoji: "🔨", title: "Мелкий ремонт", desc: "Заборы, ворота, беседки, садовые постройки", color: "bg-violet-100 border-violet-300" },
  { icon: "Sparkles", emoji: "✨", title: "Уборка помещений", desc: "Генеральная и поддерживающая уборка дома", color: "bg-sky-100 border-sky-300" },
];

const plans = [
  {
    name: "Разовый выезд",
    hours: "от 2 часов",
    price: "от 4 000 ₽",
    perHour: "2 000 ₽/час",
    color: "bg-yellow-400",
    textColor: "text-yellow-900",
    features: ["Один разнорабочий", "Инструмент с собой", "Любые задачи"],
    highlight: false,
  },
  {
    name: "Команда",
    hours: "от 3 часов",
    price: "от 8 000 ₽",
    perHour: "2 000 ₽/час × 2",
    color: "bg-brand-green",
    textColor: "text-white",
    features: ["Два разнорабочих", "Работа вдвое быстрее", "Крупные объёмы"],
    highlight: true,
  },
  {
    name: "Абонемент",
    hours: "8 визитов/мес",
    price: "от 28 000 ₽",
    perHour: "1 750 ₽/час",
    color: "bg-violet-400",
    textColor: "text-white",
    features: ["Фиксированный день", "Скидка 12%", "Приоритетный выезд"],
    highlight: false,
  },
];

const faqs = [
  { q: "Что нужно подготовить до приезда?", a: "Ничего! Инструменты, перчатки и расходники наши. Просто укажите задачу при бронировании." },
  { q: "Берёте срочные заявки?", a: "Да, в тот же день при наличии свободных мастеров — отметьте «Срочно» при бронировании." },
  { q: "Как рассчитывается стоимость?", a: "Ставка 2 000 ₽/час на одного разнорабочего. Минимальный заказ — 2 часа. Оплата после работы." },
  { q: "Работаете в дождь?", a: "Большинство садовых работ откладываются при сильном дожде. Перенос бесплатный." },
];

const navLinks = ["Услуги", "Абонементы", "О нас", "Контакты"];

export default function Index() {
  const [activeNav, setActiveNav] = useState("Главная");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingService, setBookingService] = useState("");
  const [bookingHours, setBookingHours] = useState("2");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [bookingDone, setBookingDone] = useState(false);

  const total = parseInt(bookingHours || "0") * 2000;

  const handleBook = () => {
    if (bookingDate && bookingService) {
      setBookingDone(true);
    }
  };

  return (
    <div className="min-h-screen font-nunito bg-[#F7FDF4] overflow-x-hidden">

      {/* ---- NAV ---- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-brand-green rounded-xl flex items-center justify-center text-white text-xl animate-wiggle">🌿</div>
            <span className="font-caveat text-2xl text-brand-dark">Зелёные руки</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setActiveNav(link)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                  activeNav === link
                    ? "bg-brand-green text-white"
                    : "text-brand-dark hover:bg-green-50"
                }`}
              >
                {link}
              </a>
            ))}
          </div>

          <a href="#бронирование" className="hidden md:block bg-brand-yellow font-bold text-brand-dark px-5 py-2 rounded-full btn-bounce shadow text-sm">
            Забронировать
          </a>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-xl hover:bg-green-50">
            <Icon name={menuOpen ? "X" : "Menu"} size={22} className="text-brand-dark" />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-green-100 px-4 py-4 flex flex-col gap-2 animate-fade-up">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => { setActiveNav(link); setMenuOpen(false); }}
                className="px-4 py-3 rounded-xl font-semibold text-brand-dark hover:bg-green-50 transition"
              >
                {link}
              </a>
            ))}
            <a href="#бронирование" className="bg-brand-green text-white font-bold px-4 py-3 rounded-xl text-center">
              Забронировать
            </a>
          </div>
        )}
      </nav>

      {/* ---- HERO ---- */}
      <section id="top" className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* BG blobs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-brand-lime opacity-30 blob animate-float2 pointer-events-none" />
        <div className="absolute top-40 -right-16 w-72 h-72 bg-brand-yellow opacity-25 blob2 animate-float pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-56 h-56 bg-brand-sky opacity-20 blob animate-float3 pointer-events-none" />

        {/* Floating emojis */}
        <span className="absolute top-24 left-[10%] text-4xl animate-float pointer-events-none select-none">🌱</span>
        <span className="absolute top-16 right-[15%] text-3xl animate-float2 pointer-events-none select-none">🍃</span>
        <span className="absolute bottom-32 left-[5%] text-3xl animate-float3 pointer-events-none select-none">🌻</span>
        <span className="absolute bottom-20 right-[8%] text-4xl animate-float pointer-events-none select-none">🪴</span>

        <div className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-yellow text-brand-dark font-bold px-4 py-2 rounded-full text-sm mb-6 animate-bounce-in">
              <span>📍</span> Немчиновка — сад и территория
            </div>
            <h1 className="font-nunito font-black text-5xl md:text-6xl text-brand-dark leading-tight mb-4 animate-fade-up" style={{animationDelay:'0.1s'}}>
              Порядок<br/>
              <span className="text-brand-green relative">
                на вашей территории
                <span className="absolute -bottom-1 left-0 w-full h-3 bg-brand-lime opacity-50 -z-10 rounded" />
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 font-semibold animate-fade-up" style={{animationDelay:'0.2s'}}>
              Сад, газон, уборка, мелкий ремонт — приедем, сделаем, уберём за собой.<br/>
              <span className="text-brand-green font-extrabold text-xl">2 000 ₽/час</span>, оплата после работы.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{animationDelay:'0.3s'}}>
              <a href="#бронирование" className="bg-brand-green text-white font-extrabold text-lg px-8 py-4 rounded-2xl btn-bounce shadow-lg shadow-green-200 flex items-center gap-2">
                <Icon name="CalendarCheck" size={20} />
                Забронировать
              </a>
              <a href="#услуги" className="bg-white text-brand-dark font-bold text-lg px-8 py-4 rounded-2xl btn-bounce border-2 border-brand-lime flex items-center gap-2">
                <Icon name="List" size={20} />
                Услуги
              </a>
            </div>

            <div className="flex flex-wrap gap-6 mt-10 animate-fade-up" style={{animationDelay:'0.4s'}}>
              {[["🏡","300+ объектов"], ["📍","Немчиновка и округа"], ["⭐","4.9 рейтинг"]].map(([e, t]) => (
                <div key={t} className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <span className="text-2xl">{e}</span>{t}
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center animate-bounce-in" style={{animationDelay:'0.2s'}}>
            <div className="relative w-[340px] h-[340px] md:w-[400px] md:h-[400px]">
              <div className="absolute inset-0 bg-brand-lime blob2 opacity-40 animate-float2" />
              <img
                src={HERO_IMG}
                alt="Разнорабочий в саду"
                className="relative z-10 w-full h-full object-cover rounded-[2.5rem] shadow-2xl border-4 border-white"
              />
              {/* Badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 font-bold text-brand-dark z-20 border-2 border-brand-yellow animate-float">
                <div className="text-2xl font-black text-brand-green">2 000 ₽</div>
                <div className="text-xs text-gray-500">в час / с человека</div>
              </div>
              <div className="absolute -top-4 -right-4 bg-brand-coral text-white rounded-2xl shadow-xl px-3 py-2 font-bold text-sm z-20 animate-float2">
                🚀 Срочный выезд
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- SERVICES ---- */}
      <section id="услуги" className="py-20 relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-green via-brand-lime to-brand-yellow" />
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-block bg-brand-lime/50 text-brand-dark font-bold px-4 py-1 rounded-full text-sm mb-3">Что мы делаем</div>
            <h2 className="font-nunito font-black text-4xl text-brand-dark">Наши услуги</h2>
            <p className="text-gray-500 mt-2 font-semibold">Один звонок — любая задача на вашей территории</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`card-fun border-2 ${s.color} rounded-3xl p-6 cursor-default`}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="text-4xl mb-3">{s.emoji}</div>
                <h3 className="font-extrabold text-xl text-brand-dark mb-1">{s.title}</h3>
                <p className="text-gray-600 font-medium text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- BOOKING ---- */}
      <section id="бронирование" className="py-20 bg-gradient-to-br from-brand-green to-[#2a9958] relative overflow-hidden">
        <div className="absolute top-10 right-10 text-8xl opacity-10 animate-spin-slow select-none">🌿</div>
        <div className="absolute bottom-10 left-10 text-7xl opacity-10 animate-float select-none">⛏️</div>

        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-block bg-white/20 text-white font-bold px-4 py-1 rounded-full text-sm mb-3">Быстрое бронирование</div>
            <h2 className="font-nunito font-black text-4xl text-white">Записаться онлайн</h2>
            <p className="text-white/80 mt-2 font-semibold">Выберите дату и услугу — мы свяжемся для подтверждения</p>
          </div>

          {bookingDone ? (
            <div className="bg-white rounded-3xl p-10 text-center animate-bounce-in">
              <div className="text-7xl mb-4">🎉</div>
              <h3 className="font-black text-2xl text-brand-dark mb-2">Заявка принята!</h3>
              <p className="text-gray-600 font-semibold">Мы свяжемся с вами в течение 30 минут для подтверждения.</p>
              <button
                onClick={() => setBookingDone(false)}
                className="mt-6 bg-brand-green text-white font-bold px-8 py-3 rounded-2xl btn-bounce"
              >
                Новая заявка
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-bold text-brand-dark mb-2 text-sm">📅 Желаемая дата</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={e => setBookingDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full border-2 border-green-200 rounded-2xl px-4 py-3 font-semibold text-brand-dark focus:outline-none focus:border-brand-green transition"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-dark mb-2 text-sm">🕐 Удобное время</label>
                  <select
                    value={bookingTime}
                    onChange={e => setBookingTime(e.target.value)}
                    className="w-full border-2 border-green-200 rounded-2xl px-4 py-3 font-semibold text-brand-dark focus:outline-none focus:border-brand-green transition"
                  >
                    <option value="">Выберите время</option>
                    {["8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-brand-dark mb-2 text-sm">🌿 Услуга</label>
                  <select
                    value={bookingService}
                    onChange={e => setBookingService(e.target.value)}
                    className="w-full border-2 border-green-200 rounded-2xl px-4 py-3 font-semibold text-brand-dark focus:outline-none focus:border-brand-green transition"
                  >
                    <option value="">Выберите услугу</option>
                    {services.map(s => <option key={s.title} value={s.title}>{s.emoji} {s.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-brand-dark mb-2 text-sm">⏱️ Количество часов</label>
                  <select
                    value={bookingHours}
                    onChange={e => setBookingHours(e.target.value)}
                    className="w-full border-2 border-green-200 rounded-2xl px-4 py-3 font-semibold text-brand-dark focus:outline-none focus:border-brand-green transition"
                  >
                    {[2,3,4,5,6,7,8].map(h => <option key={h} value={h}>{h} ч</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-brand-dark mb-2 text-sm">📱 Ваш телефон</label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___ __-__"
                    className="w-full border-2 border-green-200 rounded-2xl px-4 py-3 font-semibold text-brand-dark focus:outline-none focus:border-brand-green transition"
                  />
                </div>
              </div>

              {total > 0 && (
                <div className="mt-5 bg-green-50 border-2 border-green-200 rounded-2xl px-5 py-4 flex items-center justify-between">
                  <span className="font-bold text-gray-600">Предварительная стоимость:</span>
                  <span className="font-black text-2xl text-brand-green">{total.toLocaleString("ru")} ₽</span>
                </div>
              )}

              <button
                onClick={handleBook}
                className="mt-6 w-full bg-brand-green text-white font-extrabold text-lg py-4 rounded-2xl btn-bounce shadow-lg shadow-green-200 flex items-center justify-center gap-2"
              >
                <Icon name="CalendarCheck" size={22} />
                Отправить заявку
              </button>
              <p className="text-center text-xs text-gray-400 mt-3 font-medium">Оплата после выполнения работ. Без предоплаты.</p>
            </div>
          )}
        </div>
      </section>

      {/* ---- PLANS ---- */}
      <section id="абонементы" className="py-20 bg-[#F7FDF4]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-block bg-brand-yellow/60 text-brand-dark font-bold px-4 py-1 rounded-full text-sm mb-3">Тарифы</div>
            <h2 className="font-nunito font-black text-4xl text-brand-dark">Абонементы</h2>
            <p className="text-gray-500 mt-2 font-semibold">Для регулярного ухода за участком — выгоднее</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((p, i) => (
              <div
                key={p.name}
                className={`relative rounded-3xl p-8 card-fun ${p.color} ${p.highlight ? "ring-4 ring-white shadow-2xl scale-105" : "shadow-lg"}`}
              >
                {p.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-yellow text-brand-dark font-black text-xs px-4 py-1 rounded-full shadow">
                    ⭐ Популярный
                  </div>
                )}
                <h3 className={`font-black text-2xl ${p.textColor} mb-1`}>{p.name}</h3>
                <p className={`text-sm font-semibold ${p.highlight ? "text-white/80" : "text-gray-600"} mb-4`}>{p.hours}</p>
                <div className={`font-black text-4xl ${p.textColor} mb-1`}>{p.price}</div>
                <div className={`text-sm font-bold ${p.highlight ? "text-white/70" : "text-gray-500"} mb-6`}>{p.perHour}</div>
                <ul className="space-y-2 mb-8">
                  {p.features.map(f => (
                    <li key={f} className={`flex items-center gap-2 font-semibold text-sm ${p.textColor}`}>
                      <span className="text-lg">✅</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#бронирование"
                  className={`block text-center font-bold py-3 rounded-2xl btn-bounce transition ${
                    p.highlight
                      ? "bg-white text-brand-green hover:bg-green-50"
                      : "bg-brand-dark text-white hover:bg-gray-800"
                  }`}
                >
                  Выбрать
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- ABOUT ---- */}
      <section id="о нас" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-brand-lime opacity-30 blob animate-float2 pointer-events-none" />
            <img
              src={TEAM_IMG}
              alt="Наша команда"
              className="relative z-10 w-full rounded-3xl shadow-2xl border-4 border-white object-cover max-h-96"
            />
          </div>
          <div>
            <div className="inline-block bg-green-100 text-brand-dark font-bold px-4 py-1 rounded-full text-sm mb-4">О нас</div>
            <h2 className="font-nunito font-black text-4xl text-brand-dark mb-5 leading-tight">
              Команда, которой<br/>
              <span className="text-brand-green">доверяют участки</span>
            </h2>
            <p className="text-gray-600 font-semibold leading-relaxed mb-6">
              Мы — бригада опытных разнорабочих, работаем в Немчиновке и ближайших посёлках.
              Приедем с инструментом, выполним задачу аккуратно и уберём за собой.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["🌿", "Работаем с 2018 года"],
                ["🛠️", "Весь инструмент с собой"],
                ["📸", "Фотоотчёт после работы"],
                ["💯", "Оплата только после"],
              ].map(([e, t]) => (
                <div key={t} className="flex items-start gap-3 bg-green-50 rounded-2xl p-4">
                  <span className="text-2xl">{e}</span>
                  <span className="font-bold text-brand-dark text-sm">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="py-16 bg-[#F7FDF4]">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-nunito font-black text-3xl text-brand-dark">Частые вопросы</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border-2 border-green-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 font-bold text-brand-dark text-left hover:bg-green-50 transition"
                >
                  <span>{f.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={20} className="text-brand-green shrink-0 ml-3" />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-gray-600 font-medium text-sm leading-relaxed animate-fade-up">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CONTACTS ---- */}
      <section id="контакты" className="py-20 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-green opacity-10 blob animate-float2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-lime opacity-10 blob2 animate-float pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="text-6xl mb-4 animate-float">📞</div>
          <h2 className="font-nunito font-black text-4xl mb-3">Есть вопросы?</h2>
          <p className="text-white/70 font-semibold text-lg mb-10">Звоните или пишите — ответим за 15 минут</p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { emoji: "📱", title: "Телефон", value: "+7 (900) 000-00-00", href: "tel:+79000000000" },
              { emoji: "💬", title: "WhatsApp", value: "Написать сейчас", href: "https://wa.me/79000000000" },
              { emoji: "📍", title: "Район работы", value: "Немчиновка и окрестности", href: "#" },
            ].map(c => (
              <a
                key={c.title}
                href={c.href}
                className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-6 text-center card-fun transition block"
              >
                <div className="text-3xl mb-2">{c.emoji}</div>
                <div className="text-xs text-white/50 font-bold uppercase tracking-wider mb-1">{c.title}</div>
                <div className="font-bold text-white">{c.value}</div>
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#бронирование"
              className="inline-flex items-center gap-2 bg-brand-green font-extrabold text-xl px-10 py-5 rounded-2xl btn-bounce shadow-2xl shadow-green-900/40"
            >
              <Icon name="CalendarCheck" size={24} />
              Забронировать выезд
            </a>
            <a
              href="/booklet"
              target="_blank"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border-2 border-white/30 text-white font-extrabold text-xl px-10 py-5 rounded-2xl btn-bounce transition"
            >
              <Icon name="FileDown" size={24} />
              Буклет PDF
            </a>
          </div>
        </div>
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="bg-[#111A11] text-white/50 text-center py-6 text-sm font-medium">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-xl">🌿</span>
          <span className="font-caveat text-white text-xl">Зелёные руки</span>
        </div>
        © {new Date().getFullYear()} Разнорабочие для сада и территории
      </footer>
    </div>
  );
}