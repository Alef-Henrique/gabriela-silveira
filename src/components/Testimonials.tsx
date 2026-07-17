import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Trophy } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Restart/clear timer depending on autoplay and hover state
  useEffect(() => {
    if (!isHovered) {
      autoplayTimerRef.current = setInterval(() => {
        handleNext();
      }, 6000);
    } else {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [currentIndex, isHovered]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Slide transition variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeIn' }
    })
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section id="depoimentos" className="py-24 bg-white relative overflow-hidden scroll-mt-24">
      {/* Visual divider backgrounds */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-charcoal-50 pointer-events-none" />
      <div className="absolute top-12 left-6 w-12 h-12 text-gold-500/10 pointer-events-none">
        <Quote size={80} className="opacity-[0.07]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-sans text-[11px] uppercase tracking-widest text-gold-600 font-semibold block">
            Resultados & Reconhecimento
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900">
            Casos de Sucesso e Depoimentos
          </h2>
          <div className="w-16 h-[2px] bg-gold-400 mx-auto" />
          <p className="font-sans text-xs sm:text-sm text-charcoal-500 max-w-md mx-auto leading-relaxed">
            A satisfação jurídica e comercial dos nossos representados é a nossa maior insígnia de excelência.
          </p>
        </div>

        {/* Carousel Outer Board */}
        <div
          id="testimonial-carousel"
          className="relative bg-charcoal-50 border border-charcoal-200/80 rounded-sm p-8 md:p-14 shadow-lg min-h-[380px] sm:min-h-[320px] md:min-h-[300px] flex flex-col justify-between"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Large decorative quotation mark */}
          <div className="absolute top-8 right-10 text-gold-500/10 pointer-events-none select-none">
            <Quote size={56} className="transform scale-x-[-1]" />
          </div>

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentTestimonial.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-6 flex-grow flex flex-col justify-between"
            >
              {/* Review Text */}
              <div className="space-y-4">
                {/* Gold Trophy banner if has case outcome */}
                {currentTestimonial.caseOutcome && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full">
                    <Trophy size={12} className="text-gold-600 shrink-0" />
                    <span className="font-sans text-[10px] text-gold-700 uppercase font-semibold tracking-wider">
                      {currentTestimonial.caseOutcome}
                    </span>
                  </div>
                )}

                <p className="font-sans text-sm md:text-base text-charcoal-700 italic leading-relaxed font-light">
                  "{currentTestimonial.content}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="border-t border-charcoal-200/80 pt-6 flex items-center justify-between gap-4 mt-6">
                <div>
                  <h4 className="font-serif text-sm font-bold text-charcoal-900 tracking-tight">
                    {currentTestimonial.name}
                  </h4>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-gold-600 font-semibold mt-0.5">
                    {currentTestimonial.role}
                  </p>
                </div>
                <div className="text-gold-500/20 font-serif text-3xl font-bold select-none">
                  {`0${currentIndex + 1} / 0${TESTIMONIALS.length}`}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 z-10">
            <button
              onClick={handlePrev}
              className="w-10 h-10 md:w-12 md:h-12 bg-white hover:bg-gold-500 border border-charcoal-200/60 text-charcoal-800 hover:text-charcoal-950 flex items-center justify-center rounded-sm shadow-md hover:shadow-lg transition-all duration-300 active:scale-90"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft size={18} />
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 z-10">
            <button
              onClick={handleNext}
              className="w-10 h-10 md:w-12 md:h-12 bg-white hover:bg-gold-500 border border-charcoal-200/60 text-charcoal-800 hover:text-charcoal-950 flex items-center justify-center rounded-sm shadow-md hover:shadow-lg transition-all duration-300 active:scale-90"
              aria-label="Próximo depoimento"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-7 bg-gold-500'
                  : 'w-2.5 bg-charcoal-300 hover:bg-charcoal-400'
              }`}
              aria-label={`Ir para depoimento ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
