import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MessageSquare, Shield } from 'lucide-react';
import { OFFICE_INFO } from '../data';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const pendingScrollTarget = useRef<string | null>(null);

  const menuItems = [
    { label: 'Áreas de Atuação', id: 'areas' },
    { label: 'Sobre o Advogado', id: 'sobre' },
    { label: 'Diferenciais', id: 'diferenciais' },
    { label: 'Depoimentos', id: 'depoimentos' },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-120px 0px -40% 0px',
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const sectionsToObserve = ['inicio', ...menuItems.map(item => item.id)];
    sectionsToObserve.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100; // altura do header + margem de respiro
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth',
      });
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, idOrHref: string) => {
    e.preventDefault();
    const id = idOrHref.startsWith('#') ? idOrHref.slice(1) : idOrHref;
    const targetElement = document.getElementById(id);
    if (!targetElement) return; // Link desabilitado temporariamente se a seção não existir
    
    if (mobileMenuOpen) {
      pendingScrollTarget.current = id;
      setMobileMenuOpen(false);
    } else {
      scrollToSection(id);
    }
  };

  const handleMobileMenuItemClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    pendingScrollTarget.current = id;
    setMobileMenuOpen(false);
  };

  const handleExitComplete = () => {
    if (pendingScrollTarget.current) {
      scrollToSection(pendingScrollTarget.current);
      pendingScrollTarget.current = null;
    }
  };

  return (
    <motion.header
      id="main-header"
      initial="top"
      animate={scrolled ? "scrolled" : "top"}
      variants={{
        top: {
          width: "100%",
          maxWidth: "100%",
          borderRadius: "0px",
          top: "0px",
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderWidth: "0px",
          borderColor: "rgba(197, 160, 89, 0)",
          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
          paddingTop: "24px",
          paddingBottom: "24px",
        },
        scrolled: {
          width: isMobile ? "94%" : "92%",
          maxWidth: "1280px",
          borderRadius: isMobile ? "16px" : "24px",
          top: isMobile ? "10px" : "16px",
          backgroundColor: "rgba(13, 13, 13, 0.95)",
          borderWidth: "1px",
          borderColor: "rgba(197, 160, 89, 0.3)",
          boxShadow: "0px 10px 30px -10px rgba(197, 160, 89, 0.25), 0px 4px 20px rgba(0, 0, 0, 0.5)",
          paddingTop: isMobile ? "12px" : "16px",
          paddingBottom: isMobile ? "12px" : "16px",
        }
      }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed left-0 right-0 mx-auto z-50 border-solid flex flex-col justify-center"
      style={{ willChange: "transform, background-color" }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between relative">
        {/* Monogram & Title Logo */}
        <a href="#inicio" onClick={(e) => handleLinkClick(e, '#inicio')} className="flex items-center gap-3 group">
          <div className="flex flex-col">
            <span className={`font-serif text-md md:text-lg font-bold tracking-widest uppercase transition-colors duration-300 ${
              scrolled ? 'text-white' : 'text-charcoal-950'
            }`}>
              GABRIELA SILVEIRA
            </span>
            <span className="font-sans text-[10px] tracking-widest text-gold-500 uppercase -mt-1 font-medium">
              Advocacia Estratégica
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className={`hidden lg:flex items-center gap-6 xl:gap-8 transition-colors duration-300 ${
          scrolled ? 'text-white/70' : 'text-[#9c9c9c]'
        }`}>
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`font-sans text-xs uppercase tracking-wider transition-colors duration-300 py-1 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-gold-400 after:transition-transform after:duration-300 ${
                  isActive 
                    ? 'after:scale-x-100 after:origin-left' 
                    : 'after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left'
                } ${
                  scrolled
                    ? isActive ? 'text-gold-400 font-semibold' : 'text-white/90 hover:text-gold-400'
                    : isActive ? 'text-gold-600 font-semibold' : 'text-[#606060] hover:text-gold-500'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#contato"
            onClick={(e) => handleLinkClick(e, 'contato')}
            className="flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-charcoal-950 font-sans font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-sm hover:from-gold-400 hover:to-gold-500 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-gold-500/10 active:scale-95"
          >
            <MessageSquare size={14} />
            <span>Contato</span>
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden focus:outline-none transition-colors duration-300 ${
            scrolled ? 'text-white hover:text-gold-400' : 'text-charcoal-950 hover:text-gold-500'
          }`}
          aria-label="Abrir menu de navegação"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Central Crest Icon (Âncora Visual) */}
        <div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center shadow-md transition-all duration-300 z-10 hidden sm:flex ${
            scrolled
              ? 'bg-[#0D0D0D] border-gold-500/30 text-gold-400'
              : 'bg-white border-gold-500/40 text-gold-500'
          }`}
          style={{ bottom: "-16px" }}
        >
          <Shield size={16} className="text-gold-500 fill-gold-500/10" />
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence onExitComplete={handleExitComplete}>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`lg:hidden border-b transition-colors duration-300 mt-4 rounded-b-2xl overflow-hidden ${
              scrolled
                ? 'bg-charcoal-950 border-gold-500/20'
                : 'bg-white border-charcoal-200/50 shadow-md'
            }`}
          >
            <div className="px-6 py-6 flex flex-col gap-6">
              <nav className="flex flex-col gap-4">
                {menuItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => handleMobileMenuItemClick(e, item.id)}
                      className={`font-sans text-sm uppercase tracking-wider py-2 border-b transition-colors duration-300 flex items-center justify-between ${
                        isActive
                          ? scrolled
                            ? 'text-gold-400 border-gold-500/30 font-semibold'
                            : 'text-gold-600 border-gold-500/20 font-semibold'
                          : scrolled
                            ? 'text-charcoal-300 active:text-gold-400 border-charcoal-900'
                            : 'text-charcoal-800 active:text-gold-500 border-charcoal-100'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />}
                    </a>
                  );
                })}
              </nav>

              <div className="flex flex-col gap-3 pt-2">
                <a
                  href="#contato"
                  onClick={(e) => handleLinkClick(e, 'contato')}
                  className="w-full flex items-center justify-center gap-2 bg-gold-500 text-charcoal-950 font-sans font-semibold text-xs uppercase tracking-wider py-3 rounded-sm hover:bg-gold-400 transition-colors shadow-md"
                >
                  <MessageSquare size={16} />
                  <span>Contato</span>
                </a>
                <a
                  href={OFFICE_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 border font-sans font-semibold text-xs uppercase tracking-wider py-3 rounded-sm transition-colors duration-300 ${
                    scrolled
                      ? 'border-gold-500/30 text-gold-400 hover:bg-charcoal-900'
                      : 'border-gold-500/40 text-gold-600 hover:bg-gold-50'
                  }`}
                >
                  <MessageSquare size={16} />
                  <span>Fale Agora</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
