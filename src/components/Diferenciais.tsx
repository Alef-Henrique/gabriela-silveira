import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { FileCheck, Award, Building, Percent } from 'lucide-react';
import { DIFFERENTIALS } from '../data';

// Custom Counter subcomponent
function AnimatedCounter({ value, duration = 1.5 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isDecimal = value.includes('%');
  const isPlus = value.includes('+');
  
  // Strip out non-numeric characters to get target value
  const targetNumber = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = targetNumber;
    if (start === end) return;

    // Calculate total frames
    const totalFrames = Math.min(end, 60);
    const frameDuration = (duration * 1000) / totalFrames;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // easeOutExpo progression for more professional acceleration
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.round(easeProgress * end);

      setCount(currentCount);

      if (frame === totalFrames) {
        clearInterval(timer);
        setCount(end); // force correct end value
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [targetNumber, duration, isInView]);

  return (
    <span ref={ref} className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-gold-400">
      {isPlus && '+'}
      {count}
      {isDecimal && '%'}
    </span>
  );
}

const iconMap: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
  FileCheck2: FileCheck,
  Award: Award,
  Building2: Building,
  CheckCircle: Percent
};

export default function Diferenciais() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="diferenciais" className="py-24 bg-charcoal-950 text-white relative overflow-hidden legal-grid-pattern scroll-mt-24">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header section */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-sans text-[11px] uppercase tracking-widest text-gold-400 font-semibold block"
          >
            Nossos Valores & Indicadores
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white"
          >
            Diferenciais de um Escritório de Alta Performance
          </motion.h2>
          <div className="w-16 h-[2px] bg-gold-400 mx-auto" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-sans text-xs sm:text-sm text-charcoal-300 max-w-lg mx-auto leading-relaxed"
          >
            Acreditamos que a credibilidade jurídica é forjada em resultados mensuráveis, atendimento personalizado e estrito rigor corporativo.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {DIFFERENTIALS.map((diff) => {
            const IconComponent = iconMap[diff.iconName] || FileCheck;
            return (
              <motion.div
                key={diff.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                className="bg-charcoal-900 border border-charcoal-800 hover:border-gold-500/30 p-8 rounded-sm text-center flex flex-col items-center group transition-all duration-300 relative overflow-hidden"
              >
                {/* Thin gold border on top on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gold-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                {/* Animated micro-pulsing Icon */}
                <div className="w-14 h-14 bg-charcoal-950 border border-charcoal-800 group-hover:border-gold-500/40 rounded-full flex items-center justify-center text-gold-400 group-hover:text-gold-300 mb-6 transition-colors duration-300 relative">
                  <div className="absolute inset-0 bg-gold-400/5 rounded-full scale-110 opacity-0 group-hover:opacity-100 group-hover:animate-ping duration-1000" />
                  <IconComponent size={24} className="transform group-hover:rotate-6 transition-transform duration-300" />
                </div>

                {/* Count value */}
                <div className="mb-2">
                  <AnimatedCounter value={diff.value} />
                </div>

                {/* Title */}
                <h3 className="font-serif text-sm font-bold text-white mb-2 uppercase tracking-wide">
                  {diff.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs text-charcoal-400 leading-relaxed max-w-xs">
                  {diff.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mini values bullet points block */}
        <div className="mt-16 pt-16 border-t border-charcoal-900 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex gap-4 items-start"
          >
            <div className="w-2 h-2 rounded-full bg-gold-500 mt-1.5 shrink-0" />
            <div>
              <h4 className="font-serif text-xs font-bold text-white tracking-widest uppercase mb-1">Rigor Científico</h4>
              <p className="font-sans text-[11px] text-charcoal-400 leading-relaxed">
                Nossos pareceres e teses jurídicas passam por dupla verificação, garantindo precisão técnica implacável e alinhamento com a jurisprudência mais recente.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-4 items-start"
          >
            <div className="w-2 h-2 rounded-full bg-gold-500 mt-1.5 shrink-0" />
            <div>
              <h4 className="font-serif text-xs font-bold text-white tracking-widest uppercase mb-1">Privacidade Irrestrita</h4>
              <p className="font-sans text-[11px] text-charcoal-400 leading-relaxed">
                Utilizamos sistemas de criptografia de ponta a ponta e rígidos controles de acesso físico e digital para garantir sigilo total e irrestrito sobre seus dados.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-4 items-start"
          >
            <div className="w-2 h-2 rounded-full bg-gold-500 mt-1.5 shrink-0" />
            <div>
              <h4 className="font-serif text-xs font-bold text-white tracking-widest uppercase mb-1">Transparência Integral</h4>
              <p className="font-sans text-[11px] text-charcoal-400 leading-relaxed">
                Cada cliente possui acesso a relatórios mensais simplificados e contato direto com o advogado responsável pelo processo, sem intermediários.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
