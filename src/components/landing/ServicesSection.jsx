import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const CROWN_IMG = 'https://media.base44.com/images/public/6a0d5f41b02c752e7da9527b/8fbe3a2af_generated_04271a77.png';
const BRIDGE_IMG = 'https://media.base44.com/images/public/6a0d5f41b02c752e7da9527b/62b33d2e6_generated_e42ad74b.png';
const VENEERS_IMG = 'https://media.base44.com/images/public/6a0d5f41b02c752e7da9527b/a6e25c8dc_generated_3a0a48d3.png';

const services = [
  {
    title: 'ЦИРКОНИЙ',
    subtitle: 'Коронки и мосты',
    image: CROWN_IMG,
    specs: [
      { label: 'Плотность', value: '6.05 г/см³' },
      { label: 'Транслюцентность', value: '49%' },
      { label: 'Фрезеровка', value: '~25 мин' },
    ],
    desc: 'Высокоэстетичные реставрации из высокотранслюцентного циркония. Естественная прозрачность и цветопередача.',
    tag: 'Топ выбор',
  },
  {
    title: 'МОСТЫ',
    subtitle: 'Мостовидные конструкции',
    image: BRIDGE_IMG,
    specs: [
      { label: 'Прочность', value: '1200 МПа' },
      { label: 'Точность', value: '0.01 мм' },
      { label: 'Гарантия', value: '5 лет' },
    ],
    desc: 'Мостовидные протезы любой протяженности. Цифровое проектирование обеспечивает идеальную посадку.',
    tag: null,
  },
  {
    title: 'ВИНИРЫ',
    subtitle: 'Эстетическая реставрация',
    image: VENEERS_IMG,
    specs: [
      { label: 'Толщина', value: '0.3 мм' },
      { label: 'Материал', value: 'E.max' },
      { label: 'Срок', value: '3 дня' },
    ],
    desc: 'Ультратонкие виниры из прессованной керамики. Безупречная эстетика и естественный вид.',
    tag: null,
  },
];

export default function ServicesSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-cyan" />
            <span className="font-mono text-xs text-cyan tracking-[0.2em] uppercase">
              Каталог услуг
            </span>
            <div className="w-8 h-px bg-cyan" />
          </div>
          <h2 className="text-3xl md:text-4xl font-inter font-bold text-foreground tracking-tight">
            Наши <span className="text-cyan">услуги</span>
          </h2>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.19, 1, 0.22, 1] }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group relative border rounded-sm overflow-hidden cursor-pointer transition-all duration-500"
              style={{
                borderColor: hovered === i ? 'rgba(0,229,255,0.4)' : 'rgba(255,255,255,0.08)',
                background: hovered === i
                  ? 'linear-gradient(135deg, rgba(0,20,40,0.95) 0%, rgba(10,24,50,0.98) 100%)'
                  : 'rgba(10,18,35,0.85)',
                boxShadow: hovered === i
                  ? '0 0 40px rgba(0,229,255,0.08), inset 0 0 40px rgba(0,229,255,0.03)'
                  : 'none',
              }}
            >
              {/* Top tag */}
              {service.tag && (
                <div className="absolute top-3 right-3 z-10 font-mono text-[9px] uppercase tracking-wider px-2 py-1 bg-cyan text-obsidian rounded-sm font-semibold">
                  {service.tag}
                </div>
              )}

              {/* Arrow icon on hover */}
              <div className={`absolute top-3 left-3 z-10 w-7 h-7 rounded-sm border border-cyan/30 bg-obsidian/70 flex items-center justify-center transition-all duration-300 ${hovered === i ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan" />
              </div>

              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={service.image}
                  alt={service.subtitle}
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{ transform: hovered === i ? 'scale(1.08)' : 'scale(1)' }}
                />
                {/* Gradient overlay — brightens slightly on hover */}
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: hovered === i
                      ? 'linear-gradient(to top, rgba(4,8,15,0.95) 0%, rgba(0,229,255,0.04) 60%, transparent 100%)'
                      : 'linear-gradient(to top, rgba(4,8,15,1) 0%, rgba(4,8,15,0.5) 50%, transparent 100%)',
                  }}
                />

                {/* Large background title */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div
                    className="font-inter font-bold text-3xl tracking-wider transition-all duration-500"
                    style={{ color: hovered === i ? 'rgba(0,229,255,0.2)' : 'rgba(255,255,255,0.08)' }}
                  >
                    {service.title}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-inter font-bold text-lg text-foreground mb-1 transition-colors duration-300 group-hover:text-cyan">
                  {service.subtitle}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {service.desc}
                </p>

                {/* Specs grid */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t transition-colors duration-300"
                  style={{ borderColor: hovered === i ? 'rgba(0,229,255,0.2)' : 'rgba(255,255,255,0.08)' }}
                >
                  {service.specs.map((spec) => (
                    <div key={spec.label}>
                      <div className="font-mono text-xs text-cyan font-medium">
                        {spec.value}
                      </div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                        {spec.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA link on hover */}
                <div className={`mt-4 flex items-center gap-1.5 font-mono text-[10px] text-cyan uppercase tracking-wider transition-all duration-300 ${hovered === i ? 'opacity-100' : 'opacity-0'}`}>
                  <span>Подробнее о услуге</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}