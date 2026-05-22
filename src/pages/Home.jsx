import React from 'react';
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