import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

const workTypes = [
  'Коронки из циркония',
  'Металлокерамика',
  'Виниры',
  'Мостовидные протезы',
  'Имплантация (абатменты)',
  'Съёмные протезы',
  'Другое',
];

export default function RequestForm() {
  const [form, setForm] = useState({ work_type: '', name: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.work_type || !form.name || !form.phone) return;

    setSubmitting(true);
    await base44.entities.LeadRequest.create({
      work_type: form.work_type,
      name: form.name,
      phone: form.phone,
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="request" className="relative py-24 md:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Header */}
          <div className="text-center mb-10">
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

          {/* Form panel */}
          <div className="relative border border-cyan/15 rounded-sm bg-card/40 backdrop-blur-sm border-glow p-6 sm:p-8">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan/40" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan/40" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan/40" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan/40" />

            {submitted ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-12 h-12 text-cyan mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Заявка отправлена!
                </h3>
                <p className="text-sm text-muted-foreground">
                  Мы свяжемся с вами в ближайшее время
                </p>
                <Button
                  variant="outline"
                  className="mt-6 border-cyan/30 text-cyan hover:bg-cyan/10 rounded-sm"
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
                <div>
                  <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 block">
                    Вид работы
                  </Label>
                  <Select
                    value={form.work_type}
                    onValueChange={(v) => setForm({ ...form, work_type: v })}
                  >
                    <SelectTrigger className="bg-secondary/50 border-border/50 hover:border-cyan/30 focus:border-cyan/50 rounded-sm h-12 text-foreground">
                      <SelectValue placeholder="Выберите вид работы" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {workTypes.map((wt) => (
                        <SelectItem key={wt} value={wt}>
                          {wt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 block">
                    Имя / Название клиники
                  </Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Введите имя или название"
                    className="bg-secondary/50 border-border/50 hover:border-cyan/30 focus:border-cyan/50 rounded-sm h-12 text-foreground placeholder:text-muted-foreground/50"
                  />
                </div>

                <div>
                  <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 block">
                    Телефон
                  </Label>
                  <Input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    type="tel"
                    className="bg-secondary/50 border-border/50 hover:border-cyan/30 focus:border-cyan/50 rounded-sm h-12 text-foreground placeholder:text-muted-foreground/50 font-mono"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting || !form.work_type || !form.name || !form.phone}
                  className="w-full bg-cyan text-obsidian hover:bg-cyan-dark font-semibold rounded-sm h-12 text-sm tracking-wide transition-all duration-300 disabled:opacity-40"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Отправить заявку — мы перезвоним
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}