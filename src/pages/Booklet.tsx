import { useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const IMG = {
  mower: "https://cdn.poehali.dev/projects/51c43cc5-e4ab-4fb5-b4d5-6eeedb27040f/files/f4d5704d-c0ed-4c1e-ab3e-8a89a6fdab8e.jpg",
  team:  "https://cdn.poehali.dev/projects/51c43cc5-e4ab-4fb5-b4d5-6eeedb27040f/files/0d9cfec7-5c0a-41db-b0ae-c686ea649482.jpg",
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

          {/* Главное фото газонокосильщика */}
          <div style={{
            position: "relative", height: 240, overflow: "hidden",
            background: "linear-gradient(135deg, #A8E063 0%, #3DBA6F 100%)"
          }}>
            <img src={IMG.mower} alt="" crossOrigin="anonymous"
              style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center bottom", display: "block" }} />

            <div style={{ position: "absolute", top: 16, left: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 30 }}>🌿</span>
              <span style={{ fontFamily: "Caveat, cursive", fontSize: 34, color: "#1A2E1A", fontWeight: 700, textShadow: "0 2px 10px rgba(255,255,255,0.6)", lineHeight: 1 }}>
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
          </div>

          {/* Заголовок-плашка после фото */}
          <div style={{
            background: "linear-gradient(135deg, #1A7A3F 0%, #3DBA6F 100%)",
            padding: "12px 22px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12
          }}>
            <div style={{
              fontWeight: 900, fontSize: 18, color: "#fff", lineHeight: 1.2,
              letterSpacing: -0.3
            }}>
              Ухоженный сад и порядок во дворе
            </div>
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              <span style={{
                background: "#FFD93D", color: "#1A2E1A",
                borderRadius: 20, padding: "5px 12px",
                fontWeight: 900, fontSize: 13, letterSpacing: 0.4
              }}>
                📍 НЕМЧИНОВКА
              </span>
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

          {/* Шапка страницы 2 */}
          <div style={{
            background: "linear-gradient(135deg, #1A7A3F 0%, #3DBA6F 100%)",
            padding: "16px 24px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <span style={{ fontSize: 36 }}>🌿</span>
              <div>
                <div style={{ fontFamily: "Caveat, cursive", fontSize: 32, color: "#fff", fontWeight: 700, lineHeight: 1, textShadow: "0 2px 8px rgba(0,0,0,0.25)" }}>
                  Зелёные руки
                </div>
                <div style={{ fontWeight: 800, fontSize: 13, color: "rgba(255,255,255,0.92)", marginTop: 4 }}>
                  Разнорабочие в Немчиновке
                </div>
              </div>
            </div>
            <span style={{
              background: "#FFD93D", color: "#1A2E1A",
              borderRadius: 20, padding: "6px 13px",
              fontWeight: 900, fontSize: 13, letterSpacing: 0.4, flexShrink: 0
            }}>
              📍 НЕМЧИНОВКА
            </span>
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

          <div style={{ padding: "12px 24px 150px", background: "#F0FBF4", borderTop: "2px solid #C6EDD5" }}>
            <div style={{
              fontWeight: 900, fontSize: 17, color: "#1A2E1A",
              borderLeft: "5px solid #A78BFA", paddingLeft: 11, marginBottom: 12
            }}>
              Как это работает
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { n: "1", e: "📞", t: "Звонок",  d: "Опишите задачу" },
                { n: "2", e: "🚗", t: "Приедем", d: "Точно в срок" },
                { n: "3", e: "✅", t: "Сделаем", d: "Аккуратно" },
                { n: "4", e: "💳", t: "Оплата",  d: "После работы" },
              ].map(s => (
                <div key={s.n} style={{
                  flex: 1, background: "#fff", borderRadius: 12,
                  padding: "12px 4px 10px", border: "2px solid #C6EDD5", textAlign: "center"
                }}>
                  <div style={{
                    width: 26, height: 26, background: "#3DBA6F",
                    borderRadius: "50%", color: "#fff", fontWeight: 900, fontSize: 14,
                    display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px"
                  }}>{s.n}</div>
                  <div style={{ fontSize: 24 }}>{s.e}</div>
                  <div style={{ fontWeight: 900, fontSize: 12, color: "#1A2E1A", marginTop: 4 }}>{s.t}</div>
                  <div style={{ fontSize: 10, color: "#777", fontWeight: 700, marginTop: 3, lineHeight: 1.3 }}>{s.d}</div>
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
              {["🛠️ Свой инструмент", "💯 Оплата после работы", "🚀 Срочный выезд — без доплат"].map(a => (
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