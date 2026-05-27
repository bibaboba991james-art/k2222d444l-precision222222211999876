import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Send, CheckCircle2, Loader2, Phone, Clock, Shield } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const workTypes = [
  'Коронки из циркония',
  'Металлокерамика',
  'Виниры',
  'Мостовидные протезы',
  'Имплантация (абатменты)',
  'Съёмные протезы',
  'Другое',
];

const trustItems = [
  { icon: Clock, text: 'Ответ за 30 минут' },
  { icon: Shield, text: 'Гарантия 5 лет' },
  { icon: Phone, text: 'Бесплатная консультация' },
];

export default function RequestForm() {
  const [form, setForm] = useState({ work_type: '', name: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.work_type || !form.name || !form.phone) return;
    setSubmitting(true);

    await base44.functions.invoke('sendTelegramNotification', {
      name: form.name,
      phone: form.phone,
      work_type: form.work_type,
    });

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="request" className="relative py-24 md:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-cyan" />
              <span className="font-mono text-xs text-cyan tracking-[0.2em] uppercase">
                Связаться с нами
              </span>
              <div className="w-8 h-px bg-cyan" />
            </div>
            <h2 className="text-3xl md:text-4xl font-inter font-bold text-foreground tracking-tight">
              Оставить <span className="text-cyan">заявку</span>
            </h2>
            <p className="mt-3 text-muted-foreground text-sm">
              Заполните форму — мы перезвоним в течение 30 минут
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Left: Trust panel */}
            <div className="lg:col-span-2 space-y-4">
              {/* Trust items */}
              {trustItems.map((item) => (
                <div key={item.text} className="flex items-center gap-4 p-4 border border-border/30 rounded-sm bg-card/20">
                  <div className="w-10 h-10 rounded-sm border border-cyan/20 bg-cyan/5 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-cyan" />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">{item.text}</span>
                </div>
              ))}

              {/* Phone CTA */}
              <a
                href="tel:+79992640184"
                className="group flex items-center gap-4 p-4 border border-cyan/15 rounded-sm bg-card/30 hover:border-cyan/30 hover:bg-card/50 transition-all duration-300 mt-6"
              >
                <div className="w-10 h-10 rounded-sm bg-cyan/10 border border-cyan/30 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-cyan" />
                </div>
                <div>
                  <div className="font-mono text-sm text-foreground font-semibold">+7 999 264-01-84</div>
                  
                </div>
              </a>

              {/* Working hours */}
              <div className="p-4 border border-border/20 rounded-sm bg-card/10">
                <div className="font-mono text-[10px] text-cyan/60 uppercase tracking-wider mb-2">Режим работы</div>
                <div className="text-sm text-muted-foreground">Пн — Пт: <span className="text-foreground">9:00 — 18:00</span></div>
                <div className="text-xs text-muted-foreground/60 mt-1">Сб, Вс — выходной</div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <div className="relative border border-cyan/15 rounded-sm bg-card/40 backdrop-blur-sm p-6 sm:p-8"
                style={{ boxShadow: '0 0 60px rgba(0,229,255,0.04), inset 0 0 40px rgba(0,229,255,0.02)' }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyan/50 rounded-tl-sm" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-cyan/50 rounded-tr-sm" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-cyan/50 rounded-bl-sm" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyan/50 rounded-br-sm" />

                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-cyan/10 border border-cyan/30 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 className="w-8 h-8 text-cyan" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Заявка отправлена!
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      Мы свяжемся с вами в ближайшее время
                    </p>
                    <p className="font-mono text-xs text-cyan/60">— обычно в течение 30 минут</p>
                    <Button
                      variant="outline"
                      className="mt-8 border-cyan/30 text-cyan hover:bg-cyan/10 rounded-sm"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ work_type: '', name: '', phone: '' });
                      }}
                    >
                      Отправить ещё
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Step indicator */}
                    <div className="flex items-center gap-2 mb-6">
                      {['Тип работы', 'Контакты', 'Отправка'].map((step, idx) => (
                        <React.Fragment key={step}>
                          <div className="flex items-center gap-1.5">
                            <div className={`w-5 h-5 rounded-full border font-mono text-[9px] flex items-center justify-center transition-colors ${
                              idx === 0 && form.work_type ? 'border-cyan bg-cyan text-obsidian' :
                              idx === 1 && form.name && form.phone ? 'border-cyan bg-cyan text-obsidian' :
                              'border-border/50 text-muted-foreground/50'
                            }`}>
                              {idx + 1}
                            </div>
                            <span className="hidden sm:block font-mono text-[9px] text-muted-foreground/50 uppercase tracking-wider">{step}</span>
                          </div>
                          {idx < 2 && <div className="flex-1 h-px bg-border/30" />}
                        </React.Fragment>
                      ))}
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 block">
                        Вид работы
                      </label>
                      <Select
                        value={form.work_type}
                        onValueChange={(v) => setForm({ ...form, work_type: v })}
                      >
                        <SelectTrigger className="bg-secondary/40 border-border/40 hover:border-cyan/30 focus:border-cyan/50 rounded-sm h-12 text-foreground transition-colors">
                          <SelectValue placeholder="Выберите вид работы" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {workTypes.map((wt) => (
                            <SelectItem key={wt} value={wt}>{wt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 block">
                        Имя / Название клиники
                      </label>
                      <div className={`relative rounded-sm transition-all duration-200 ${focused === 'name' ? 'ring-1 ring-cyan/30' : ''}`}>
                        <Input
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          onFocus={() => setFocused('name')}
                          onBlur={() => setFocused(null)}
                          placeholder="Введите имя или название"
                          className="bg-secondary/40 border-border/40 hover:border-cyan/30 focus:border-cyan/50 rounded-sm h-12 text-foreground placeholder:text-muted-foreground/40"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 block">
                        Телефон
                      </label>
                      <div className={`relative rounded-sm transition-all duration-200 ${focused === 'phone' ? 'ring-1 ring-cyan/30' : ''}`}>
                        <Input
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          onFocus={() => setFocused('phone')}
                          onBlur={() => setFocused(null)}
                          placeholder="+7 (___) ___-__-__"
                          type="tel"
                          className="bg-secondary/40 border-border/40 hover:border-cyan/30 focus:border-cyan/50 rounded-sm h-12 text-foreground placeholder:text-muted-foreground/40 font-mono"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting || !form.work_type || !form.name || !form.phone}
                      className="w-full bg-cyan text-obsidian hover:bg-cyan-dark font-semibold rounded-sm h-12 text-sm tracking-wide transition-all duration-300 disabled:opacity-30 mt-2"
                    >
                      {submitting ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      Отправить заявку
                    </Button>

                    <p className="text-center text-[11px] text-muted-foreground/40 font-mono mt-2">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}