import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Cog, ScanLine, Shield, Zap, Award } from 'lucide-react';

const SCANNER_IMG = 'https://media.base44.com/images/public/6a0d5f41b02c752e7da9527b/5ad6906c0_generated_image.png';
const CAD_IMG = 'https://media.base44.com/images/public/6a0d5f41b02c752e7da9527b/b574bf0b3_generated_image.png';
const MILLING_IMG = 'https://media.base44.com/images/public/6a0d5f41b02c752e7da9527b/2860fa658_frezernye-cad-cam-stanki-2.jpg';

const steps = [
  {
    icon: ScanLine,
    step: '01',
    title: '3D-сканирование',
    desc: 'Оптический скан модели с точностью до 7 микрон',
  },
  {
    icon: Monitor,
    step: '02',
    title: 'CAD-моделирование',
    desc: 'Проектирование в Exocad DentalCAD с цифровой артикуляцией',
  },
  {
    icon: Cog,
    step: '03',
    title: 'CAM-фрезеровка',
    desc: '5-осевая фрезеровка из монолитных блоков циркония',
  },
  {
    icon: Shield,
    step: '04',
    title: 'Контроль качества',
    desc: 'Повторное сканирование и сверка с цифровой моделью',
  },
];

const advantages = [
  { icon: Zap, label: 'Сроки от 3 дней' },
  { icon: Award, label: 'Гарантия 5 лет' },
  { icon: Shield, label: 'Сертификаты ISO' },
];

export default function TechSection() {
  return (
    <section id="tech" className="relative py-24 md:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
              Технологический процесс
            </span>
            <div className="w-8 h-px bg-cyan" />
          </div>
          <h2 className="text-3xl md:text-4xl font-inter font-bold text-foreground tracking-tight">
            Как мы <span className="text-cyan">работаем</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="relative group"
            >
              {/* Connecting line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] right-0 h-px bg-gradient-to-r from-cyan/30 to-transparent" />
              )}

              <div className="p-6 border border-border/50 hover:border-cyan/30 rounded-sm bg-card/30 hover:bg-card/60 transition-all duration-400">
                <div className="flex items-center gap-3 mb-4">
                  <step.icon className="w-5 h-5 text-cyan" />
                  <span className="font-mono text-2xl font-bold text-cyan/20 group-hover:text-cyan/40 transition-colors">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-inter font-semibold text-foreground mb-2 text-sm">
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Photo showcase */}
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {[
            { src: SCANNER_IMG, label: '3D-сканирование', sub: 'Оптический скан 7 мкм' },
            { src: CAD_IMG, label: 'CAD-моделирование', sub: 'Exocad DentalCAD' },
            { src: MILLING_IMG, label: 'CNC-фрезеровка', sub: '5-осевой станок' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="relative overflow-hidden rounded-sm border border-border/50 group"
            >
              <img
                src={item.src}
                alt={item.label}
                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <div className="font-mono text-[10px] text-cyan/70 uppercase tracking-wider">{item.sub}</div>
                <div className="font-inter font-semibold text-sm text-foreground">{item.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Advantages bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 py-8 border-t border-b border-border/30"
        >
          {advantages.map((a) => (
            <div key={a.label} className="flex items-center gap-3">
              <a.icon className="w-5 h-5 text-cyan" />
              <span className="text-sm font-medium text-muted-foreground">
                {a.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}