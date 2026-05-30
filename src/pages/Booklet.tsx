import { useRef, useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const IMG_URLS = {
  hero:   "https://cdn.poehali.dev/projects/51c43cc5-e4ab-4fb5-b4d5-6eeedb27040f/files/f4d5704d-c0ed-4c1e-ab3e-8a89a6fdab8e.jpg",
  mower:  "https://cdn.poehali.dev/projects/51c43cc5-e4ab-4fb5-b4d5-6eeedb27040f/files/7fae84f7-deb7-412c-b9e8-9f5dd31f5a2e.jpg",
  garden: "https://cdn.poehali.dev/projects/51c43cc5-e4ab-4fb5-b4d5-6eeedb27040f/files/302f505b-14d8-406e-98a4-3164f6b02976.jpg",
  repair: "https://cdn.poehali.dev/projects/51c43cc5-e4ab-4fb5-b4d5-6eeedb27040f/files/8e4d9aa9-9c40-4646-b57f-db70b35b9bbb.jpg",
};

const PHONE = "8 (936) 141-42-32";

async function toDataUrl(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

const S: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "'Nunito', sans-serif",
    width: "148mm",
    height: "210mm",
    background: "#fff",
    margin: "0 auto",
    boxShadow: "0 8px 60px rgba(0,0,0,0.22)",
    position: "relative",
    overflow: "hidden",
    flexShrink: 0,
  },
};

export default function Booklet() {
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [imgs, setImgs] = useState<Record<string, string>>({});
  const [imgsReady, setImgsReady] = useState(false);

  useEffect(() => {
    Promise.all(
      Object.entries(IMG_URLS).map(async ([k, url]) => [k, await toDataUrl(url)])
    ).then(entries => {
      setImgs(Object.fromEntries(entries));
      setImgsReady(true);
    });
  }, []);

  const handlePrint = () => window.print();

  const handleDownload = async () => {
    if (!page1Ref.current || !page2Ref.current) return;
    setLoading(true);
    try {
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a5" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const c1 = await html2canvas(page1Ref.current, { scale: 2, useCORS: true, backgroundColor: "#fff" });
      pdf.addImage(c1.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, pageW, pageH);
      pdf.addPage("a5", "portrait");
      const c2 = await html2canvas(page2Ref.current, { scale: 2, useCORS: true, backgroundColor: "#fff" });
      pdf.addImage(c2.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, pageW, pageH);
      pdf.save("zelenye-ruki-buklet.pdf");
    } finally {
      setLoading(false);
    }
  };

  const img = (key: string) => imgs[key] || IMG_URLS[key as keyof typeof IMG_URLS];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&family=Caveat:wght@700&display=swap');

        @media print {
          .no-print { display: none !important; }
          body { margin: 0; background: #fff; }
          .a5-page { width: 148mm; height: 210mm; margin: 0; box-shadow: none !important; page-break-after: always; overflow: hidden; }
        }
      `}</style>

      {/* Toolbar */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-3">
        <a href="/" className="bg-white text-gray-700 font-bold px-4 py-2 rounded-xl shadow border border-gray-200 flex items-center gap-2 hover:bg-gray-50 text-sm">
          <Icon name="ArrowLeft" size={15} /> На сайт
        </a>
        <button onClick={handleDownload} disabled={loading || !imgsReady}
          className="bg-green-600 text-white font-bold px-5 py-2 rounded-xl shadow-lg flex items-center gap-2 hover:bg-green-700 transition disabled:opacity-50 text-sm">
          <Icon name={loading ? "Loader2" : "FileDown"} size={15} />
          {loading ? "Генерация..." : !imgsReady ? "Загрузка фото..." : "Скачать PDF (A5)"}
        </button>
        <button onClick={handlePrint}
          className="bg-gray-700 text-white font-bold px-5 py-2 rounded-xl shadow-lg flex items-center gap-2 hover:bg-gray-800 transition text-sm">
          <Icon name="Printer" size={15} /> Печать
        </button>
      </div>

      <div className="no-print bg-gray-300 py-14 px-4 flex flex-col items-center gap-12 min-h-screen">
        <p className="text-gray-600 font-bold text-sm tracking-widest uppercase">Буклет A5 · Сторона 1 и 2</p>
      </div>

      {/* ============================================================
          СТРАНИЦА 1 — ЛИЦЕВАЯ
      ============================================================ */}
      <div style={S.page} className="a5-page" ref={page1Ref}>

        {/* ГЛАВНОЕ ФОТО на всю ширину */}
        <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
          <img src={img("mower")} alt="" crossOrigin="anonymous"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }} />
          {/* тёмный градиент снизу */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(15,40,15,0.72) 70%, rgba(15,40,15,0.96) 100%)" }} />

          {/* Бейдж срочный выезд */}
          <div style={{
            position: "absolute", top: 14, right: 14,
            background: "#FF6B6B", color: "#fff",
            borderRadius: 10, padding: "6px 14px",
            fontWeight: 900, fontSize: 12, letterSpacing: 0.2,
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
          }}>
            🚀 Срочный выезд — без доплат
          </div>

          {/* Лого */}
          <div style={{ position: "absolute", top: 14, left: 16, display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontSize: 26 }}>🌿</span>
            <span style={{ fontFamily: "Caveat, cursive", fontSize: 30, color: "#fff", fontWeight: 700, textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
              Зелёные руки
            </span>
          </div>

          {/* Текст поверх фото */}
          <div style={{ position: "absolute", bottom: 16, left: 20, right: 20 }}>
            <div style={{
              fontWeight: 900, fontSize: 22, color: "#fff", lineHeight: 1.2,
              textShadow: "0 2px 12px rgba(0,0,0,0.5)", marginBottom: 6
            }}>
              Ухоженный сад и чистая территория — без усилий!
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={{
                background: "#FFD93D", color: "#1A2E1A",
                borderRadius: 20, padding: "4px 14px",
                fontWeight: 900, fontSize: 13
              }}>
                📍 НЕМЧИНОВКА
              </span>
              <span style={{
                background: "rgba(255,255,255,0.2)", color: "#fff",
                borderRadius: 20, padding: "4px 14px",
                fontWeight: 800, fontSize: 12,
                backdropFilter: "blur(4px)"
              }}>
                и окрестности
              </span>
            </div>
          </div>
        </div>

        {/* СЛОГАН */}
        <div style={{ background: "#F0FBF4", padding: "12px 22px 10px", borderBottom: "2px solid #C6EDD5" }}>
          <div style={{ fontWeight: 900, fontSize: 14, color: "#1A2E1A", lineHeight: 1.3, marginBottom: 4 }}>
            Один звонок — и мы уже едем!
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#3DBA6F" }}>
            ✅ Оплата только после работы &nbsp;·&nbsp; ✅ Без предоплаты
          </div>
        </div>

        {/* ПРАЙС */}
        <div style={{ padding: "12px 22px 10px", background: "#fff" }}>
          <div style={{
            fontWeight: 900, fontSize: 15, color: "#1A2E1A",
            borderLeft: "5px solid #3DBA6F", paddingLeft: 10, marginBottom: 10
          }}>
            Стоимость работ
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {[
              { bg: "#FFD93D", tc: "#1A2E1A", icon: "🛠️", label: "С нашим инструментом", price: "2 000 ₽/ч" },
              { bg: "#3DBA6F", tc: "#fff",    icon: "🔑", label: "С вашим инструментом", price: "1 500 ₽/ч" },
              { bg: "#A78BFA", tc: "#fff",    icon: "⚡", label: "Электрик / Сантехник",  price: "3 000 ₽/ч" },
            ].map(r => (
              <div key={r.label} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: r.bg, borderRadius: 12, padding: "10px 14px"
              }}>
                <span style={{ fontWeight: 800, fontSize: 13, color: r.tc }}>{r.icon} {r.label}</span>
                <span style={{ fontWeight: 900, fontSize: 17, color: r.tc }}>{r.price}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "#888", fontWeight: 700, marginTop: 8, textAlign: "center" }}>
            Минимум 3 часа · Оплата наличными или картой
          </div>
        </div>

        {/* ФУТЕР */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(135deg, #1A2E1A 0%, #1A7A3F 100%)",
          padding: "14px 22px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12
        }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 700, lineHeight: 1.8 }}>
              📞 Работаем ежедневно, без выходных<br/>
              📍 <b style={{ color: "#FFD93D" }}>НЕМЧИНОВКА</b> и окрестности
            </div>
          </div>
          <div style={{
            background: "#FFD93D", color: "#1A2E1A",
            borderRadius: 14, padding: "10px 18px", textAlign: "center", flexShrink: 0
          }}>
            <div style={{ fontWeight: 900, fontSize: 19, letterSpacing: 0.5 }}>📱 {PHONE}</div>
            <div style={{ fontWeight: 800, fontSize: 10, opacity: 0.7, marginTop: 2 }}>Позвонить / WhatsApp</div>
          </div>
        </div>

      </div>

      <div className="no-print" style={{ height: 48 }} />

      {/* ============================================================
          СТРАНИЦА 2 — ОБОРОТНАЯ
      ============================================================ */}
      <div style={S.page} className="a5-page" ref={page2Ref}>

        {/* Верхняя цветная полоска */}
        <div style={{ height: 8, background: "linear-gradient(90deg, #1A7A3F 0%, #A8E063 100%)" }} />

        {/* Заголовок */}
        <div style={{ padding: "16px 24px 12px", background: "#F0FBF4", borderBottom: "2px solid #C6EDD5" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 30 }}>🌿</span>
            <div>
              <div style={{ fontFamily: "Caveat, cursive", fontSize: 28, color: "#1A7A3F", fontWeight: 700, lineHeight: 1 }}>
                Зелёные руки
              </div>
              <div style={{ fontWeight: 900, fontSize: 13, color: "#1A2E1A", marginTop: 2 }}>
                Разнорабочие · <span style={{ color: "#3DBA6F" }}>📍 НЕМЧИНОВКА</span>
              </div>
            </div>
          </div>
        </div>

        {/* ДВЕ КАРТИНКИ */}
        <div style={{ display: "flex", gap: 0, height: 130 }}>
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            <img src={img("garden")} alt="" crossOrigin="anonymous"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.32)" }} />
            <div style={{
              position: "absolute", bottom: 10, left: 0, right: 0, textAlign: "center",
              fontWeight: 900, fontSize: 13, color: "#fff", textShadow: "0 1px 6px rgba(0,0,0,0.6)"
            }}>🌿 Идеальный газон</div>
          </div>
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            <img src={img("repair")} alt="" crossOrigin="anonymous"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.32)" }} />
            <div style={{
              position: "absolute", bottom: 10, left: 0, right: 0, textAlign: "center",
              fontWeight: 900, fontSize: 13, color: "#fff", textShadow: "0 1px 6px rgba(0,0,0,0.6)"
            }}>🔨 Мелкий ремонт</div>
          </div>
        </div>

        {/* УСЛУГИ */}
        <div style={{ padding: "12px 24px 10px", background: "#fff" }}>
          <div style={{ fontWeight: 900, fontSize: 15, color: "#1A2E1A", borderLeft: "5px solid #FFD93D", paddingLeft: 10, marginBottom: 10 }}>
            Наши услуги
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 7 }}>
            {[
              { e: "🌿", t: "Уход за садом" },
              { e: "✂️", t: "Стрижка газона" },
              { e: "🍂", t: "Уборка двора" },
              { e: "⛏️", t: "Земляные работы" },
              { e: "🔨", t: "Мелкий ремонт" },
              { e: "✨", t: "Уборка дома" },
              { e: "⚡", t: "Электрик" },
              { e: "🔧", t: "Сантехник" },
            ].map(s => (
              <div key={s.t} style={{
                background: "#F0FBF4", borderRadius: 10, padding: "8px 4px",
                border: "2px solid #C6EDD5", textAlign: "center"
              }}>
                <div style={{ fontSize: 20 }}>{s.e}</div>
                <div style={{ fontWeight: 800, fontSize: 10, color: "#1A2E1A", marginTop: 4, lineHeight: 1.3 }}>{s.t}</div>
              </div>
            ))}
          </div>
        </div>

        {/* КАК РАБОТАЕМ */}
        <div style={{ padding: "10px 24px 10px", background: "#F0FBF4", borderTop: "2px solid #C6EDD5" }}>
          <div style={{ fontWeight: 900, fontSize: 15, color: "#1A2E1A", borderLeft: "5px solid #A78BFA", paddingLeft: 10, marginBottom: 10 }}>
            Как мы работаем
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { n: "1", e: "📞", t: "Звонок", d: "Опишите задачу" },
              { n: "2", e: "🚗", t: "Приедем", d: "Точно в срок" },
              { n: "3", e: "✅", t: "Сделаем", d: "Чисто и аккуратно" },
              { n: "4", e: "💳", t: "Оплата", d: "После работы" },
            ].map(s => (
              <div key={s.n} style={{
                flex: 1, background: "#fff", borderRadius: 12, padding: "10px 6px",
                border: "2px solid #C6EDD5", textAlign: "center"
              }}>
                <div style={{
                  width: 24, height: 24, background: "#3DBA6F", borderRadius: "50%",
                  color: "#fff", fontWeight: 900, fontSize: 13,
                  display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 4px"
                }}>{s.n}</div>
                <div style={{ fontSize: 20 }}>{s.e}</div>
                <div style={{ fontWeight: 900, fontSize: 11, color: "#1A2E1A", marginTop: 4 }}>{s.t}</div>
                <div style={{ fontSize: 10, color: "#777", fontWeight: 700, marginTop: 2, lineHeight: 1.3 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ФУТЕР */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(135deg, #1A2E1A 0%, #1A7A3F 100%)",
          padding: "14px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12
        }}>
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
              {["📸 Фотоотчёт", "🛠️ Инструмент с собой", "🚀 Срочный выезд — без доплат"].map(a => (
                <span key={a} style={{
                  background: "rgba(255,255,255,0.15)", color: "#fff",
                  borderRadius: 20, padding: "3px 10px",
                  fontSize: 10, fontWeight: 800
                }}>{a}</span>
              ))}
            </div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontWeight: 700, lineHeight: 1.7 }}>
              Ежедневно · Без выходных · Без предоплаты
            </div>
          </div>
          <div style={{
            background: "#FFD93D", color: "#1A2E1A",
            borderRadius: 14, padding: "10px 18px", textAlign: "center", flexShrink: 0
          }}>
            <div style={{ fontWeight: 900, fontSize: 19 }}>📱 {PHONE}</div>
            <div style={{ fontWeight: 800, fontSize: 10, opacity: 0.7, marginTop: 2 }}>Позвонить / WhatsApp</div>
          </div>
        </div>

      </div>

      <div className="no-print" style={{ height: 60 }} />
    </>
  );
}
