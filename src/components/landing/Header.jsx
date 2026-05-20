import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (isHome) {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/' + href);
      }
    }
  };

  const navItems = [
    { label: 'О нас', href: '#about' },
    { label: 'Услуги', href: '#services' },
    { label: 'Прайс', href: '/prices' },
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
          <a href="/" className="flex items-center gap-2 group">
            {/* Tooth silhouette with К letter inside */}
            <div className="relative flex-shrink-0">
              <svg width="48" height="56" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(0,229,255,0.7)]">
                {/* Filled tooth shape */}
                <path
                  d="
                    M 40,4
                    L 52,8 L 64,8 L 74,18
                    L 72,38 L 66,54
                    L 60,72 L 56,82
                    L 52,72 L 48,66
                    L 40,66
                    L 32,66 L 28,72
                    L 24,82 L 20,72
                    L 14,54 L 8,38
                    L 6,18 L 16,8
                    L 28,8 Z
                  "
                  fill="#00E5FF"
                />
                {/* Letter К cutout (white) */}
                <text
                  x="40"
                  y="52"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="Inter, Arial, sans-serif"
                  fontWeight="700"
                  fontSize="36"
                  fill="#04080F"
                  letterSpacing="-1"
                >К</text>
              </svg>
            </div>

            {/* Text */}
            <div className="flex flex-col leading-none">
              <span className="font-inter font-bold text-2xl tracking-[0.1em] text-cyan">
                КЗЛ
              </span>
              <span className="font-mono text-[10px] text-foreground/70 tracking-[0.2em] mt-0.5">
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
                onClick={(e) => handleNavClick(e, item.href)}
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
                  onClick={(e) => { handleNavClick(e, item.href); setMenuOpen(false); }}
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