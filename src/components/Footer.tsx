import { OFFICE_INFO } from '../data';
import { Scale, ArrowUp, Mail, Phone, MapPin, Instagram, Linkedin, Shield } from 'lucide-react';

export default function Footer({ onOpenLeads }: { onOpenLeads: () => void }) {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-charcoal-950 text-white pt-16 pb-8 border-t border-charcoal-800 relative overflow-hidden legal-grid-pattern">
      {/* Decorative top colored line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold-500 via-charcoal-800 to-gold-500" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main Footer Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-charcoal-900">
          
          {/* Logo & Corporate Manifesto (Col 1-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="font-serif text-md font-bold tracking-widest text-gold-500 uppercase">
                  GABRIELA SILVEIRA
                </span>
                <span className="font-sans text-[10px] tracking-widest text-charcoal-300 uppercase -mt-1">
                  Advocacia Estratégica
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-charcoal-400 leading-relaxed max-w-sm">
              Mais de uma década e meia de prática intransigente, defendendo interesses patrimoniais corporativos e familiares com absoluta discrição, rigor analítico e segurança institucional.
            </p>

            {/* Social networks links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-charcoal-800 hover:border-gold-500 hover:bg-gold-500/10 rounded-sm flex items-center justify-center text-charcoal-400 hover:text-gold-400 transition-colors duration-300"
                aria-label="Acessar Linkedin da Dra. Gabriela"
              >
                <Linkedin size={14} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-charcoal-800 hover:border-gold-500 hover:bg-gold-500/10 rounded-sm flex items-center justify-center text-charcoal-400 hover:text-gold-400 transition-colors duration-300"
                aria-label="Acessar Instagram profissional da Dra. Gabriela"
              >
                <Instagram size={14} />
              </a>
              <button
                onClick={onOpenLeads}
                className="w-8 h-8 border border-charcoal-800 hover:border-gold-500 hover:bg-gold-500/10 rounded-sm flex items-center justify-center text-charcoal-400 hover:text-gold-400 transition-colors duration-300"
                title="Visualizar Painel de Leads (Demo)"
                aria-label="Abrir painel administrativo demonstrativo"
              >
                <Shield size={14} />
              </button>
            </div>
          </div>

          {/* Quick Nav Links (Col 5-7) */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="font-serif text-xs font-bold uppercase tracking-widest text-gold-500">
              Navegação
            </h3>
            <ul className="space-y-3 font-sans text-xs text-charcoal-400">
              <li>
                <a href="#inicio" className="hover:text-gold-400 transition-colors">Início</a>
              </li>
              <li>
                <a href="#areas" className="hover:text-gold-400 transition-colors">Especialidades Jurídicas</a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-gold-400 transition-colors">Sobre o Advogado</a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-gold-400 transition-colors">Diferenciais Técnicos</a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-gold-400 transition-colors">Casos de Sucesso</a>
              </li>
              <li>
                <a href="#contato" className="hover:text-gold-400 transition-colors">Fale Conosco</a>
              </li>
            </ul>
          </div>

          {/* Google Maps Location Embed Card (Col 8-12) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xs font-bold uppercase tracking-widest text-gold-500">
                Localização do Escritório
              </h3>
              <span className="font-mono text-[9px] text-charcoal-500">ITAIM BIBI, SP</span>
            </div>

            {/* Map Frame Card */}
            <div className="w-full h-40 border border-charcoal-800 bg-charcoal-900 rounded-sm overflow-hidden relative group">
              <iframe
                title="Endereço do Escritório Dra. Gabriela Silveira"
                src={OFFICE_INFO.gmapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="transition-all duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gold-400/5 mix-blend-color pointer-events-none" />
            </div>

            <p className="font-sans text-[10px] text-charcoal-400 leading-normal flex items-start gap-2">
              <MapPin size={12} className="text-gold-500 shrink-0 mt-0.5" />
              <span>{OFFICE_INFO.address}</span>
            </p>
          </div>

        </div>

        {/* Lower Legal Compliance Disclaimer Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-sans text-charcoal-500">
          
          {/* Regulatory details */}
          <div className="space-y-1 text-center md:text-left max-w-2xl">
            <p>
              © {new Date().getFullYear()} {OFFICE_INFO.name}. Todos os direitos reservados.
            </p>
            <p className="leading-relaxed">
              O exercício profissional da Dra. Gabriela Silveira é regulamentado pela Ordem dos Advogados do Brasil (OAB/SP nº 312.456). Este site está em estrita conformidade com os provimentos do Tribunal de Ética e Disciplina do Conselho Federal da OAB, vedada qualquer promessa mercantilista ou garantia absoluta de resultados.
            </p>
          </div>

          {/* Scroll to top button */}
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 border border-charcoal-800 hover:border-gold-500 bg-charcoal-900 hover:bg-gold-500/10 text-charcoal-400 hover:text-gold-400 font-sans font-bold text-[10px] uppercase tracking-wider py-2 px-4 rounded-sm transition-all duration-300"
            aria-label="Voltar para o topo"
          >
            <span>Voltar ao topo</span>
            <ArrowUp size={12} />
          </button>

        </div>

      </div>
    </footer>
  );
}
