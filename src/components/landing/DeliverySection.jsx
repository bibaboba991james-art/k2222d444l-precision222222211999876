import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Package, Truck, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Phone,
    number: '01',
    title: 'Звонок или сообщение',
    desc: 'Клиника сообщает о новой работе — звонком или в мессенджере',
  },
  {
    icon: Truck,
    number: '02',
    title: 'Курьер забирает',
    desc: 'Наш курьер приезжает и забирает работы прямо из клиники',
  },
  {
    icon: Package,
    number: '03',
    title: 'Изготовление',
    desc: 'Лаборатория выполняет работу в оговорённые сроки',
  },
  {
    icon: CheckCircle,
    number: '04',
    title: 'Курьер доставляет',
    desc: 'Готовая работа привозится обратно в клинику курьером',
  },
];

export default function DeliverySection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-cyan" />
              <span className="font-mono text-xs text-cyan tracking-[0.2em] uppercase">
                Логистика
              </span>
              <div className="w-8 h-px bg-cyan" />
            </div>
            <h2 className="text-3xl md:text-4xl font-inter font-bold text-foreground tracking-tight">
              Как работает <span className="text-cyan">доставка</span>
            </h2>
            <p className="mt-3 text-muted-foreground text-sm max-w-md mx-auto">
              Вам не нужно никуда ехать — курьер сам забирает и привозит
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(100%-1px)] w-full h-px bg-gradient-to-r from-cyan/30 to-transparent z-0 pointer-events-none" style={{ width: 'calc(100% - 2.5rem)', left: 'calc(2.5rem + 1px)' }} />
                )}

                <div className="relative border border-border/30 rounded-sm bg-card/30 p-6 hover:border-cyan/25 hover:bg-card/50 transition-all duration-300 h-full">
                  {/* Step number */}
                  <div className="font-mono text-[10px] text-cyan/40 tracking-widest mb-4">{step.number}</div>

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-sm border border-cyan/20 bg-cyan/5 flex items-center justify-center mb-4 group-hover:border-cyan/40 group-hover:bg-cyan/10 transition-all duration-300">
                    <step.icon className="w-5 h-5 text-cyan" />
                  </div>

                  <h3 className="font-inter font-semibold text-foreground text-sm mb-2">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="mt-8 text-center">
            <p className="font-mono text-xs text-muted-foreground/50 uppercase tracking-wider">
              Доставка по Казани · Бесплатно при постоянном сотрудничестве
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}