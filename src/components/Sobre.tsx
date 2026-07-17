import { motion } from 'motion/react';
import { Award, BookOpen, Scale, Landmark, ShieldCheck } from 'lucide-react';
import { OFFICE_INFO } from '../data';

export default function Sobre() {
  const credentials = [
    {
      id: 'cred-1',
      icon: BookOpen,
      title: 'Formação Acadêmica de Ponta',
      description: 'Bacharel em Direito pela Universidade de São Paulo (USP) - Largo de São Francisco. Especialista em Direito Empresarial pela FGV.'
    },
    {
      id: 'cred-2',
      icon: Award,
      title: 'Especializações & Pós-Graduações',
      description: 'Mestre em Direito Tributário (USP) e pós-graduado em Contratos de Infraestrutura e Blindagem Societária.'
    },
    {
      id: 'cred-3',
      icon: Landmark,
      title: 'Atuação Institucional Ativa',
      description: 'Membro efetivo da Associação dos Advogados de São Paulo (AASP) e do Instituto Brasileiro de Direito Tributário (IBDT).'
    },
    {
      id: 'cred-4',
      icon: ShieldCheck,
      title: 'Estrita Ética e Sigilo',
      description: 'Condução profissional rigorosa pautada no Provimento 205/2021 da OAB, assegurando confidencialidade absoluta aos clientes.'
    }
  ];

  return (
    <section id="sobre" className="py-24 bg-charcoal-50 border-t border-b border-charcoal-200/50 relative overflow-hidden scroll-mt-24">
      {/* Decorative vertical background line */}
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-gold-400/10 to-transparent pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Biography & Text Block */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-sans text-[11px] uppercase tracking-widest text-gold-600 font-semibold mb-3 block">
                Sobre a Advogada Fundadora
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900 leading-tight">
                Dra. Gabriela Silveira <br />
                <span className="font-sans font-light text-xl md:text-2xl text-charcoal-600 tracking-normal block mt-1">
                  Dedicação técnica intransigente à advocacia
                </span>
              </h2>
              <div className="w-16 h-[2px] bg-gold-400 mt-4" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4 font-sans text-xs md:text-sm text-charcoal-600 leading-relaxed"
            >
              <p>
                Com mais de 15 anos de atuação nos principais tribunais do país e em consultoria preventiva de alta complexidade, a <strong className="text-charcoal-900 font-semibold">Dra. Gabriela Silveira (OAB/SP 312.456)</strong> fundou o escritório sob os pilares da excelência jurídica, rigor técnico e foco cirúrgico na necessidade de seus representados.
              </p>
              <p>
                Sua experiência abrange defesas emblemáticas de executivos e empresas em disputas societárias de grande porte, além de planejamento sucessório familiar extrajudicial, protegendo gerações com discrição total e segurança contra litígios.
              </p>
              <p className="border-l-2 border-gold-500 pl-4 py-1 italic text-charcoal-700 bg-gold-500/5">
                "A verdadeira advocacia não se resume a propor processos. Ela reside na criação de caminhos legais que neutralizam riscos antes que eles se transformem em disputas caras e desgastantes."
              </p>
            </motion.div>

            {/* Signature or mini details */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <div className="font-serif italic text-2xl text-gold-700 font-semibold">
                Gabriela Silveira
              </div>
              <div className="w-12 h-[1px] bg-charcoal-300" />
              <div className="text-[11px] font-sans text-charcoal-500 uppercase tracking-widest font-semibold">
                Sócia Diretora — OAB/SP 312.456
              </div>
            </motion.div>
          </div>

          {/* Academic Credentials & Trust Elements Block */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {credentials.map((cred, index) => {
                const CredIcon = cred.icon;
                return (
                  <motion.div
                    key={cred.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white border border-charcoal-200/60 p-6 rounded-sm shadow-sm hover:shadow-md hover:border-gold-500/20 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-gold-500/5 border border-gold-500/10 group-hover:bg-gold-500/10 group-hover:border-gold-500/30 rounded-sm flex items-center justify-center text-gold-600 mb-4 transition-all duration-300">
                      <CredIcon size={18} />
                    </div>
                    <h3 className="font-serif text-sm font-bold text-charcoal-900 mb-2">
                      {cred.title}
                    </h3>
                    <p className="font-sans text-[11px] text-charcoal-500 leading-relaxed">
                      {cred.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Official seal/membership mock badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-charcoal-950 text-white rounded-sm p-6 border border-gold-500/20 flex flex-col sm:flex-row items-center gap-6 legal-grid-pattern mt-8"
            >
              <div className="w-16 h-16 border-2 border-gold-500 rounded-full flex items-center justify-center text-gold-400 font-serif text-xs font-bold tracking-widest relative shrink-0">
                <span className="text-[10px] text-center p-1 font-bold leading-none uppercase">OAB<br/>OFICIAL</span>
                {/* Micro outer stars */}
                <div className="absolute inset-0 border border-gold-500/30 rounded-full scale-105" />
              </div>
              <div className="text-center sm:text-left space-y-1">
                <span className="font-sans text-[10px] uppercase tracking-widest text-gold-400 font-bold">Inscrição de Classe Regular</span>
                <p className="font-serif text-sm font-bold text-white">Conselho Seccional de São Paulo - OAB/SP 312.456</p>
                <p className="font-sans text-[10px] text-charcoal-400 leading-normal">
                  Inscrição ativa. Exercício profissional pleno em conformidade com as prerrogativas do Estatuto da Advocacia e da OAB (Lei nº 8.906/94).
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
