import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HERO_IMG = 'https://media.base44.com/images/public/6a0d5f41b02c752e7da9527b/75124c0f3_generated_b45402b3.png';
const EXOCAD_IMG = 'https://media.base44.com/images/public/6a0d5f41b02c752e7da9527b/b574bf0b3_generated_image.png';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 229, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Scanning line animation */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent animate-scan" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 md:pt-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-20">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="order-2 lg:order-1"
          >
            {/* Technical label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-cyan" />
              <span className="font-mono text-xs text-cyan tracking-[0.2em] uppercase">
                Digital Dental Lab
              </span>
            </div>

            <h1 className="font-inter font-bold tracking-tight leading-[0.95]">
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-foreground">
                КАЗАНСКАЯ
              </span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl text-muted-foreground font-light mt-2">
                зуботехническая
              </span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl text-muted-foreground font-light">
                лаборатория
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed">
              Точность. Эстетика. Инновационные технологии.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a href="#about">
                <Button
                  variant="outline"
                  className="border-cyan/30 text-cyan hover:bg-cyan/10 hover:border-cyan/60 rounded-sm px-8 py-5 font-medium tracking-wide transition-all duration-300"
                >
                  Узнать больше
                </Button>
              </a>
              <a href="#request">
                <Button className="bg-cyan text-obsidian hover:bg-cyan-dark rounded-sm px-8 py-5 font-semibold tracking-wide">
                  Оставить заявку
                </Button>
              </a>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/50">
              {[
                { value: '15+', label: 'лет опыта' },
                { value: '5000+', label: 'работ в год' },
                { value: '0.01', label: 'мм точность' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-cyan text-glow">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — 3D jaw image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-cyan/5 rounded-2xl blur-3xl scale-110" />

              {/* Main jaw image */}
              <img
                src={HERO_IMG}
                alt="3D модель верхней челюсти с цветовой картой анализа"
                className="relative w-full max-w-lg mx-auto lg:max-w-none rounded-lg"
              />

              {/* Exocad interface overlay — bottom right */}
              <div className="absolute -bottom-4 -right-2 sm:bottom-0 sm:right-0 w-48 sm:w-64 border border-cyan/20 rounded-sm overflow-hidden glow-cyan">
                <img
                  src={EXOCAD_IMG}
                  alt="Интерфейс Exocad"
                  className="w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
                <div className="absolute bottom-2 left-2 font-mono text-[10px] text-cyan/70">
                  EXOCAD DentalCAD
                </div>
              </div>

              {/* Tech label top left */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-obsidian/80 backdrop-blur-sm border border-cyan/20 rounded-sm px-3 py-1.5">
                <div className="w-2 h-2 rounded-full bg-cyan animate-pulse-glow" />
                <span className="font-mono text-[10px] text-cyan/80 uppercase tracking-wider">
                  Heatmap Analysis
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
            Scroll
          </span>
          <ArrowDown className="w-4 h-4 text-cyan/50 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}