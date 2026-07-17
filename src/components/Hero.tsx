import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { OFFICE_INFO } from '../data';
// @ts-ignore
import lawyerImage from '../assets/images/lawyer_profile_headshot_1784240972839.jpg';

// Use the generated image path
const LAWYER_IMAGE_PATH = lawyerImage;

export default function Hero() {
  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contato');
    if (contactSection) {
      const offset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen bg-charcoal-950 legal-gradient flex items-center pt-28 pb-16 md:py-32 overflow-hidden legal-grid-pattern"
    >
      {/* Golden atmospheric glow elements */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/10 w-80 h-80 rounded-full bg-navy-500/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Hero Left Content */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#372b21] leading-tight mb-6"
          >
            Excelência jurídica para <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500">
              proteger o seu patrimônio
            </span> <br />
            e garantir seus direitos.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-sm md:text-base bg-white text-[#4a4a4a] p-4 rounded-sm leading-relaxed max-w-xl mb-10 shadow-md"
          >
            Atuação jurídica de alta performance, focada em soluções preventivas e de contencioso estratégico para pessoas físicas e jurídicas. Oferecemos assessoria personalizada, pautada em sigilo, técnica apurada e agilidade.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <a
              href={OFFICE_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-gold-500 to-gold-600 text-charcoal-950 font-sans font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-sm hover:from-gold-400 hover:to-gold-500 transition-all duration-300 shadow-xl gold-glow-hover hover:-translate-y-0.5 active:translate-y-0 active:scale-98"
            >
              <MessageSquare size={16} />
              <span>Agendar Consulta</span>
            </a>

            <button
              onClick={handleScrollToContact}
              className="flex items-center justify-center gap-2 border border-gold-500/40 hover:border-gold-400 text-gold-400 hover:text-gold-300 font-sans font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-sm transition-all duration-300 hover:bg-gold-500/5 hover:-translate-y-0.5 active:translate-y-0 active:scale-98"
            >
              <span>Entrar em contato</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>


        </div>

        {/* Hero Right Content (Image) */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: 40, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative w-full max-w-[360px] md:max-w-[400px] aspect-[3/4]"
          >
            {/* Elegant Background Gold Border Frame */}
            <div className="absolute top-4 -left-4 w-full h-full border border-gold-500/30 rounded-sm -z-10" />
            <div className="absolute -top-4 left-4 w-full h-full border border-gold-500/10 rounded-sm -z-10" />

            {/* Corner gold brackets */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-gold-400" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-gold-400" />

            {/* Image Container */}
            <div className="w-full h-full overflow-hidden border border-gold-500/20 bg-charcoal-900 rounded-sm shadow-2xl relative group">
              <img
                src={LAWYER_IMAGE_PATH}
                alt="Dra. Gabriela Silveira - Advogada"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 filter brightness-[0.93] contrast-[1.05]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              
              {/* Floating micro credentials card */}
              <div className="absolute bottom-4 left-4 right-4 bg-charcoal-900/90 backdrop-blur-sm border border-gold-500/30 p-4 rounded-sm flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-xs font-bold text-white tracking-wider uppercase">Dra. Gabriela Silveira</h4>
                  <p className="font-sans text-[10px] text-gold-400 uppercase tracking-widest mt-0.5">Fundadora & Advogada Sócia</p>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Disponível para consultas" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
