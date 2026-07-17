import { motion } from 'motion/react';
import { MessageSquare } from 'lucide-react';
import { OFFICE_INFO } from '../data';

export default function FloatingWhatsapp() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href={OFFICE_INFO.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 rounded-full shadow-2xl transition-all duration-300 group active:scale-90"
        aria-label="Fale conosco pelo WhatsApp"
      >
        {/* Pulsing ring background animations */}
        <span className="absolute inset-0 rounded-full bg-gold-500/40 animate-ping pointer-events-none scale-110" />
        <span className="absolute inset-0 rounded-full bg-gold-500/20 animate-pulse pointer-events-none scale-125" />

        {/* Whatsapp SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7 transform group-hover:scale-110 transition-transform duration-300"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>

        {/* Hover label tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-16 bg-charcoal-900 text-white text-[11px] font-sans font-bold uppercase tracking-widest py-2 px-4 rounded-sm shadow-xl border border-gold-500/20 whitespace-nowrap hidden sm:flex items-center gap-1.5 pointer-events-none"
        >
          <MessageSquare size={12} className="text-gold-400" />
          <span>Fale Agora no WhatsApp</span>
        </motion.div>
      </a>
    </div>
  );
}
