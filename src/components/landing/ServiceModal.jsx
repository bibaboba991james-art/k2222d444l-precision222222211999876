import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';

const SERVICE_DETAILS = {
  'ЦИРКОНИЙ': {
    process: [
      'Получение слепков или цифрового скана от клиники',
      'CAD-проектирование коронки в exocad DentalCAD',
      'Фрезеровка из монолитного блока диоксида циркония',
      'Синтеризация в печи при 1500°C для достижения финальной прочности',
      'Покраска, глазуровка и финишная полировка',
      'Контроль посадки, окраски и качества поверхности',
    ],
    features: [
      'Прочность 900–1200 МПа — выдерживает жевательные нагрузки',
      'Высокотранслюцентный циркон — естественная прозрачность',
      'Биосовместим — не вызывает реакции тканей',
      'Не требует металлического каркаса',
      'Срок службы 15+ лет при правильном уходе',
    ],
    timing: 'Стандартный срок: 3–5 рабочих дней. Срочно: 1–2 дня (уточняйте).',
    warranty: '5 лет',
  },
  'МОСТЫ': {
    process: [
      'Прием слепков или STL-файлов цифрового скана',
      'Виртуальное планирование конструкции с учетом прикуса',
      'CAD/CAM проектирование каждой единицы моста',
      'Фрезеровка из цельного блока (циркон, металл или комбинированный)',
      'Облицовка керамикой при необходимости',
      'Финальная проверка посадки и окклюзии на моделях',
    ],
    features: [
      'Любая протяжённость — от 3 до 14 единиц',
      'Точность прилегания ≤ 0.01 мм',
      'Совместимость со всеми имплант-системами',
      'Цифровое проектирование исключает погрешности ручного труда',
      'Гарантия 5 лет на конструкцию',
    ],
    timing: 'Мост 3–4 ед.: 3–4 дня. Мост 5+ ед.: 4–5 дней.',
    warranty: '5 лет',
  },
  'ВИНИРЫ': {
    process: [
      'Изучение слепков и фотопротокола улыбки',
      'Wax-up и согласование формы с врачом и пациентом',
      'Прессование виниров из заготовок IPS e.max Press',
      'Кастомная покраска и нанесение глазури',
      'Финишная полировка до зеркального блеска',
      'Проверка цвета при разном освещении',
    ],
    features: [
      'Толщина от 0.3 мм — минимальное препарирование зуба',
      'Материал IPS e.max — эталон эстетики в стоматологии',
      'Индивидуальный подбор цвета по шкале VITA',
      'Долговечность 10–15 лет',
      'Устойчивость к окрашиванию от кофе, чая, вина',
    ],
    timing: 'Стандартный срок: 3–4 рабочих дня. Срочно: 2 дня.',
    warranty: '3 года',
  },
};

export default function ServiceModal({ service, onClose }) {
  if (!service) return null;
  const details = SERVICE_DETAILS[service.title];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm border border-cyan/20 bg-card/95 backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative flex items-start justify-between p-6 pb-4 border-b border-border/30">
            <div>
              <div className="font-mono text-[10px] text-cyan uppercase tracking-[0.2em] mb-1">{service.title}</div>
              <h3 className="font-inter font-bold text-xl text-foreground">{service.subtitle}</h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-sm border border-border/50 bg-background/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-cyan/30 transition-all shrink-0 ml-4"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>

            {/* Specs */}
            <div className="grid grid-cols-3 gap-3 p-4 border border-border/30 rounded-sm bg-background/30">
              {service.specs.map((spec) => (
                <div key={spec.label} className="text-center">
                  <div className="font-mono text-lg font-bold text-cyan">{spec.value}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{spec.label}</div>
                </div>
              ))}
            </div>

            {/* Process */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-px bg-cyan" />
                <span className="font-mono text-[10px] text-cyan uppercase tracking-wider">Процесс изготовления</span>
              </div>
              <ol className="space-y-2">
                {details.process.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="font-mono text-[10px] text-cyan/50 mt-0.5 shrink-0 w-4">{String(i + 1).padStart(2, '0')}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Features */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-px bg-cyan" />
                <span className="font-mono text-[10px] text-cyan uppercase tracking-wider">Преимущества</span>
              </div>
              <ul className="space-y-2">
                {details.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timing + Warranty */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 border border-border/30 rounded-sm bg-background/30">
                <div className="font-mono text-[9px] text-cyan/60 uppercase tracking-wider mb-1">Сроки</div>
                <p className="text-xs text-muted-foreground">{details.timing}</p>
              </div>
              <div className="p-4 border border-border/30 rounded-sm bg-background/30">
                <div className="font-mono text-[9px] text-cyan/60 uppercase tracking-wider mb-1">Гарантия</div>
                <p className="text-lg font-mono font-bold text-cyan">{details.warranty}</p>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#request"
              onClick={onClose}
              className="flex items-center justify-center w-full py-3 bg-cyan text-obsidian font-semibold text-sm rounded-sm hover:bg-cyan-dark transition-all duration-300"
            >
              Оставить заявку на {service.subtitle.toLowerCase()}
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}