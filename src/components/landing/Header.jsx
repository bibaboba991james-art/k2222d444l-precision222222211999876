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
            {/* Hexagon + clean tooth emblem */}
            <div className="relative flex-shrink-0">
              <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(0,229,255,0.6)]">
                {/* Hexagon background */}
                <polygon
                  points="50,5 91,27.5 91,72.5 50,95 9,72.5 9,27.5"
                  fill="#06101E"
                  stroke="#00E5FF"
                  strokeWidth="2"
                />
                {/*
                  Clean tooth silhouette:
                  Two cusps on top, body narrows, two roots at bottom.
                  Path: start top-left, go clockwise.
                */}
                <path
                  d="
                    M 33,38
                    C 31,28 33,18 40,16
                    C 44,14 47,20 50,18
                    C 53,20 56,14 60,16
                    C 67,18 69,28 67,38
                    C 65,48 62,54 60,62
                    L 57,78
                    L 53,62
                    L 50,58
                    L 47,62
                    L 43,78
                    L 40,62
                    C 38,54 35,48 33,38
                    Z
                  "
                  fill="none"
                  stroke="#00E5FF"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {/* Crown dividing line */}
                <line x1="34" y1="42" x2="66" y2="42" stroke="#00E5FF" strokeWidth="1.2" strokeLinecap="round"/>
                {/* Center groove */}
                <line x1="50" y1="18" x2="50" y2="42" stroke="#00E5FF" strokeWidth="1" strokeLinecap="round"/>
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