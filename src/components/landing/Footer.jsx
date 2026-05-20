import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-inter font-bold tracking-tight mb-4">
              <span className="text-cyan text-glow">К</span>
              <span className="text-foreground">З</span>
              <span className="text-foreground">Л</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Казанская зуботехническая лаборатория. Цифровое производство
              зубных протезов с 2009 года.
            </p>
            {/* Live status */}
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 border border-cyan/15 rounded-sm bg-card/30">
              <div className="w-2 h-2 rounded-full bg-cyan animate-pulse-glow" />
              <span className="font-mono text-[10px] text-cyan/70 uppercase tracking-wider">
                Online • Принимаем заказы
              </span>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-mono text-xs text-cyan uppercase tracking-[0.2em] mb-5">
              Контакты
            </h4>
            <div className="space-y-4">
              <a
                href="tel:88002554200"
                className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan mt-0.5 shrink-0" />
                <div>
                  <div className="font-mono">8 800 255-42-00</div>
                  <div className="text-xs text-muted-foreground/60 mt-0.5">Бесплатно по РФ</div>
                </div>
              </a>
              <a
                href="mailto:info@kzl-lab.ru"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan shrink-0" />
                <span>info@kzl-lab.ru</span>
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
                <MapPin className="w-4 h-4 text-cyan mt-0.5 shrink-0" />
                <div>
                  г. Казань, ул. Технологическая, д. 12, офис 301
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-cyan mt-0.5 shrink-0" />
                <div>
                  <div>Пн — Пт: 9:00 — 18:00</div>
                  <div className="text-xs text-muted-foreground/60 mt-0.5">Сб, Вс — выходной</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-mono text-xs text-cyan uppercase tracking-[0.2em] mb-5">
              Навигация
            </h4>
            <div className="space-y-3">
              {[
                { label: 'О нас', href: '#about' },
                { label: 'Услуги', href: '#services' },
                { label: 'Технологии', href: '#tech' },
                { label: 'Оставить заявку', href: '#request' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-cyan transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs text-muted-foreground/50 font-mono">
            © 2025 КЗЛ — Казанская зуботехническая лаборатория
          </div>
          <div className="text-xs text-muted-foreground/30 font-mono">
            Precision Engineering for Modern Dentistry
          </div>
        </div>
      </div>
    </footer>
  );
}