import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Каковы сроки изготовления коронок из циркония?',
    a: 'Коронки из циркония изготавливаются за 3–5 рабочих дней. При срочном заказе возможно изготовление за 1–2 дня — уточняйте при оформлении заявки.',
  },
  {
    q: 'Сколько времени занимает изготовление мостовидных протезов?',
    a: 'Мостовидные конструкции из 3–4 единиц — 4–6 рабочих дней. Более протяжённые мосты (5+ единиц) — 6–8 дней в зависимости от сложности.',
  },
  {
    q: 'Какой срок изготовления съёмных протезов?',
    a: 'Съёмные акриловые и нейлоновые протезы готовятся за 5–7 рабочих дней. Металлические бюгельные конструкции — 7–10 дней.',
  },
  {
    q: 'Как работает курьерская доставка?',
    a: 'Вы звоните или пишете нам о новой работе — наш курьер приезжает в клинику и забирает слепки или модели в удобное для вас время. После изготовления готовая работа также доставляется курьером прямо в вашу клинику.',
  },
  {
    q: 'В какое время работает курьер?',
    a: 'Курьер работает в будние дни с 9:00 до 18:00. По предварительной договорённости возможна доставка в нестандартное время.',
  },
  {
    q: 'Платная ли доставка курьером?',
    a: 'Для клиник, работающих с нами на постоянной основе, доставка бесплатна. Для разовых заказов стоимость уточняется индивидуально.',
  },
  {
    q: 'Как происходит передача готового заказа?',
    a: 'Готовая работа упаковывается в индивидуальную маркированную коробку с паспортом изделия. Курьер передаёт её администратору клиники под подпись. При необходимости — фото готовой работы отправляем в мессенджер до доставки.',
  },
  {
    q: 'Можно ли забрать заказ самостоятельно?',
    a: 'Да, вы можете забрать готовую работу из лаборатории самостоятельно по адресу: г. Казань, ул. Технологическая, д. 12, офис 301. Режим работы: Пн–Пт с 9:00 до 18:00.',
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-cyan" />
            <span className="font-mono text-xs text-cyan tracking-[0.2em] uppercase">FAQ</span>
            <div className="w-8 h-px bg-cyan" />
          </div>
          <h2 className="text-3xl md:text-4xl font-inter font-bold text-foreground tracking-tight">
            Частые <span className="text-cyan">вопросы</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
            Сроки, доставка и передача готовых работ — всё что нужно знать
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full text-left flex items-center justify-between gap-4 px-5 py-4 border rounded-sm transition-all duration-300"
                style={{
                  borderColor: openIdx === i ? 'rgba(0,229,255,0.3)' : 'rgba(255,255,255,0.08)',
                  background: openIdx === i ? 'rgba(0,229,255,0.04)' : 'rgba(10,18,35,0.6)',
                }}
              >
                <span className="font-inter font-medium text-sm text-foreground">
                  {faq.q}
                </span>
                <ChevronDown
                  className="w-4 h-4 text-cyan shrink-0 transition-transform duration-300"
                  style={{ transform: openIdx === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              <AnimatePresence initial={false}>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 py-4 border border-t-0 rounded-b-sm border-cyan/15 bg-card/20">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}