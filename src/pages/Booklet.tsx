import { useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const IMG = {
  mower:  "https://cdn.poehali.dev/projects/51c43cc5-e4ab-4fb5-b4d5-6eeedb27040f/files/7fae84f7-deb7-412c-b9e8-9f5dd31f5a2e.jpg",
  garden: "https://cdn.poehali.dev/projects/51c43cc5-e4ab-4fb5-b4d5-6eeedb27040f/files/302f505b-14d8-406e-98a4-3164f6b02976.jpg",
  repair: "https://cdn.poehali.dev/projects/51c43cc5-e4ab-4fb5-b4d5-6eeedb27040f/files/8e4d9aa9-9c40-4646-b57f-db70b35b9bbb.jpg",
};

const PHONE = "8 (936) 141-42-32";

const pageStyle: React.CSSProperties = {
  fontFamily: "'Nunito', system-ui, sans-serif",
  width: "148mm",
  height: "210mm",
  background: "#fff",
  margin: "0 auto",
  boxShadow: "0 10px 60px rgba(0,0,0,0.22)",
  position: "relative",
  overflow: "hidden",
  flexShrink: 0,
};

export default function Booklet() {
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const handlePrint = () => window.print();

  const handleDownload = async () => {
    if (!page1Ref.current || !page2Ref.current) return;
    setLoading(true);
    try {
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a5" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const opts = { scale: 2, useCORS: true, allowTaint: true, backgroundColor: "#fff" };
      const c1 = await html2canvas(page1Ref.current, opts);
      pdf.addImage(c1.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, pageW, pageH);
      pdf.addPage("a5", "portrait");
      const c2 = await html2canvas(page2Ref.current, opts);
      pdf.addImage(c2.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, pageW, pageH);
      pdf.save("zelenye-ruki-buklet.pdf");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&family=Caveat:wght@700&display=swap');
        @media print {
          .no-print { display: none !important; }
          body { margin: 0; background: #fff; }
          .a5 { width: 148mm; height: 210mm; margin: 0; box-shadow: none !important; page-break-after: always; overflow: hidden; }
        }
      `}</style>

      <div className="no-print fixed top-4 right-4 z-50 flex gap-3">
        <a href="/" className="bg-white text-gray-700 font-bold px-4 py-2 rounded-xl shadow border border-gray-200 flex items-center gap-2 hover:bg-gray-50 text-sm">
          <Icon name="ArrowLeft" size={15} /> На сайт
        </a>
        <button onClick={handleDownload} disabled={loading}
          className="bg-green-600 text-white font-bold px-5 py-2 rounded-xl shadow-lg flex items-center gap-2 hover:bg-green-700 transition disabled:opacity-60 text-sm">
          <Icon name={loading ? "Loader2" : "FileDown"} size={15} className={loading ? "animate-spin" : ""} />
          {loading ? "Генерация..." : "Скачать PDF (A5)"}
        </button>
        <button onClick={handlePrint}
          className="bg-gray-700 text-white font-bold px-5 py-2 rounded-xl shadow-lg flex items-center gap-2 hover:bg-gray-800 transition text-sm">
          <Icon name="Printer" size={15} /> Печать
        </button>
      </div>

      <div className="no-print bg-gray-300 py-12 px-4 flex flex-col items-center gap-12 min-h-screen">
        <p className="text-gray-600 font-bold text-sm tracking-widest uppercase">Буклет A5 · Сторона 1 и 2</p>

        {/* ================= СТРАНИЦА 1 ================= */}
        <div ref={page1Ref} style={pageStyle} className="a5">

          {/* Главное фото на всю ширину */}
          <div style={{ position: "relative", height: 235, overflow: "hidden" }}>
            <img src={IMG.mower} alt="" crossOrigin="anonymous"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 30%, rgba(15,40,15,0.78) 78%, rgba(15,40,15,0.98) 100%)" }} />

            <div style={{ position: "absolute", top: 16, left: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 30 }}>🌿</span>
              <span style={{ fontFamily: "Caveat, cursive", fontSize: 34, color: "#fff", fontWeight: 700, textShadow: "0 2px 10px rgba(0,0,0,0.45)", lineHeight: 1 }}>
                Зелёные руки
              </span>
            </div>

            <div style={{
              position: "absolute", top: 18, right: 16,
              background: "#FF5252", color: "#fff",
              borderRadius: 12, padding: "7px 14px",
              fontWeight: 900, fontSize: 12,
              boxShadow: "0 4px 14px rgba(255,80,80,0.5)"
            }}>
              🚀 Срочный выезд — без доплат
            </div>

            <div style={{ position: "absolute", bottom: 18, left: 22, right: 22 }}>
              <div style={{
                fontWeight: 900, fontSize: 26, color: "#fff", lineHeight: 1.15,
                textShadow: "0 2px 14px rgba(0,0,0,0.55)", marginBottom: 10,
                letterSpacing: -0.3
              }}>
                Ухоженный сад<br/>и порядок во дворе
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{
                  background: "#FFD93D", color: "#1A2E1A",
                  borderRadius: 22, padding: "5px 14px",
                  fontWeight: 900, fontSize: 14, letterSpacing: 0.4
                }}>
                  📍 НЕМЧИНОВКА
                </span>
                <span style={{
                  background: "rgba(255,255,255,0.18)", color: "#fff",
                  borderRadius: 22, padding: "5px 14px",
                  fontWeight: 800, fontSize: 13
                }}>
                  и окрестности
                </span>
              </div>
            </div>
          </div>

          <div style={{ background: "#F0FBF4", padding: "14px 24px 12px", borderBottom: "2px solid #C6EDD5" }}>
            <div style={{ fontWeight: 900, fontSize: 16, color: "#1A2E1A", lineHeight: 1.3, marginBottom: 5 }}>
              Один звонок — и мы уже едем!
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#3DBA6F" }}>
              ✅ Оплата после работы &nbsp;·&nbsp; ✅ Без предоплаты &nbsp;·&nbsp; ✅ Свой инструмент
            </div>
          </div>

          <div style={{ padding: "14px 24px 8px", background: "#fff" }}>
            <div style={{
              fontWeight: 900, fontSize: 17, color: "#1A2E1A",
              borderLeft: "5px solid #3DBA6F", paddingLeft: 11, marginBottom: 11
            }}>
              Тарифы
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{
                background: "linear-gradient(135deg, #FFD93D 0%, #FFC93D 100%)",
                borderRadius: 14, padding: "12px 16px",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 15, color: "#1A2E1A" }}>🛠️ Разовый выезд</div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#5a4a00", marginTop: 2 }}>1 разнорабочий · от 3 часов</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 900, fontSize: 20, color: "#1A2E1A", lineHeight: 1 }}>4 500 ₽</div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#5a4a00", marginTop: 3 }}>1 500 ₽/час</div>
                </div>
              </div>

              <div style={{
                background: "linear-gradient(135deg, #3DBA6F 0%, #1A7A3F 100%)",
                borderRadius: 14, padding: "12px 16px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                position: "relative", boxShadow: "0 4px 14px rgba(61,186,111,0.3)"
              }}>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 15, color: "#fff" }}>👥 Команда</div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "rgba(255,255,255,0.85)", marginTop: 2 }}>2+ разнорабочих · работа быстрее</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 900, fontSize: 20, color: "#fff", lineHeight: 1 }}>9 000 ₽</div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "rgba(255,255,255,0.85)", marginTop: 3 }}>1 500 ₽/час × чел.</div>
                </div>
              </div>

              <div style={{
                background: "linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)",
                borderRadius: 14, padding: "12px 16px",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 15, color: "#fff" }}>⚡ Электрик / Сантехник</div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "rgba(255,255,255,0.85)", marginTop: 2 }}>Профильный специалист</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 900, fontSize: 20, color: "#fff", lineHeight: 1 }}>3 000 ₽</div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "rgba(255,255,255,0.85)", marginTop: 3 }}>в час</div>
                </div>
              </div>
            </div>

            <div style={{ fontSize: 11, color: "#888", fontWeight: 700, marginTop: 9, textAlign: "center" }}>
              Минимум 3 часа · Оплата наличными или картой
            </div>
          </div>

          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "linear-gradient(135deg, #0F2818 0%, #1A7A3F 100%)",
            padding: "16px 22px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12
          }}>
            <div>
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, fontWeight: 700, lineHeight: 1.7 }}>
                Работаем ежедневно<br/>
                📍 <b style={{ color: "#FFD93D" }}>НЕМЧИНОВКА</b> и окрестности
              </div>
            </div>
            <div style={{
              background: "#FFD93D", color: "#1A2E1A",
              borderRadius: 14, padding: "11px 18px", textAlign: "center", flexShrink: 0,
              boxShadow: "0 4px 14px rgba(0,0,0,0.25)"
            }}>
              <div style={{ fontWeight: 900, fontSize: 20, letterSpacing: 0.3 }}>📱 {PHONE}</div>
              <div style={{ fontWeight: 800, fontSize: 10, opacity: 0.7, marginTop: 2 }}>Звонок / WhatsApp</div>
            </div>
          </div>
        </div>

        {/* ================= СТРАНИЦА 2 ================= */}
        <div ref={page2Ref} style={pageStyle} className="a5">

          <div style={{ display: "flex", height: 150 }}>
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
              <img src={IMG.garden} alt="" crossOrigin="anonymous"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 60%)" }} />
              <div style={{
                position: "absolute", bottom: 10, left: 0, right: 0, textAlign: "center",
                fontWeight: 900, fontSize: 14, color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.7)"
              }}>
                🌿 Сад под ключ
              </div>
            </div>
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
              <img src={IMG.repair} alt="" crossOrigin="anonymous"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 60%)" }} />
              <div style={{
                position: "absolute", bottom: 10, left: 0, right: 0, textAlign: "center",
                fontWeight: 900, fontSize: 14, color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.7)"
              }}>
                🔨 Мелкий ремонт
              </div>
            </div>
          </div>

          <div style={{ padding: "16px 24px 8px", background: "#F0FBF4", borderBottom: "2px solid #C6EDD5" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <span style={{ fontSize: 32 }}>🌿</span>
              <div>
                <div style={{ fontFamily: "Caveat, cursive", fontSize: 30, color: "#1A7A3F", fontWeight: 700, lineHeight: 1 }}>
                  Зелёные руки
                </div>
                <div style={{ fontWeight: 900, fontSize: 14, color: "#1A2E1A", marginTop: 3 }}>
                  Разнорабочие · <span style={{ color: "#3DBA6F" }}>📍 НЕМЧИНОВКА</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: "14px 24px 10px", background: "#fff" }}>
            <div style={{
              fontWeight: 900, fontSize: 17, color: "#1A2E1A",
              borderLeft: "5px solid #FFD93D", paddingLeft: 11, marginBottom: 11
            }}>
              Что мы делаем
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 7 }}>
              {[
                { e: "🌿", t: "Уход за садом",    d: "Обрезка, формирование" },
                { e: "✂️", t: "Стрижка газона",  d: "Покос и уборка травы" },
                { e: "🍂", t: "Уборка территории", d: "Листья, мусор, ветки" },
                { e: "⛏️", t: "Земляные работы", d: "Грядки, посадка, дренаж" },
                { e: "🔨", t: "Мелкий ремонт",   d: "Заборы, ворота, беседки" },
                { e: "✨", t: "Уборка дома",      d: "Генеральная и обычная" },
                { e: "⚡", t: "Электрик",         d: "Проводка, розетки, свет" },
                { e: "🔧", t: "Сантехник",        d: "Трубы, смесители, полив" },
              ].map(s => (
                <div key={s.t} style={{
                  background: "#F0FBF4", borderRadius: 12,
                  padding: "9px 11px",
                  border: "2px solid #C6EDD5",
                  display: "flex", alignItems: "center", gap: 9
                }}>
                  <div style={{ fontSize: 22, flexShrink: 0 }}>{s.e}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 900, fontSize: 12, color: "#1A2E1A", lineHeight: 1.1 }}>{s.t}</div>
                    <div style={{ fontSize: 10, color: "#666", fontWeight: 700, marginTop: 2, lineHeight: 1.25 }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "10px 24px 12px", background: "#F0FBF4", borderTop: "2px solid #C6EDD5" }}>
            <div style={{
              fontWeight: 900, fontSize: 17, color: "#1A2E1A",
              borderLeft: "5px solid #A78BFA", paddingLeft: 11, marginBottom: 10
            }}>
              Как это работает
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { n: "1", e: "📞", t: "Звонок", d: "Опишите задачу" },
                { n: "2", e: "🚗", t: "Приедем", d: "Точно в срок" },
                { n: "3", e: "✅", t: "Сделаем", d: "Чисто и аккуратно" },
                { n: "4", e: "💳", t: "Оплата", d: "После работы" },
              ].map(s => (
                <div key={s.n} style={{
                  flex: 1, background: "#fff", borderRadius: 12,
                  padding: "10px 4px", border: "2px solid #C6EDD5", textAlign: "center"
                }}>
                  <div style={{
                    width: 24, height: 24, background: "#3DBA6F",
                    borderRadius: "50%", color: "#fff", fontWeight: 900, fontSize: 13,
                    display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 5px"
                  }}>{s.n}</div>
                  <div style={{ fontSize: 22 }}>{s.e}</div>
                  <div style={{ fontWeight: 900, fontSize: 12, color: "#1A2E1A", marginTop: 3 }}>{s.t}</div>
                  <div style={{ fontSize: 10, color: "#777", fontWeight: 700, marginTop: 2, lineHeight: 1.3 }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "linear-gradient(135deg, #0F2818 0%, #1A7A3F 100%)",
            padding: "14px 22px"
          }}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 9 }}>
              {["📸 Фотоотчёт", "🛠️ Свой инструмент", "🚀 Срочный выезд — без доплат"].map(a => (
                <span key={a} style={{
                  background: "rgba(255,255,255,0.16)", color: "#fff",
                  borderRadius: 20, padding: "4px 11px",
                  fontSize: 11, fontWeight: 800
                }}>{a}</span>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, fontWeight: 700, lineHeight: 1.6 }}>
                Ежедневно · Без выходных<br/>📍 <b style={{ color: "#FFD93D" }}>НЕМЧИНОВКА</b> и окрестности
              </div>
              <div style={{
                background: "#FFD93D", color: "#1A2E1A",
                borderRadius: 14, padding: "11px 18px", textAlign: "center", flexShrink: 0,
                boxShadow: "0 4px 14px rgba(0,0,0,0.25)"
              }}>
                <div style={{ fontWeight: 900, fontSize: 20 }}>📱 {PHONE}</div>
                <div style={{ fontWeight: 800, fontSize: 10, opacity: 0.7, marginTop: 2 }}>Звонок / WhatsApp</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
