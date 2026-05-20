import React from 'react';
import { motion } from 'framer-motion';

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
  },
];

export default function ServicesSection() {
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
              className="group relative border border-border/50 hover:border-cyan/30 rounded-sm bg-card/30 hover:bg-card/60 transition-all duration-500 overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={service.image}
                  alt={service.subtitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

                {/* Large background title */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="font-inter font-bold text-3xl text-foreground/10 tracking-wider">
                    {service.title}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-inter font-bold text-lg text-foreground mb-1">
                  {service.subtitle}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {service.desc}
                </p>

                {/* Specs grid */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/50">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}