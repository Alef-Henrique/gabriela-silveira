import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, Briefcase, HeartHandshake, ShieldAlert, Coins, Gavel, X, MessageSquare, ArrowUpRight } from 'lucide-react';
import { AREAS_ATUACAO } from '../data';
import { AreaAtuacao } from '../types';

// Map icon names to Lucide Icon components
const iconMap: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
  Scale,
  Briefcase,
  HeartHandshake,
  ShieldAlert,
  Coins,
  Gavel
};

export default function AreasAtuacao() {
  const [selectedArea, setSelectedArea] = useState<AreaAtuacao | null>(null);

  // Animation variants for the stagger container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for individual cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const handleConsultationRequest = (areaTitle: string) => {
    setSelectedArea(null);
    // Find the contact form's select element
    const selectElement = document.getElementById('areaOfInterest') as HTMLSelectElement;
    if (selectElement) {
      // Find matching option (loose match or direct)
      const options = Array.from(selectElement.options);
      const matchingOption = options.find(opt => 
        opt.value.toLowerCase().includes(areaTitle.toLowerCase().substring(0, 10)) ||
        areaTitle.toLowerCase().includes(opt.value.toLowerCase().substring(0, 10))
      );
      if (matchingOption) {
        selectElement.value = matchingOption.value;
        // Trigger change event so react-hook-form detects it
        const event = new Event('change', { bubbles: true });
        selectElement.dispatchEvent(event);
      }
    }
    
    // Scroll to contact section
    const contactSection = document.getElementById('contato');
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
    <section id="areas" className="py-24 bg-white relative overflow-hidden scroll-mt-24">
      {/* Structural background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-b from-gold-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="font-sans text-[11px] uppercase tracking-widest text-gold-600 font-semibold mb-3 block">
              Especialidades Jurídicas
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900">
              Áreas de Atuação Estratégica
            </h2>
            <div className="w-16 h-[2px] bg-gold-400 mt-4" />
          </div>
          <p className="font-sans text-sm text-charcoal-600 max-w-sm leading-relaxed">
            Nossa prática é guiada pela excelência técnica e pela busca incessante das melhores soluções para cada cenário de risco ou oportunidade.
          </p>
        </div>

        {/* Practice Areas Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {AREAS_ATUACAO.map((area) => {
            const IconComponent = iconMap[area.iconName] || Scale;
            return (
              <motion.div
                key={area.id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                onClick={() => setSelectedArea(area)}
                className="bg-charcoal-50 hover:bg-charcoal-900 border border-charcoal-200/60 hover:border-gold-500/30 p-8 rounded-sm transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-xl hover:shadow-gold-500/5 relative overflow-hidden"
              >
                {/* Decorative background number */}
                <div className="absolute top-4 right-6 font-serif text-5xl font-bold text-charcoal-200/30 group-hover:text-gold-500/5 select-none transition-colors duration-300">
                  {`0${AREAS_ATUACAO.indexOf(area) + 1}`}
                </div>

                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 bg-gold-500/10 border border-gold-500/20 group-hover:bg-gold-500 group-hover:border-gold-400 rounded-sm flex items-center justify-center text-gold-600 group-hover:text-charcoal-950 transition-all duration-300 mb-6">
                    <IconComponent size={22} />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg font-bold text-charcoal-900 group-hover:text-white mb-3 transition-colors duration-200">
                    {area.title}
                  </h3>

                  {/* Short Description */}
                  <p className="font-sans text-xs text-charcoal-600 group-hover:text-charcoal-300 leading-relaxed mb-6 transition-colors duration-200">
                    {area.description}
                  </p>
                </div>

                {/* Card CTA Link */}
                <div className="flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-wider font-bold text-gold-600 group-hover:text-gold-400 mt-4 transition-colors">
                  <span>Detalhes da atuação</span>
                  <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mini Trust CTA Section */}
        <div className="mt-16 bg-charcoal-950 border border-gold-500/20 rounded-sm p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 legal-grid-pattern relative overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 w-2 h-full bg-gold-500" />
          <div className="max-w-xl">
            <h4 className="font-serif text-lg md:text-xl font-bold text-white mb-2">
              Não encontrou a especialidade exata para sua demanda?
            </h4>
            <p className="font-sans text-xs text-charcoal-300 leading-relaxed">
              Consulte nosso time. Dispomos de parcerias estratégicas multidisciplinares para atender demandas conexas de alta complexidade em todo o território nacional.
            </p>
          </div>
          <button
            onClick={() => handleConsultationRequest('Geral')}
            className="flex items-center gap-2 bg-transparent border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-charcoal-950 font-sans font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-all duration-300 shrink-0 whitespace-nowrap active:scale-95"
          >
            <MessageSquare size={14} />
            <span>Consultar Especialista</span>
          </button>
        </div>
      </div>

      {/* practice Area Detail Overlay Modal */}
      <AnimatePresence>
        {selectedArea && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArea(null)}
              className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative bg-charcoal-900 border border-gold-500/30 w-full max-w-lg p-8 md:p-10 rounded-sm shadow-2xl z-10 text-white overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500" />
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setSelectedArea(null)}
                  className="text-charcoal-400 hover:text-gold-400 transition-colors p-1"
                  aria-label="Fechar modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gold-500/10 border border-gold-500/30 rounded-sm flex items-center justify-center text-gold-400">
                  {(() => {
                    const IconComp = iconMap[selectedArea.iconName] || Scale;
                    return <IconComp size={24} />;
                  })()}
                </div>
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">Especialidade</span>
                  <h3 className="font-serif text-xl font-bold text-white tracking-tight">
                    {selectedArea.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 font-sans text-xs text-charcoal-300 leading-relaxed mb-8 border-t border-charcoal-800 pt-6">
                <p className="font-semibold text-gold-300 text-sm">
                  {selectedArea.description}
                </p>
                <p>
                  {selectedArea.detailedDescription}
                </p>
                <div className="bg-charcoal-950/60 p-4 border border-charcoal-800 rounded-sm mt-4">
                  <span className="font-bold text-[10px] text-white tracking-wider uppercase block mb-1">Diferencial de atuação</span>
                  <p className="text-[11px] text-charcoal-400">
                    Defesa com foco na mitigação ativa de riscos, elaboração de provas periciais sólidas e condução por profissional com mais de 15 anos de prática e OAB ativa.
                  </p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <button
                  onClick={() => handleConsultationRequest(selectedArea.title)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gold-500 text-charcoal-950 font-sans font-bold text-xs uppercase tracking-widest py-3.5 rounded-sm hover:bg-gold-400 transition-colors shadow-lg active:scale-98"
                >
                  <MessageSquare size={14} />
                  <span>Dúvida sobre esta área</span>
                </button>
                <button
                  onClick={() => setSelectedArea(null)}
                  className="flex-1 border border-charcoal-700 text-charcoal-300 font-sans font-medium text-xs uppercase tracking-widest py-3.5 rounded-sm hover:bg-charcoal-800 transition-colors active:scale-98"
                >
                  Fechar Detalhes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
