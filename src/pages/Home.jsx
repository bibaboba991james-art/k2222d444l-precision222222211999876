import React, { useEffect } from 'react';
import Header from '../components/landing/Header';
import HeroSection from '../components/landing/HeroSection';
import AboutSection from '../components/landing/AboutSection';
import ServicesSection from '../components/landing/ServicesSection';
import TechSection from '../components/landing/TechSection';
import RequestForm from '../components/landing/RequestForm';
import DeliverySection from '../components/landing/DeliverySection';
import Footer from '../components/landing/Footer';
import FaqSection from '../components/landing/FaqSection';

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TechSection />
      <DeliverySection />
      <RequestForm />
      <FaqSection />
      <Footer />
    </div>
  );
}