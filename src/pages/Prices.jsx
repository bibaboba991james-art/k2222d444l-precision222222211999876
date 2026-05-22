import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Search, ChevronDown, ChevronUp, Phone, Mail, Zap, Gift, Truck, GraduationCap, Star } from 'lucide-react';

const promos = [
  { icon: Gift, title: 'Скидка 50% на первый заказ', desc: '50% скидка на первый заказ для новых клиник', tag: 'Акция' },
  { icon: Zap, title: 'Бесплатное принтование моделей', desc: 'При заказе любой конструкции', tag: 'Бонус' },
  { icon: Truck, title: 'Бесплатная доставка', desc: 'По Казани и за её пределы', tag: 'Бесплатно' },
  { icon: GraduationCap, title: 'Бесплатное обучение', desc: 'Курсы по сканированию и имплантации для врачей', tag: 'Для врачей' },
  { icon: Star, title: 'Интраоральный сканер в рассрочку', desc: 'Рассрочка без переплат на оборудование', tag: 'Рассрочка' },
  { icon: Zap, title: 'Техподдержка по сложным случаям', desc: 'Консультация специалиста бесплатно', tag: 'Поддержка' },
];

const sections = [
  {
    id: 1,
    title: 'Коронки и конструкции',
    items: [
      { n: 1, name: 'Металлокерамическая коронка, 1 ед.', price: 3500 },
      { n: 2, name: 'Металлокерамическая коронка на имплантате, винтовая фиксация, без абатмента, 1 ед.', price: 4000 },
      { n: 3, name: 'Цельнолитая коронка с покрытием, 1 ед.', price: 2200 },
      { n: 4, name: 'Штампованная коронка без напыления с покрытием, 1 ед.', price: 2350 },
      { n: 5, name: 'Штампованная коронка с облицовкой и покрытием, 1 ед.', price: 2650 },
      { n: 6, name: 'Коронка из ПММА, 1 ед.', price: 1600 },
      { n: 7, name: 'Временная коронка на имплантате, 1 ед.', price: 2200 },
      { n: 8, name: 'Фрезерованная коронка из ПММА, 1 ед.', price: 2000 },
      { n: 9, name: 'Примерочный прототип, 1 ед.', price: 400 },
      { n: 10, name: 'Напыление титаном, 1 ед.', price: 250 },
      { n: 11, name: 'Напыление цирконом, 1 ед.', price: 300 },
    ],
  },
  {
    id: 2,
    title: 'Вкладки',
    items: [
      { n: 12, name: 'Корневая вкладка, 1 канал, 1 ед.', price: 1300 },
      { n: 13, name: 'Корневая вкладка, 2 канала, 1 ед.', price: 1550 },
      { n: 14, name: 'Корневая вкладка, 3 канала, 1 ед.', price: 1700 },
      { n: 15, name: 'Вкладка из диоксида циркония, 1 ед. (Китай)', price: 5000 },
    ],
  },
  {
    id: 3,
    title: 'Циркониевые коронки. Полная анатомия',
    items: [
      { n: 16, name: 'Циркониевая коронка на зубе, диски Китай, 1 ед.', price: 5000 },
      { n: 17, name: 'Циркониевая коронка на имплантате без основания, диски Китай, 1 ед.', price: 5500 },
      { n: 18, name: 'Циркониевая коронка на имплантате с основанием, диски Китай, 1 ед.', price: 6400 },
      { n: 19, name: 'Циркониевая коронка на зубе, диски Aidite Китай, 1 ед.', price: 5500 },
      { n: 20, name: 'Циркониевая коронка на имплантате без основания, диски Aidite Китай, 1 ед.', price: 6500 },
      { n: 21, name: 'Циркониевая коронка на имплантате с основанием, диски Aidite Китай, 1 ед.', price: 7400 },
      { n: 22, name: 'Циркониевая коронка на зубе, диски Zirkonzahn Италия, 1 ед.', price: 7000 },
      { n: 23, name: 'Циркониевая коронка на имплантате без основания, Zirkonzahn Италия, 1 ед.', price: 8000 },
      { n: 24, name: 'Циркониевая коронка на имплантате с основанием, Zirkonzahn Италия, 1 ед.', price: 8900 },
    ],
  },
  {
    id: 4,
    title: 'Безметалловые конструкции',
    items: [
      { n: 25, name: 'Безметалловая коронка из пресс-керамики, 1 ед.', price: 6500 },
      { n: 26, name: 'E-max коронка методом прессования, 1 ед.', price: 7000 },
      { n: 27, name: 'E-max коронка или винир методом фрезерования, 1 ед.', price: 8000 },
      { n: 28, name: '3D-печать, 1 модель', price: 1000 },
    ],
  },
  {
    id: 5,
    title: 'Съёмные протезы',
    items: [
      { n: 29, name: 'Полный съёмный пластиночный протез, 1 челюсть', price: 5500 },
      { n: 30, name: 'Косметический протез на 1–3 зуба', price: 3850 },
      { n: 31, name: 'Бюгельный протез, 1 ед.', price: 11000 },
      { n: 32, name: 'Ацеталовый бюгельный протез, 1 ед.', price: 13000 },
      { n: 33, name: 'Бюгельный протез с замковой фиксацией, 1 ед.', price: 22000 },
      { n: 34, name: 'Ацеталовый протез на 1–3 зуба', price: 6000 },
      { n: 35, name: 'Нейлоновый протез на 1–3 зуба', price: 6300 },
      { n: 36, name: 'Полный нейлоновый протез, 1 челюсть', price: 10500 },
      { n: 37, name: 'Протез Акри-Фри, 1 челюсть', price: 11500 },
      { n: 38, name: 'Нейлоновый кламмер, 1 ед.', price: 2500 },
    ],
  },
  {
    id: 6,
    title: 'Балочные конструкции',
    items: [
      { n: 39, name: 'Протез, фиксируемый на балке, 1 ед.', price: 33000 },
      { n: 40, name: 'Титановая балка на 2–8 имплантатов, 1 конструкция', price: 18000 },
      { n: 41, name: 'Ответная часть из диоксида циркония, Китай, 4 импл. (12 ед.)', price: 66000 },
      { n: 42, name: 'Ответная часть из диоксида циркония, Китай, 6 импл. (12 ед.)', price: 66000 },
      { n: 43, name: 'Ответная часть из диоксида циркония, Китай, 8 импл. (14 ед.)', price: 77000 },
      { n: 44, name: 'Ответная часть из диоксида циркония, Aidite Китай, 4 импл. (12 ед.)', price: 78000 },
      { n: 45, name: 'Ответная часть из диоксида циркония, Aidite Китай, 6 импл. (12 ед.)', price: 78000 },
      { n: 46, name: 'Ответная часть из диоксида циркония, Aidite Китай, 8 импл. (14 ед.)', price: 91000 },
      { n: 47, name: 'Ответная часть из диоксида циркония, Zirkonzahn Италия, 4 импл. (12 ед.)', price: 108000 },
      { n: 48, name: 'Ответная часть из диоксида циркония, Zirkonzahn Италия, 6 импл. (12 ед.)', price: 108000 },
      { n: 49, name: 'Ответная часть из диоксида циркония, Zirkonzahn Италия, 8 импл. (14 ед.)', price: 126000 },
    ],
  },
  {
    id: 7,
    title: 'Диагностика, модели, абатменты',
    items: [
      { n: 50, name: 'Сканирование гипсовой модели, 1 ед.', price: 200 },
      { n: 51, name: 'Лабораторный трансферчек, 1 челюсть', price: 1000 },
      { n: 52, name: 'Прикусной шаблон из стандартного материала, 1 челюсть', price: 400 },
      { n: 53, name: 'Прикусной шаблон на жёстком базисе, 1 челюсть', price: 800 },
      { n: 54, name: 'Подбор мультиюнитов, 1 ед.', price: 4000 },
      { n: 55, name: 'Индивидуальный абатмент из диоксида циркония, Китай, 1 ед.', price: 3000 },
      { n: 56, name: 'Индивидуальный титановый абатмент, 1 ед.', price: 3000 },
      { n: 57, name: 'Анодирование и декоративное напыление, 1 ед.', price: 500 },
      { n: 58, name: 'Моделирование искусственной десны, 1 элемент', price: 500 },
      { n: 59, name: 'Титановое основание лаборатории, 1 шт.', price: 2000 },
      { n: 60, name: 'Фиксирующий винт, 1 шт.', price: 650 },
      { n: 61, name: 'Окрашивание циркониевой единицы краской Miyo, 1 ед.', price: 500 },
      { n: 62, name: 'Цифровой Wax-up с 3D-печатью, 1 модель', price: 600 },
      { n: 63, name: 'Индивидуальная оттискная ложка, 1 шт.', price: 700 },
    ],
  },
  {
    id: 8,
    title: 'Временные конструкции на имплантатах',
    items: [
      { n: 64, name: 'Диагностическая временная конструкция на имплантатах, 3D-печать, 1 ед.', price: 1000 },
      { n: 65, name: 'Диагностическая временная конструкция на имплантатах, фрезерование, 1 ед.', price: 2000 },
      { n: 66, name: 'Фрезерованная временная коронка из ПММА на имплантате, 1 ед.', price: 2000 },
    ],
  },
];

function fmt(n) {
  return n.toLocaleString('ru-RU') + ' ₽';
}

function PriceSection({ section, search }) {
  const [open, setOpen] = useState(true);
  const filtered = section.items.filter(
    (i) => !search || i.name.toLowerCase().includes(search.toLowerCase())
  );
  if (search && filtered.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="border border-border/40 rounded-sm overflow-hidden"
    >
      {/* Section header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-card/50 hover:bg-card/80 transition-colors group"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-cyan/50 w-5">{section.id}.</span>
          <span className="font-inter font-semibold text-foreground text-sm sm:text-base tracking-wide uppercase">
            {section.title}
          </span>
          <span className="hidden sm:inline font-mono text-[10px] text-muted-foreground/50 border border-border/30 px-2 py-0.5 rounded-sm">
            {section.items.length} позиций
          </span>
        </div>
        {open
          ? <ChevronUp className="w-4 h-4 text-cyan/50 group-hover:text-cyan transition-colors" />
          : <ChevronDown className="w-4 h-4 text-cyan/50 group-hover:text-cyan transition-colors" />
        }
      </button>

      {/* Table */}
      {open && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-y border-border/20 bg-background/30">
                <th className="px-5 py-2.5 text-left font-mono text-[10px] text-muted-foreground/50 uppercase tracking-wider w-10">№</th>
                <th className="px-5 py-2.5 text-left font-mono text-[10px] text-muted-foreground/50 uppercase tracking-wider">Наименование</th>
                <th className="px-5 py-2.5 text-right font-mono text-[10px] text-muted-foreground/50 uppercase tracking-wider whitespace-nowrap">Цена, ₽</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr
                  key={item.n}
                  className={`border-b border-border/10 transition-colors hover:bg-cyan/3 ${idx % 2 === 0 ? 'bg-transparent' : 'bg-card/20'}`}
                >
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground/40">{item.n}</td>
                  <td className="px-5 py-3 text-sm text-muted-foreground leading-relaxed">{item.name}</td>
                  <td className="px-5 py-3 text-right font-mono text-sm font-semibold text-cyan whitespace-nowrap">{fmt(item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}

export default function Prices() {
  const [search, setSearch] = useState('');

  const totalResults = sections.reduce((acc, s) => {
    return acc + s.items.filter(i => !search || i.name.toLowerCase().includes(search.toLowerCase())).length;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 border-b border-border/20">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,229,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[500px] h-[300px] bg-cyan/4 blur-3xl rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-cyan" />
            <span className="font-mono text-xs text-cyan tracking-[0.2em] uppercase">Прейскурант 2025</span>
            <div className="w-8 h-px bg-cyan" />
          </div>
          <h1 className="text-4xl md:text-5xl font-inter font-bold text-foreground tracking-tight mb-4">
            Прайс-лист <span className="text-cyan">КЗЛ</span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
            Цены указаны в рублях за единицу. Сроки уточняйте у менеджера.<br />
            Стоимость не включает расходные материалы заказчика.
          </p>

          {/* Stats bar */}
          <div className="flex justify-center gap-8 mt-10">
            {[
              { v: '66', l: 'позиций' },
              { v: '8', l: 'разделов' },
              { v: '50%', l: 'скидка новым' },
            ].map(s => (
              <div key={s.l} className="text-center">
                <div className="font-mono text-2xl font-bold text-cyan">{s.v}</div>
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promos */}
      <section className="py-14 border-b border-border/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px bg-cyan" />
            <span className="font-mono text-xs text-cyan tracking-[0.2em] uppercase">Акции и предложения</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {promos.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group relative flex items-start gap-4 p-4 border border-border/30 hover:border-cyan/30 rounded-sm bg-card/20 hover:bg-card/50 transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-sm border border-cyan/20 bg-cyan/5 flex items-center justify-center shrink-0 group-hover:bg-cyan/10 transition-colors">
                  <p.icon className="w-4 h-4 text-cyan" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-sm font-semibold text-foreground leading-tight">{p.title}</span>
                    <span className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 bg-cyan/10 text-cyan border border-cyan/20 rounded-sm whitespace-nowrap shrink-0">{p.tag}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search + Price table */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Search bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск по названию услуги..."
              className="w-full pl-11 pr-4 h-12 bg-card/40 border border-border/40 hover:border-cyan/20 focus:border-cyan/40 rounded-sm text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-colors font-inter"
            />
            {search && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] text-cyan/60">
                {totalResults} результатов
              </span>
            )}
          </div>

          {/* Sections */}
          <div className="space-y-3">
            {sections.map(s => (
              <PriceSection key={s.id} section={s} search={search} />
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-10 p-5 border border-border/20 rounded-sm bg-card/10 text-center">
            <p className="text-xs text-muted-foreground/70 leading-relaxed">
              Для сложных случаев — индивидуальная смета. Сроки изготовления уточняйте у менеджера.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 border-t border-border/20 bg-card/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-mono text-xs text-cyan/60 uppercase tracking-[0.2em] mb-3">Остались вопросы?</p>
          <h3 className="text-xl font-inter font-bold text-foreground mb-6">
            Свяжитесь с нами — рассчитаем стоимость под ваш случай
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="tel:+79992640184" className="flex items-center gap-2 px-6 py-3 bg-cyan text-obsidian font-semibold rounded-sm hover:bg-cyan-dark transition-colors text-sm">
              <Phone className="w-4 h-4" />
              +7 999 264-01-84
            </a>
            <a href="mailto:zublab116@yandex.ru" className="flex items-center gap-2 px-6 py-3 border border-cyan/30 text-cyan hover:bg-cyan/10 rounded-sm transition-colors text-sm font-medium">
              <Mail className="w-4 h-4" />
              zublab116@yandex.ru
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}