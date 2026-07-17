import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AreasAtuacao from './components/AreasAtuacao';
import Sobre from './components/Sobre';
import Diferenciais from './components/Diferenciais';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import FloatingWhatsapp from './components/FloatingWhatsapp';
import Footer from './components/Footer';
import LeadManagement from './components/LeadManagement';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [leadsOpen, setLeadsOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-charcoal-50 flex flex-col text-charcoal-900 selection:bg-gold-500/30 selection:text-charcoal-950">
      
      {/* Fixed top Header Navigation */}
      <Header />

      {/* Main Single Page Layout Sections */}
      <main className="flex-grow">
        
        {/* 1. Hero Landing Section */}
        <Hero />

        {/* 2. Practice Areas Grid */}
        <AreasAtuacao />

        {/* 3. Lawyer Biography & Academic Credentials */}
        <Sobre />

        {/* 4. Numbers and Differentials with counting animation */}
        <Diferenciais />

        {/* 5. Client Testimonials Carousel */}
        <Testimonials />

        {/* 6. Legal Consultation Request validated Form */}
        <ContactForm />

      </main>

      {/* Footer Details, OAB and Google Maps Frame */}
      <Footer onOpenLeads={() => setLeadsOpen(true)} />

      {/* Floating pulsing WhatsApp Action button */}
      <FloatingWhatsapp />

      {/* Sliding Lead Management Panel Drawer (Demo) */}
      <AnimatePresence>
        {leadsOpen && (
          <LeadManagement 
            isOpen={leadsOpen} 
            onClose={() => setLeadsOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
