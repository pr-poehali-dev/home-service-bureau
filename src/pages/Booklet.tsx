import { useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const HERO_IMG = "https://cdn.poehali.dev/projects/51c43cc5-e4ab-4fb5-b4d5-6eeedb27040f/files/f4d5704d-c0ed-4c1e-ab3e-8a89a6fdab8e.jpg";
const MOWER_IMG = "https://cdn.poehali.dev/projects/51c43cc5-e4ab-4fb5-b4d5-6eeedb27040f/files/7fae84f7-deb7-412c-b9e8-9f5dd31f5a2e.jpg";
const GARDEN_IMG = "https://cdn.poehali.dev/projects/51c43cc5-e4ab-4fb5-b4d5-6eeedb27040f/files/302f505b-14d8-406e-98a4-3164f6b02976.jpg";
const REPAIR_IMG = "https://cdn.poehali.dev/projects/51c43cc5-e4ab-4fb5-b4d5-6eeedb27040f/files/8e4d9aa9-9c40-4646-b57f-db70b35b9bbb.jpg";

const PHONE = "8 (936) 141-42-32";
const PHONE_RAW = "89361414232";

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

      const canvas1 = await html2canvas(page1Ref.current, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: "#fff" });
      pdf.addImage(canvas1.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, pageW, pageH);

      pdf.addPage("a5", "portrait");
      const canvas2 = await html2canvas(page2Ref.current, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: "#fff" });
      pdf.addImage(canvas2.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, pageW, pageH);

      pdf.save("zelenye-ruki-buklet.pdf");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Caveat:wght@700&display=swap');

        @media print {
          .no-print { display: none !important; }
          body { margin: 0; background: #fff; }
          .a5-page {
            width: 148mm;
            height: 210mm;
            margin: 0;
            padding: 0;
            box-shadow: none !important;
            page-break-after: always;
            overflow: hidden;
          }
        }

        .a5-page {
          font-family: 'Nunito', sans-serif;
          width: 148mm;
          height: 210mm;
          background: #fff;
          margin: 0 auto;
          box-shadow: 0 4px 40px rgba(0,0,0,0.14);
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }
      `}</style>

      {/* Toolbar */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-3">
        <a href="/" className="bg-white text-gray-700 font-bold px-4 py-2 rounded-xl shadow border border-gray-200 flex items-center gap-2 hover:bg-gray-50 text-sm">
          <Icon name="ArrowLeft" size={15} /> На сайт
        </a>
        <button
          onClick={handleDownload}
          disabled={loading}
          className="bg-green-600 text-white font-bold px-5 py-2 rounded-xl shadow-lg flex items-center gap-2 hover:bg-green-700 transition disabled:opacity-60 text-sm"
        >
          <Icon name={loading ? "Loader2" : "FileDown"} size={15} />
          {loading ? "Генерация..." : "Скачать PDF (A5)"}
        </button>
        <button
          onClick={handlePrint}
          className="bg-gray-700 text-white font-bold px-5 py-2 rounded-xl shadow-lg flex items-center gap-2 hover:bg-gray-800 transition text-sm"
        >
          <Icon name="Printer" size={15} /> Печать
        </button>
      </div>

      {/* Preview wrapper */}
      <div className="no-print min-h-screen bg-gray-200 py-10 px-4 flex flex-col items-center gap-2">
        <p className="text-gray-500 font-semibold mb-4 text-sm">Двусторонний буклет A5 · Сторона 1 и Сторона 2</p>
      </div>

      {/* ========== PAGE 1 (лицевая) ========== */}
      <div className="a5-page" ref={page1Ref}>

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #3DBA6F 0%, #A8E063 100%)', display: 'flex', alignItems: 'stretch', height: 130 }}>
          <div style={{ flex: 1, padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 24 }}>🌿</span>
              <span style={{ fontFamily: 'Caveat, cursive', fontSize: 28, color: '#fff', fontWeight: 700, lineHeight: 1 }}>Зелёные руки</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.95)', fontWeight: 800, fontSize: 11, margin: '0 0 8px', lineHeight: 1.3 }}>
              Разнорабочие для сада, территории и дома
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#FFD93D', color: '#1A2E1A', borderRadius: 20, padding: '3px 10px', fontWeight: 900, fontSize: 10, width: 'fit-content' }}>
              📍 Немчиновка и окрестности
            </div>
          </div>
          <div style={{ width: 130, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
            <img src={HERO_IMG} alt="Разнорабочий" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #3DBA6F 0%, transparent 40%)' }} />
          </div>
        </div>

        {/* Tagline */}
        <div style={{ background: '#F7FDF4', padding: '10px 20px 8px', borderBottom: '2px solid #e2f5e8' }}>
          <p style={{ fontWeight: 900, fontSize: 14, color: '#1A2E1A', margin: '0 0 2px', lineHeight: 1.2 }}>
            Порядок на вашей территории — один звонок!
          </p>
          <p style={{ color: '#555', fontSize: 9.5, fontWeight: 600, margin: 0, lineHeight: 1.4 }}>
            Приедем с инструментом, выполним аккуратно, уберём за собой. Оплата только после выполнения. Без предоплаты.
          </p>
        </div>

        {/* Mower illustration */}
        <div style={{ padding: '10px 20px 4px', background: '#F7FDF4', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <img src={MOWER_IMG} alt="Покос газона" style={{ width: 100, height: 80, objectFit: 'cover', borderRadius: 12, flexShrink: 0, border: '2px solid #e2f5e8' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 900, fontSize: 12, color: '#1A2E1A', marginBottom: 4, borderLeft: '3px solid #3DBA6F', paddingLeft: 7 }}>Прайс-лист</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFD93D', borderRadius: 8, padding: '4px 8px' }}>
                <span style={{ fontWeight: 800, fontSize: 10, color: '#1A2E1A' }}>🛠️ С нашим инструментом</span>
                <span style={{ fontWeight: 900, fontSize: 12, color: '#1A2E1A' }}>2 000 ₽/ч</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#3DBA6F', borderRadius: 8, padding: '4px 8px' }}>
                <span style={{ fontWeight: 800, fontSize: 10, color: '#fff' }}>🔑 С вашим инструментом</span>
                <span style={{ fontWeight: 900, fontSize: 12, color: '#fff' }}>1 500 ₽/ч</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#A78BFA', borderRadius: 8, padding: '4px 8px' }}>
                <span style={{ fontWeight: 800, fontSize: 10, color: '#fff' }}>⚡ Электрик / Сантехник</span>
                <span style={{ fontWeight: 900, fontSize: 12, color: '#fff' }}>3 000 ₽/ч</span>
              </div>
            </div>
            <p style={{ fontSize: 8.5, color: '#888', fontWeight: 700, margin: '4px 0 0' }}>Минимум 3 часа · Срочный выезд без доплат</p>
          </div>
        </div>

        {/* Services grid */}
        <div style={{ padding: '8px 20px', background: '#F7FDF4' }}>
          <div style={{ fontWeight: 900, fontSize: 12, color: '#1A2E1A', margin: '0 0 6px', borderLeft: '3px solid #FFD93D', paddingLeft: 7 }}>Наши услуги</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
            {[
              { e: '🌿', t: 'Уход за садом' },
              { e: '✂️', t: 'Стрижка газона' },
              { e: '🍂', t: 'Уборка двора' },
              { e: '⛏️', t: 'Земляные работы' },
              { e: '🔨', t: 'Мелкий ремонт' },
              { e: '✨', t: 'Уборка дома' },
              { e: '⚡', t: 'Электрик' },
              { e: '🔧', t: 'Сантехник' },
            ].map(s => (
              <div key={s.t} style={{ background: '#fff', borderRadius: 7, padding: '6px 4px', border: '1.5px solid #e2f5e8', textAlign: 'center' }}>
                <div style={{ fontSize: 14 }}>{s.e}</div>
                <div style={{ fontWeight: 800, fontSize: 8, color: '#1A2E1A', marginTop: 2, lineHeight: 1.3 }}>{s.t}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1A2E1A 0%, #2a5c3a 100%)', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <div>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 18, color: '#fff', marginBottom: 2, lineHeight: 1 }}>🌿 Зелёные руки</div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 600, fontSize: 8 }}>Работаем ежедневно · Без предоплаты</div>
          </div>
          <div style={{ background: '#FFD93D', color: '#1A2E1A', borderRadius: 10, padding: '7px 14px', textAlign: 'center' }}>
            <div style={{ fontWeight: 900, fontSize: 15 }}>📱 {PHONE}</div>
            <div style={{ fontWeight: 700, fontSize: 8, opacity: 0.7 }}>Звонок по России</div>
          </div>
        </div>

      </div>

      {/* Spacer between pages in preview */}
      <div className="no-print" style={{ height: 32 }} />

      {/* ========== PAGE 2 (оборотная) ========== */}
      <div className="a5-page" ref={page2Ref}>

        {/* Top accent */}
        <div style={{ background: 'linear-gradient(135deg, #A8E063 0%, #3DBA6F 100%)', height: 8 }} />

        {/* Hero illustration — газонокосильщик */}
        <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
          <img src={MOWER_IMG} alt="Работник косит траву" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(26,46,26,0.85) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 12, left: 20, right: 20 }}>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 26, color: '#fff', fontWeight: 700, lineHeight: 1.1 }}>
              Ухоженный сад — это просто!
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.85)', fontWeight: 700, marginTop: 2 }}>Мы сделаем всё за вас — быстро и аккуратно</div>
          </div>
        </div>

        {/* Garden + repair images */}
        <div style={{ padding: '10px 20px', background: '#F7FDF4', display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <img src={GARDEN_IMG} alt="Красивый сад" style={{ width: '100%', height: 70, objectFit: 'cover', borderRadius: 10, border: '2px solid #e2f5e8', display: 'block' }} />
            <div style={{ fontWeight: 800, fontSize: 9.5, color: '#1A2E1A', marginTop: 4, textAlign: 'center' }}>🌿 Идеальный сад</div>
          </div>
          <div style={{ flex: 1 }}>
            <img src={REPAIR_IMG} alt="Ремонт забора" style={{ width: '100%', height: 70, objectFit: 'cover', borderRadius: 10, border: '2px solid #e2f5e8', display: 'block' }} />
            <div style={{ fontWeight: 800, fontSize: 9.5, color: '#1A2E1A', marginTop: 4, textAlign: 'center' }}>🔨 Мелкий ремонт</div>
          </div>
        </div>

        {/* How it works */}
        <div style={{ padding: '8px 20px', background: '#F7FDF4' }}>
          <div style={{ fontWeight: 900, fontSize: 12, color: '#1A2E1A', margin: '0 0 8px', borderLeft: '3px solid #A78BFA', paddingLeft: 7 }}>Как это работает</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { n: '1', e: '📞', t: 'Позвоните', d: 'Опишите задачу и удобное время' },
              { n: '2', e: '🚗', t: 'Мы приедем', d: 'Точно в назначенное время' },
              { n: '3', e: '✅', t: 'Выполним', d: 'Аккуратно, уберём после' },
              { n: '4', e: '💳', t: 'Оплата после', d: 'Наличные или карта' },
            ].map(s => (
              <div key={s.n} style={{ flex: 1, background: '#fff', borderRadius: 8, padding: '7px 5px', border: '1.5px solid #e2f5e8', textAlign: 'center' }}>
                <div style={{ width: 18, height: 18, background: '#3DBA6F', borderRadius: '50%', color: '#fff', fontWeight: 900, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px' }}>{s.n}</div>
                <div style={{ fontSize: 15 }}>{s.e}</div>
                <div style={{ fontWeight: 800, fontSize: 8, color: '#1A2E1A', marginTop: 2 }}>{s.t}</div>
                <div style={{ fontSize: 7.5, color: '#777', fontWeight: 600, marginTop: 1, lineHeight: 1.3 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Advantages */}
        <div style={{ padding: '8px 20px', background: '#F7FDF4' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {[
              '🛠️ Инструмент с собой',
              '📸 Фотоотчёт',
              '💯 Оплата после',
              '⭐ Рейтинг 4.9',
              '🏡 300+ объектов',
              '🚀 Срочный выезд без доплат',
            ].map(a => (
              <div key={a} style={{ background: '#fff', border: '1.5px solid #e2f5e8', borderRadius: 20, padding: '3px 9px', fontSize: 8.5, fontWeight: 700, color: '#1A2E1A' }}>
                {a}
              </div>
            ))}
          </div>
        </div>

        {/* QR / Contact block */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(135deg, #1A2E1A 0%, #2a5c3a 100%)', padding: '14px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <div>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 20, color: '#fff', marginBottom: 3 }}>🌿 Зелёные руки</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600, fontSize: 8.5, lineHeight: 1.5 }}>
                📍 Немчиновка и окрестности<br />
                ⏰ Работаем ежедневно, без выходных<br />
                💳 Наличные и карта · Без предоплаты
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <a href={`tel:${PHONE_RAW}`} style={{ display: 'inline-block', background: '#FFD93D', color: '#1A2E1A', borderRadius: 10, padding: '8px 14px', textDecoration: 'none' }}>
                <div style={{ fontWeight: 900, fontSize: 16 }}>📱 {PHONE}</div>
                <div style={{ fontWeight: 700, fontSize: 8, opacity: 0.65, marginTop: 2 }}>Звонок по России</div>
              </a>
            </div>
          </div>
        </div>

      </div>

      <div className="no-print" style={{ height: 60 }} />
    </>
  );
}
