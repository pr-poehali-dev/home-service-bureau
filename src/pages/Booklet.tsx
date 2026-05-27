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

export default function Booklet() {
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [imgs, setImgs] = useState<Record<string, string>>({});

  useEffect(() => {
    Promise.all(
      Object.entries(IMG_URLS).map(async ([k, url]) => [k, await toDataUrl(url)])
    ).then(entries => setImgs(Object.fromEntries(entries)));
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

  const imgSrc = (key: string) => imgs[key] || IMG_URLS[key as keyof typeof IMG_URLS];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Caveat:wght@700&display=swap');

        @media print {
          .no-print { display: none !important; }
          body { margin: 0; background: #fff; }
          .a5-page {
            width: 148mm; height: 210mm; margin: 0; padding: 0;
            box-shadow: none !important; page-break-after: always; overflow: hidden;
          }
        }

        .a5-page {
          font-family: 'Nunito', sans-serif;
          width: 148mm; height: 210mm;
          background: #fff;
          margin: 0 auto;
          box-shadow: 0 8px 50px rgba(0,0,0,0.18);
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }

        .tag-badge {
          display: inline-flex; align-items: center; gap: 5px;
          background: #FFD93D; color: #1A2E1A;
          border-radius: 20px; padding: 3px 11px;
          font-weight: 900; font-size: 10px;
        }

        .price-row {
          display: flex; justify-content: space-between; align-items: center;
          border-radius: 10px; padding: 6px 10px; margin-bottom: 5px;
        }
      `}</style>

      {/* Toolbar */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-3">
        <a href="/" className="bg-white text-gray-700 font-bold px-4 py-2 rounded-xl shadow border border-gray-200 flex items-center gap-2 hover:bg-gray-50 text-sm">
          <Icon name="ArrowLeft" size={15} /> На сайт
        </a>
        <button onClick={handleDownload} disabled={loading}
          className="bg-green-600 text-white font-bold px-5 py-2 rounded-xl shadow-lg flex items-center gap-2 hover:bg-green-700 transition disabled:opacity-60 text-sm">
          <Icon name={loading ? "Loader2" : "FileDown"} size={15} />
          {loading ? "Генерация..." : "Скачать PDF (A5)"}
        </button>
        <button onClick={handlePrint}
          className="bg-gray-700 text-white font-bold px-5 py-2 rounded-xl shadow-lg flex items-center gap-2 hover:bg-gray-800 transition text-sm">
          <Icon name="Printer" size={15} /> Печать
        </button>
      </div>

      <div className="no-print min-h-screen bg-gray-300 py-12 px-4 flex flex-col items-center gap-10">
        <p className="text-gray-600 font-bold text-sm tracking-wide uppercase">Двусторонний буклет A5 · Сторона 1 и 2</p>
      </div>

      {/* ===== СТРАНИЦА 1 ===== */}
      <div className="a5-page" ref={page1Ref}>

        {/* Hero шапка */}
        <div style={{ background: 'linear-gradient(135deg, #1A7A3F 0%, #3DBA6F 60%, #A8E063 100%)', display: 'flex', alignItems: 'stretch', height: 148 }}>
          <div style={{ flex: 1, padding: '20px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
              <span style={{ fontSize: 28 }}>🌿</span>
              <span style={{ fontFamily: 'Caveat, cursive', fontSize: 32, color: '#fff', fontWeight: 700, lineHeight: 1, textShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>Зелёные руки</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.97)', fontWeight: 800, fontSize: 12, margin: '0 0 10px', lineHeight: 1.4 }}>
              Разнорабочие для сада,<br/>территории и дома
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span className="tag-badge">📍 Немчиновка</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.25)', color: '#fff', borderRadius: 20, padding: '3px 11px', fontWeight: 800, fontSize: 10 }}>
                🚀 Срочный выезд — без доплат
              </span>
            </div>
          </div>
          <div style={{ width: 138, flexShrink: 0, position: 'relative' }}>
            <img src={imgSrc("hero")} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} crossOrigin="anonymous" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #1A7A3F 0%, transparent 50%)' }} />
          </div>
        </div>

        {/* Слоган */}
        <div style={{ background: '#F0FBF4', padding: '11px 22px 9px', borderBottom: '2px solid #C6EDD5' }}>
          <p style={{ fontWeight: 900, fontSize: 15, color: '#1A2E1A', margin: '0 0 3px', lineHeight: 1.25 }}>
            Порядок на вашей территории — один звонок!
          </p>
          <p style={{ color: '#555', fontSize: 10.5, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
            Приедем с инструментом, выполним аккуратно, уберём за собой.<br/>
            <b style={{ color: '#3DBA6F' }}>Оплата только после выполнения. Без предоплаты.</b>
          </p>
        </div>

        {/* Прайс + картинка */}
        <div style={{ padding: '11px 22px 8px', background: '#F0FBF4', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ flexShrink: 0 }}>
            <img src={imgSrc("mower")} alt="" crossOrigin="anonymous"
              style={{ width: 108, height: 88, objectFit: 'cover', borderRadius: 14, border: '3px solid #C6EDD5', display: 'block' }} />
            <div style={{ background: '#FF6B6B', color: '#fff', borderRadius: 8, padding: '3px 7px', marginTop: 5, textAlign: 'center', fontWeight: 900, fontSize: 9.5 }}>
              🚀 Срочный выезд<br/>без доплат
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 900, fontSize: 13, color: '#1A2E1A', marginBottom: 6, borderLeft: '4px solid #3DBA6F', paddingLeft: 8 }}>Прайс-лист</div>
            <div className="price-row" style={{ background: '#FFD93D' }}>
              <span style={{ fontWeight: 800, fontSize: 11, color: '#1A2E1A' }}>🛠️ С нашим инструментом</span>
              <span style={{ fontWeight: 900, fontSize: 13, color: '#1A2E1A' }}>2 000 ₽/ч</span>
            </div>
            <div className="price-row" style={{ background: '#3DBA6F' }}>
              <span style={{ fontWeight: 800, fontSize: 11, color: '#fff' }}>🔑 С вашим инструментом</span>
              <span style={{ fontWeight: 900, fontSize: 13, color: '#fff' }}>1 500 ₽/ч</span>
            </div>
            <div className="price-row" style={{ background: '#A78BFA' }}>
              <span style={{ fontWeight: 800, fontSize: 11, color: '#fff' }}>⚡ Электрик / Сантехник</span>
              <span style={{ fontWeight: 900, fontSize: 13, color: '#fff' }}>3 000 ₽/ч</span>
            </div>
            <p style={{ fontSize: 9.5, color: '#666', fontWeight: 700, margin: '5px 0 0', lineHeight: 1.4 }}>Минимум 3 часа · Оплата после работы</p>
          </div>
        </div>

        {/* Услуги */}
        <div style={{ padding: '8px 22px 10px', background: '#F0FBF4' }}>
          <div style={{ fontWeight: 900, fontSize: 13, color: '#1A2E1A', margin: '0 0 7px', borderLeft: '4px solid #FFD93D', paddingLeft: 8 }}>Наши услуги</div>
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
              <div key={s.t} style={{ background: '#fff', borderRadius: 9, padding: '7px 4px', border: '2px solid #C6EDD5', textAlign: 'center' }}>
                <div style={{ fontSize: 17 }}>{s.e}</div>
                <div style={{ fontWeight: 800, fontSize: 8.5, color: '#1A2E1A', marginTop: 3, lineHeight: 1.3 }}>{s.t}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Футер */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(135deg, #1A2E1A 0%, #1A7A3F 100%)', padding: '13px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 20, color: '#fff', marginBottom: 3, lineHeight: 1 }}>🌿 Зелёные руки</div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 600, fontSize: 9, lineHeight: 1.6 }}>Работаем ежедневно · Без предоплаты</div>
          </div>
          <div style={{ background: '#FFD93D', color: '#1A2E1A', borderRadius: 12, padding: '8px 16px', textAlign: 'center' }}>
            <div style={{ fontWeight: 900, fontSize: 16 }}>📱 {PHONE}</div>
            <div style={{ fontWeight: 700, fontSize: 9, opacity: 0.65, marginTop: 2 }}>Звонок по России</div>
          </div>
        </div>

      </div>

      <div className="no-print" style={{ height: 40 }} />

      {/* ===== СТРАНИЦА 2 ===== */}
      <div className="a5-page" ref={page2Ref}>

        {/* Верхняя полоска */}
        <div style={{ background: 'linear-gradient(90deg, #1A7A3F, #A8E063)', height: 7 }} />

        {/* Большая иллюстрация с газонокосильщиком */}
        <div style={{ position: 'relative', height: 168 }}>
          <img src={imgSrc("mower")} alt="" crossOrigin="anonymous"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 30%, rgba(26,46,26,0.88) 100%)' }} />
          {/* Бейдж срочный выезд */}
          <div style={{ position: 'absolute', top: 12, right: 14, background: '#FF6B6B', color: '#fff', borderRadius: 10, padding: '5px 12px', fontWeight: 900, fontSize: 11 }}>
            🚀 Срочный выезд — без доплат
          </div>
          <div style={{ position: 'absolute', bottom: 14, left: 22, right: 22 }}>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 28, color: '#fff', fontWeight: 700, lineHeight: 1.15, textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>
              Ухоженный сад — это просто!
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.9)', fontWeight: 700, marginTop: 3 }}>
              Мы сделаем всё за вас — быстро и аккуратно
            </div>
          </div>
        </div>

        {/* Картинки сад + ремонт */}
        <div style={{ padding: '10px 22px 8px', background: '#F0FBF4', display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <img src={imgSrc("garden")} alt="" crossOrigin="anonymous"
              style={{ width: '100%', height: 72, objectFit: 'cover', borderRadius: 12, border: '2px solid #C6EDD5', display: 'block' }} />
            <div style={{ fontWeight: 800, fontSize: 10, color: '#1A2E1A', marginTop: 4, textAlign: 'center' }}>🌿 Идеальный сад</div>
          </div>
          <div style={{ flex: 1 }}>
            <img src={imgSrc("repair")} alt="" crossOrigin="anonymous"
              style={{ width: '100%', height: 72, objectFit: 'cover', borderRadius: 12, border: '2px solid #C6EDD5', display: 'block' }} />
            <div style={{ fontWeight: 800, fontSize: 10, color: '#1A2E1A', marginTop: 4, textAlign: 'center' }}>🔨 Мелкий ремонт</div>
          </div>
        </div>

        {/* Как работаем */}
        <div style={{ padding: '8px 22px', background: '#F0FBF4' }}>
          <div style={{ fontWeight: 900, fontSize: 13, color: '#1A2E1A', margin: '0 0 7px', borderLeft: '4px solid #A78BFA', paddingLeft: 8 }}>Как это работает</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { n: '1', e: '📞', t: 'Позвоните', d: 'Опишите задачу и время' },
              { n: '2', e: '🚗', t: 'Приедем', d: 'Точно в срок' },
              { n: '3', e: '✅', t: 'Сделаем', d: 'Аккуратно, уберём' },
              { n: '4', e: '💳', t: 'Оплата', d: 'Наличные / карта' },
            ].map(s => (
              <div key={s.n} style={{ flex: 1, background: '#fff', borderRadius: 10, padding: '7px 5px', border: '2px solid #C6EDD5', textAlign: 'center' }}>
                <div style={{ width: 20, height: 20, background: '#3DBA6F', borderRadius: '50%', color: '#fff', fontWeight: 900, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px' }}>{s.n}</div>
                <div style={{ fontSize: 17 }}>{s.e}</div>
                <div style={{ fontWeight: 800, fontSize: 9, color: '#1A2E1A', marginTop: 2 }}>{s.t}</div>
                <div style={{ fontSize: 8, color: '#777', fontWeight: 600, marginTop: 1, lineHeight: 1.3 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Преимущества */}
        <div style={{ padding: '7px 22px 9px', background: '#F0FBF4' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {['🛠️ Инструмент с собой', '📸 Фотоотчёт', '💯 Оплата после', '🏡 300+ объектов', '🚀 Срочный выезд — без доплат'].map(a => (
              <div key={a} style={{ background: '#fff', border: '2px solid #C6EDD5', borderRadius: 20, padding: '3px 10px', fontSize: 9.5, fontWeight: 700, color: '#1A2E1A' }}>
                {a}
              </div>
            ))}
          </div>
        </div>

        {/* Футер */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(135deg, #1A2E1A 0%, #1A7A3F 100%)', padding: '14px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <div>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 22, color: '#fff', marginBottom: 4 }}>🌿 Зелёные руки</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600, fontSize: 9, lineHeight: 1.7 }}>
                📍 Немчиновка и окрестности<br/>
                ⏰ Работаем ежедневно, без выходных<br/>
                💳 Наличные и карта · Без предоплаты
              </div>
            </div>
            <div style={{ background: '#FFD93D', color: '#1A2E1A', borderRadius: 12, padding: '9px 16px', textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontWeight: 900, fontSize: 17 }}>📱 {PHONE}</div>
              <div style={{ fontWeight: 700, fontSize: 8.5, opacity: 0.65, marginTop: 2 }}>Звонок по России</div>
            </div>
          </div>
        </div>

      </div>

      <div className="no-print" style={{ height: 60 }} />
    </>
  );
}
