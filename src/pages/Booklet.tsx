import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/51c43cc5-e4ab-4fb5-b4d5-6eeedb27040f/files/f4d5704d-c0ed-4c1e-ab3e-8a89a6fdab8e.jpg";

export default function Booklet() {
  const handlePrint = () => window.print();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Caveat:wght@700&display=swap');

        @media print {
          .no-print { display: none !important; }
          body { margin: 0; background: #fff; }
          .print-page {
            width: 210mm;
            min-height: 297mm;
            margin: 0;
            padding: 0;
            box-shadow: none !important;
            page-break-after: avoid;
          }
        }

        .print-page {
          font-family: 'Nunito', sans-serif;
          width: 210mm;
          min-height: 297mm;
          background: #fff;
          margin: 0 auto;
          box-shadow: 0 4px 40px rgba(0,0,0,0.12);
          position: relative;
          overflow: hidden;
        }
      `}</style>

      {/* Toolbar */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-3">
        <a href="/" className="bg-white text-gray-700 font-bold px-4 py-2 rounded-xl shadow border border-gray-200 flex items-center gap-2 hover:bg-gray-50">
          <Icon name="ArrowLeft" size={16} /> На сайт
        </a>
        <button
          onClick={handlePrint}
          className="bg-green-600 text-white font-bold px-5 py-2 rounded-xl shadow-lg flex items-center gap-2 hover:bg-green-700 transition"
        >
          <Icon name="Download" size={16} /> Скачать / Печать PDF
        </button>
      </div>

      <div className="no-print min-h-screen bg-gray-100 py-10 flex flex-col items-center">
        <p className="text-gray-500 font-semibold mb-6 text-sm">Предпросмотр буклета A4 · Нажмите «Скачать / Печать PDF»</p>
      </div>

      <div className="print-page">

        {/* HEADER */}
        <div style={{ background: 'linear-gradient(135deg, #3DBA6F 0%, #A8E063 100%)', display: 'flex', alignItems: 'stretch', minHeight: 180 }}>
          <div style={{ flex: 1, padding: '28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 30 }}>🌿</span>
              <span style={{ fontFamily: 'Caveat, cursive', fontSize: 34, color: '#fff', fontWeight: 700, lineHeight: 1 }}>Зелёные руки</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.95)', fontWeight: 800, fontSize: 14, margin: '0 0 10px' }}>
              Разнорабочие для сада, территории и дома
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FFD93D', color: '#1A2E1A', borderRadius: 20, padding: '5px 14px', fontWeight: 900, fontSize: 12, width: 'fit-content' }}>
              📍 Немчиновка и окрестности
            </div>
          </div>
          <div style={{ width: 200, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
            <img
              src={HERO_IMG}
              alt="Разнорабочий"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #3DBA6F 0%, transparent 40%)' }} />
          </div>
        </div>

        {/* TAGLINE */}
        <div style={{ background: '#F7FDF4', padding: '14px 32px 10px', borderBottom: '2px solid #e2f5e8' }}>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 20, color: '#1A2E1A', margin: '0 0 4px', lineHeight: 1.2 }}>
            Порядок на вашей территории — один звонок!
          </p>
          <p style={{ color: '#555', fontSize: 12, fontWeight: 600, margin: 0 }}>
            Приедем с инструментом, выполним аккуратно и уберём за собой. Оплата только после выполнения. Без предоплаты.
          </p>
        </div>

        {/* PRICES */}
        <div style={{ padding: '14px 32px', background: '#F7FDF4' }}>
          <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 16, color: '#1A2E1A', margin: '0 0 10px', borderLeft: '4px solid #3DBA6F', paddingLeft: 10 }}>
            Прайс-лист
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <div style={{ background: '#FFD93D', borderRadius: 14, padding: '14px 16px' }}>
              <div style={{ fontSize: 22, marginBottom: 3 }}>🛠️</div>
              <div style={{ fontWeight: 900, fontSize: 13, color: '#1A2E1A', marginBottom: 1 }}>Со своим инструментом</div>
              <div style={{ fontWeight: 900, fontSize: 22, color: '#1A2E1A' }}>2 000 ₽/ч</div>
              <div style={{ fontSize: 10, color: '#555', fontWeight: 600, marginTop: 3 }}>Инструмент наш</div>
              <div style={{ fontSize: 10, color: '#333', fontWeight: 800, marginTop: 4 }}>Мин. 3 часа · от 6 000 ₽</div>
            </div>
            <div style={{ background: '#3DBA6F', borderRadius: 14, padding: '14px 16px' }}>
              <div style={{ fontSize: 22, marginBottom: 3 }}>🔑</div>
              <div style={{ fontWeight: 900, fontSize: 13, color: '#fff', marginBottom: 1 }}>С вашим инструментом</div>
              <div style={{ fontWeight: 900, fontSize: 22, color: '#fff' }}>1 500 ₽/ч</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.85)', fontWeight: 600, marginTop: 3 }}>Инструмент ваш</div>
              <div style={{ fontSize: 10, color: '#fff', fontWeight: 800, marginTop: 4 }}>Мин. 3 часа · от 4 500 ₽</div>
            </div>
            <div style={{ background: '#A78BFA', borderRadius: 14, padding: '14px 16px' }}>
              <div style={{ fontSize: 22, marginBottom: 3 }}>⚡</div>
              <div style={{ fontWeight: 900, fontSize: 13, color: '#fff', marginBottom: 1 }}>Электрик / Сантехник</div>
              <div style={{ fontWeight: 900, fontSize: 22, color: '#fff' }}>3 000 ₽/ч</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.85)', fontWeight: 600, marginTop: 3 }}>Профильный специалист</div>
              <div style={{ fontSize: 10, color: '#fff', fontWeight: 800, marginTop: 4 }}>Мин. 3 часа · от 9 000 ₽</div>
            </div>
          </div>
        </div>

        {/* SERVICES */}
        <div style={{ padding: '12px 32px', background: '#F7FDF4' }}>
          <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 16, color: '#1A2E1A', margin: '0 0 10px', borderLeft: '4px solid #FFD93D', paddingLeft: 10 }}>
            Наши услуги
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[
              { e: '🌿', t: 'Уход за садом', d: 'Обрезка кустов, деревьев, живых изгородей' },
              { e: '✂️', t: 'Стрижка газона', d: 'Покос травы и уборка скошенного' },
              { e: '🍂', t: 'Уборка территории', d: 'Листья, мусор, ветки после шторма' },
              { e: '⛏️', t: 'Земляные работы', d: 'Грядки, посадка растений, дренаж' },
              { e: '🔨', t: 'Мелкий ремонт', d: 'Заборы, ворота, беседки, постройки' },
              { e: '✨', t: 'Уборка дома', d: 'Генеральная и поддерживающая уборка' },
              { e: '⚡', t: 'Электрик', d: 'Проводка, розетки, освещение, монтаж' },
              { e: '🔧', t: 'Сантехник', d: 'Трубы, смесители, насосы, полив' },
            ].map(s => (
              <div key={s.t} style={{ background: '#fff', borderRadius: 10, padding: '10px', border: '1.5px solid #e2f5e8' }}>
                <div style={{ fontSize: 18, marginBottom: 3 }}>{s.e}</div>
                <div style={{ fontWeight: 800, fontSize: 11, color: '#1A2E1A', marginBottom: 2 }}>{s.t}</div>
                <div style={{ fontSize: 9, color: '#777', fontWeight: 600, lineHeight: 1.4 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div style={{ padding: '12px 32px', background: '#F7FDF4' }}>
          <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 16, color: '#1A2E1A', margin: '0 0 10px', borderLeft: '4px solid #A78BFA', paddingLeft: 10 }}>
            Как это работает
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { n: '1', e: '📞', t: 'Позвоните', d: 'Опишите задачу и удобное время' },
              { n: '2', e: '🚗', t: 'Мы приедем', d: 'Точно в назначенное время' },
              { n: '3', e: '✅', t: 'Выполним', d: 'Аккуратно, с уборкой после' },
              { n: '4', e: '💳', t: 'Оплата после', d: 'Наличные или карта. Без предоплаты' },
            ].map(s => (
              <div key={s.n} style={{ flex: 1, background: '#fff', borderRadius: 10, padding: '12px 10px', border: '1.5px solid #e2f5e8', textAlign: 'center' }}>
                <div style={{ width: 24, height: 24, background: '#3DBA6F', borderRadius: '50%', color: '#fff', fontWeight: 900, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 5px' }}>{s.n}</div>
                <div style={{ fontSize: 20, marginBottom: 3 }}>{s.e}</div>
                <div style={{ fontWeight: 800, fontSize: 10, color: '#1A2E1A', marginBottom: 2 }}>{s.t}</div>
                <div style={{ fontSize: 9, color: '#777', fontWeight: 600, lineHeight: 1.4 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ADVANTAGES */}
        <div style={{ padding: '12px 32px 14px', background: '#F7FDF4' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { e: '🛠️', t: 'Инструмент с собой' },
              { e: '📸', t: 'Фотоотчёт после' },
              { e: '💯', t: 'Оплата после работы' },
              { e: '⭐', t: 'Рейтинг 4.9' },
              { e: '🏡', t: '300+ объектов' },
              { e: '🚀', t: 'Срочный выезд без доплат' },
            ].map(a => (
              <div key={a.t} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#fff', borderRadius: 8, padding: '8px 4px', border: '1.5px solid #e2f5e8' }}>
                <div style={{ fontSize: 16 }}>{a.e}</div>
                <div style={{ fontSize: 8, fontWeight: 700, color: '#1A2E1A', textAlign: 'center', marginTop: 3, lineHeight: 1.3 }}>{a.t}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1A2E1A 0%, #2a5c3a 100%)', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 24, color: '#fff', marginBottom: 4, lineHeight: 1 }}>🌿 Зелёные руки</div>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 600, fontSize: 11 }}>Немчиновка и окрестности · Работаем ежедневно</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: 10, marginTop: 3 }}>Оплата после работы · Без предоплаты · Срочный выезд без доплат</div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ background: '#FFD93D', color: '#1A2E1A', borderRadius: 12, padding: '10px 20px', marginBottom: 6 }}>
              <div style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.5px' }}>📱 8 800 234-71-20</div>
              <div style={{ fontWeight: 700, fontSize: 10, marginTop: 2, opacity: 0.7 }}>Звонок бесплатный</div>
            </div>
          </div>
        </div>

      </div>

      <div className="no-print h-20" />
    </>
  );
}
