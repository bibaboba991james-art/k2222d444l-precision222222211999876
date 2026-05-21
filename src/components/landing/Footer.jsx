import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="relative">
      {/* Top divider with glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-cyan/60 blur-sm" />

      {/* Pre-footer CTA band */}
      <div className="bg-card/40 border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-mono text-xs text-cyan uppercase tracking-[0.2em] mb-1">Готовы начать?</p>
              <h3 className="text-xl font-inter font-bold text-foreground">
                Оставьте заявку — перезвоним за 30 минут
              </h3>
            </div>
            <a
              href="/#request"
              className="group flex items-center gap-2 px-6 py-3 bg-cyan text-obsidian font-semibold text-sm rounded-sm hover:bg-cyan-dark transition-all duration-300 shrink-0"
            >
              Оставить заявку
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-9 h-9 flex-shrink-0">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <polygon
                    points="18,2 32,10 32,26 18,34 4,26 4,10"
                    stroke="#00E5FF"
                    strokeWidth="1.5"
                    fill="rgba(0,229,255,0.06)"
                  />
                  <path
                    d="M13 14c0-2.8 1.8-5 5-5s5 2.2 5 5c0 1.5-.5 2.8-1 3.8-.8 1.5-1 3-1 4.2 0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1 0-1.2-.2-2.7-1-4.2-.5-1-.9-2.3-1-3.8z"
                    fill="#00E5FF"
                    opacity="0.85"
                  />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-inter font-bold text-xl tracking-[0.15em] text-foreground">КЗЛ</span>
                <span className="font-mono text-[9px] text-cyan/60 tracking-[0.25em] uppercase mt-0.5">Dental Lab</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Казанская зуботехническая лаборатория. Цифровое производство зубных протезов с 2009 года.
            </p>

            {/* Live status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-cyan/15 rounded-sm bg-card/30">
              <div className="w-2 h-2 rounded-full bg-cyan animate-pulse-glow" />
              <span className="font-mono text-[10px] text-cyan/70 uppercase tracking-wider">
                Online • Принимаем заказы
              </span>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-border/30">
              {[
                { v: '15+', l: 'лет' },
                { v: '5K+', l: 'работ/год' },
                { v: '0.01', l: 'мм' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-mono text-base font-bold text-cyan">{s.v}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-mono text-xs text-cyan uppercase tracking-[0.2em] mb-5">
              Контакты
            </h4>
            <div className="space-y-4">
              <a
                href="tel:+79992640184"
                className="group flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="w-8 h-8 rounded-sm border border-border/50 group-hover:border-cyan/30 flex items-center justify-center shrink-0 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-cyan" />
                </div>
                <div>
                  <div className="font-mono">+7 999 264-01-84</div>
                  <div className="text-xs text-muted-foreground/60 mt-0.5">Звонки и WhatsApp</div>
                </div>
              </a>
              <a
                href="mailto:Zublab116@yandex.ru"
                className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="w-8 h-8 rounded-sm border border-border/50 group-hover:border-cyan/30 flex items-center justify-center shrink-0 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-cyan" />
                </div>
                <span>Zublab116@yandex.ru</span>
              </a>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-mono text-xs text-cyan uppercase tracking-[0.2em] mb-5">
              Адрес
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-sm border border-border/50 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-cyan" />
                </div>
                <div>
                  г. Казань, ул. Технологическая, д. 12
                  <span className="block text-xs text-muted-foreground/60 mt-0.5">офис 301</span>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-sm border border-border/50 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5 text-cyan" />
                </div>
                <div>
                  <div>Пн — Пт: 9:00 — 18:00</div>
                  <div className="text-xs text-muted-foreground/60 mt-0.5">Сб, Вс — выходной</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs text-cyan uppercase tracking-[0.2em] mb-5">
              Навигация
            </h4>
            <div className="space-y-1">
              {[
                { label: 'О лаборатории', href: '/#about' },
                { label: 'Услуги', href: '/#services' },
                { label: 'Технологии', href: '/#tech' },
                { label: 'Оставить заявку', href: '/#request' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-cyan border-b border-border/20 hover:border-cyan/20 transition-all duration-200"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                </a>
              ))}
            </div>

            {/* Certification badges */}
            <div className="mt-6 flex gap-2">
              {['ISO 6872', 'ISO 9693'].map((cert) => (
                <div key={cert} className="px-2.5 py-1 border border-border/40 rounded-sm">
                  <span className="font-mono text-[9px] text-muted-foreground/70 uppercase tracking-wider">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs text-muted-foreground/50 font-mono">
            © 2025 КЗЛ — Казанская зуботехническая лаборатория
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex gap-1 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan/10" />
            </div>
            <div className="text-xs text-muted-foreground/30 font-mono">
              Precision Engineering for Modern Dentistry
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}