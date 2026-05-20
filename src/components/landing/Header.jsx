import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'О нас', href: '#about' },
    { label: 'Услуги', href: '#services' },
    { label: 'Технологии', href: '#tech' },
    { label: 'Контакты', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-obsidian/90 backdrop-blur-xl border-b border-cyan/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            {/* Hexagon emblem */}
            <div className="relative w-9 h-9 flex-shrink-0">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Hexagon outline */}
                <polygon
                  points="18,2 32,10 32,26 18,34 4,26 4,10"
                  stroke="#00E5FF"
                  strokeWidth="1.5"
                  fill="rgba(0,229,255,0.06)"
                  className="transition-all duration-300 group-hover:fill-[rgba(0,229,255,0.12)]"
                />
                {/* Tooth silhouette */}
                <path
                  d="M13 14c0-2.8 1.8-5 5-5s5 2.2 5 5c0 1.5-.5 2.8-1 3.8-.8 1.5-1 3-1 4.2 0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1 0-1.2-.2-2.7-1-4.2-.5-1-.9-2.3-1-3.8z"
                  fill="#00E5FF"
                  opacity="0.85"
                />
              </svg>
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-cyan/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Text */}
            <div className="flex flex-col leading-none">
              <span className="font-inter font-bold text-xl tracking-[0.15em] text-foreground">
                КЗЛ
              </span>
              <span className="font-mono text-[9px] text-cyan/60 tracking-[0.25em] uppercase mt-0.5">
                Dental Lab
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-cyan transition-colors duration-300 tracking-wide uppercase"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:88002554200"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="w-4 h-4 text-cyan" />
              <span className="font-mono text-sm">8 800 255-42-00</span>
            </a>
            <a href="#request">
              <Button className="bg-cyan text-obsidian font-semibold hover:bg-cyan-dark px-6 rounded-sm text-sm tracking-wide">
                Оставить заявку
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-obsidian/95 backdrop-blur-xl border-b border-cyan/10"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm font-medium text-muted-foreground hover:text-cyan transition-colors uppercase tracking-wide py-2"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border">
                <a href="tel:88002554200" className="flex items-center gap-2 text-sm text-muted-foreground py-2">
                  <Phone className="w-4 h-4 text-cyan" />
                  <span className="font-mono">8 800 255-42-00</span>
                </a>
                <a href="#request" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full mt-3 bg-cyan text-obsidian font-semibold hover:bg-cyan-dark rounded-sm">
                    Оставить заявку
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}