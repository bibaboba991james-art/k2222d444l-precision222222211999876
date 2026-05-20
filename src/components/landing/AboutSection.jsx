import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ScanLine, Target, Layers } from 'lucide-react';

const MILLING_IMG = 'https://media.base44.com/images/public/6a0d5f41b02c752e7da9527b/2860fa658_frezernye-cad-cam-stanki-2.jpg';

const features = [
  {
    icon: Cpu,
    title: 'Цифровое производство',
    desc: 'CAD/CAM моделирование с точностью до 0.01 мм',
  },
  {
    icon: Target,
    title: 'Exocad DentalCAD',
    desc: 'Проектирование конструкций любой сложности',
  },
  {
    icon: ScanLine,
    title: '3D-сканирование',
    desc: 'Оптические сканеры с высоким разрешением',
  },
  {
    icon: Layers,
    title: 'Цирконий и металл',
    desc: 'Фрезеровка на 5-осевых станках',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-cyan/3 rounded-lg blur-2xl" />
              <img
                src={MILLING_IMG}
                alt="Фрезеровка циркония на CNC станке"
                className="relative w-full rounded-sm border border-cyan/10"
              />
              {/* Overlay label */}
              <div className="absolute bottom-4 left-4 bg-obsidian/90 backdrop-blur-sm border border-cyan/20 rounded-sm px-4 py-2">
              <div className="font-mono text-[10px] text-cyan/60 uppercase tracking-wider mb-0.5">
                CNC Precision Milling
              </div>
              <div className="font-mono text-sm text-foreground">
                5-Axis • CAD/CAM • 0.01mm
              </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-cyan" />
              <span className="font-mono text-xs text-cyan tracking-[0.2em] uppercase">
                О лаборатории
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-inter font-bold text-foreground tracking-tight">
              Современное цифровое
              <br />
              <span className="text-cyan">производство</span>
            </h2>

            <p className="mt-6 text-muted-foreground leading-relaxed text-base">
              Мы используем передовые технологии Exocad для моделирования сложных
              конструкций из циркония и металла. Каждая работа проходит полный
              цикл цифрового контроля качества — от 3D-сканирования до финальной
              фрезеровки.
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group p-4 rounded-sm border border-border/50 hover:border-cyan/30 bg-card/50 hover:bg-card transition-all duration-300"
                >
                  <f.icon className="w-5 h-5 text-cyan mb-3 group-hover:text-glow transition-all" />
                  <div className="text-sm font-semibold text-foreground mb-1">
                    {f.title}
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {f.desc}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}