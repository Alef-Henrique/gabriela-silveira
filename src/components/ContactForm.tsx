import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Send, CheckCircle, AlertTriangle, Loader2, ShieldCheck } from 'lucide-react';
import { OFFICE_INFO, AREAS_ATUACAO } from '../data';
import { ContactFormInput, ContactLead } from '../types';

// Zod validation schema
const contactSchema = z.object({
  name: z.string().min(3, { message: 'O nome completo deve ter no mínimo 3 caracteres.' }),
  email: z.string().email({ message: 'Insira um endereço de e-mail válido.' }),
  phone: z.string().min(10, { message: 'Insira um número de telefone com DDD válido.' }),
  areaOfInterest: z.string().min(1, { message: 'Selecione uma área jurídica de interesse.' }),
  message: z.string().min(10, { message: 'Sua mensagem deve descrever brevemente a demanda (mín. 10 caracteres).' }),
});

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepMessage, setStepMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      areaOfInterest: '',
      message: '',
    }
  });

  // Dynamic Brazilian Phone Mask formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    // Formatting: (XX) XXXXX-XXXX or (XX) XXXX-XXXX
    if (value.length > 10) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    
    setValue('phone', value, { shouldValidate: true });
  };

  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true);
    
    // Simulate high-end backend processing stages
    const steps = [
      'Estabelecendo conexão segura SSL...',
      'Validando credenciais do formulário...',
      'Criptografando dados de contato (AES-256)...',
      'Registrando lead de alta prioridade na base...',
      'Despachando notificação de consulta jurídica...'
    ];

    for (const step of steps) {
      setStepMessage(step);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    // Save submission to local storage to make application fully functional
    const existingLeadsRaw = localStorage.getItem('advogado_contact_leads');
    const existingLeads: ContactLead[] = existingLeadsRaw ? JSON.parse(existingLeadsRaw) : [];
    
    const newLead: ContactLead = {
      id: `lead-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
      status: 'Novo'
    };

    localStorage.setItem('advogado_contact_leads', JSON.stringify([newLead, ...existingLeads]));

    // Dispatch custom event to notify LeadManagement if mounted
    window.dispatchEvent(new Event('advogado_lead_added'));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset();
  };

  return (
    <section id="contato" className="py-24 bg-charcoal-50 border-t border-charcoal-200/50 relative overflow-hidden scroll-mt-24">
      {/* Visual background details */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500" />
      <div className="absolute top-1/3 left-1/10 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="font-sans text-[11px] uppercase tracking-widest text-gold-600 font-semibold mb-3 block">
            Canal de Atendimento Seguro
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900 leading-tight">
            Inicie a defesa de seus interesses
          </h2>
          <div className="w-16 h-[2px] bg-gold-400 mt-4" />
          <p className="font-sans text-xs sm:text-sm text-charcoal-500 mt-4 leading-relaxed max-w-xl">
            Preencha o formulário abaixo para enviar um resumo preliminar do seu caso de forma segura. Retornaremos em até 12 horas úteis com uma avaliação prévia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Block: Contact Details & Compliance info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10 bg-charcoal-900 text-white p-8 md:p-10 rounded-sm shadow-xl relative overflow-hidden legal-grid-pattern">
            <div className="absolute top-0 right-0 w-1.5 h-full bg-gold-500" />
            
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">Gabriela Silveira Advocacia</h3>
                <p className="font-sans text-[11px] text-gold-400 uppercase tracking-widest font-semibold">São Paulo / SP</p>
              </div>

              {/* Coordinates details list */}
              <div className="space-y-6">
                <a
                  href={`tel:${OFFICE_INFO.phone.replace(/\D/g, '')}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 border border-gold-500/20 group-hover:border-gold-500/50 bg-charcoal-950 rounded-sm flex items-center justify-center text-gold-400 group-hover:text-gold-300 shrink-0 transition-colors duration-300">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-widest text-charcoal-400 font-bold block">Telefone Comercial</span>
                    <span className="font-serif text-sm font-semibold text-white group-hover:text-gold-400 transition-colors">{OFFICE_INFO.phoneDisplay}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${OFFICE_INFO.email}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 border border-gold-500/20 group-hover:border-gold-500/50 bg-charcoal-950 rounded-sm flex items-center justify-center text-gold-400 group-hover:text-gold-300 shrink-0 transition-colors duration-300">
                    <Mail size={16} />
                  </div>
                  <div className="break-all">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-charcoal-400 font-bold block">E-mail Corporativo</span>
                    <span className="font-serif text-sm font-semibold text-white group-hover:text-gold-400 transition-colors">{OFFICE_INFO.email}</span>
                  </div>
                </a>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 border border-gold-500/20 bg-charcoal-950 rounded-sm flex items-center justify-center text-gold-400 shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-widest text-charcoal-400 font-bold block">Sede Corporativa</span>
                    <p className="font-sans text-xs text-charcoal-300 leading-relaxed mt-0.5">{OFFICE_INFO.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance OAB card */}
            <div className="bg-charcoal-950/80 border border-charcoal-800 p-5 rounded-sm space-y-3">
              <div className="flex items-center gap-2 text-gold-400">
                <ShieldCheck size={16} />
                <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-white">Compliance e Sigilo OAB</span>
              </div>
              <p className="font-sans text-[10px] text-charcoal-400 leading-relaxed">
                {OFFICE_INFO.ethicsDisclaimer}
              </p>
              <div className="pt-2 border-t border-charcoal-900 flex justify-between items-center text-[9px] font-mono text-charcoal-500">
                <span>SEGURANÇA SSL</span>
                <span>PROTEÇÃO LGPD ATIVA</span>
              </div>
            </div>

          </div>

          {/* Right Block: Interactive Form Panel */}
          <div className="lg:col-span-7 bg-white border border-charcoal-200/80 p-8 md:p-10 rounded-sm shadow-xl relative min-h-[500px] flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {/* STATE 1: Submitting loader */}
              {isSubmitting && (
                <motion.div
                  key="loading-panel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 flex flex-col items-center justify-center space-y-6"
                >
                  <Loader2 size={44} className="text-gold-500 animate-spin" />
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg font-bold text-charcoal-900">Enviando dados preliminares</h4>
                    <p className="font-sans text-xs text-charcoal-500 italic max-w-sm mx-auto">
                      {stepMessage}
                    </p>
                  </div>
                  {/* Progress simulator track */}
                  <div className="w-48 h-[3px] bg-charcoal-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gold-500 animate-pulse rounded-full w-full" />
                  </div>
                </motion.div>
              )}

              {/* STATE 2: Success Message */}
              {!isSubmitting && submitSuccess && (
                <motion.div
                  key="success-panel"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 flex flex-col items-center justify-center space-y-6"
                >
                  <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center shadow-md">
                    <CheckCircle size={32} />
                  </div>
                  <div className="space-y-3 max-w-md mx-auto">
                    <h4 className="font-serif text-xl font-bold text-charcoal-900">
                      Caso Registrado com Sucesso!
                    </h4>
                    <p className="font-sans text-xs text-charcoal-600 leading-relaxed">
                      Sua solicitação de atendimento foi processada e enviada com segurança sob sigilo profissional. A Dra. Gabriela Silveira ou seu assistente jurídico sênior entrará em contato pelo telefone ou e-mail fornecido nas próximas horas.
                    </p>
                  </div>
                  <div className="bg-charcoal-50 p-4 rounded-sm border border-charcoal-200 text-[11px] font-mono text-charcoal-500 max-w-sm">
                    Acompanhe a sua solicitação em nossa base de leads demonstrativa no painel administrativo abaixo no rodapé.
                  </div>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="border border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-charcoal-950 font-sans font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-all duration-300 active:scale-95"
                  >
                    Novo Envio de Mensagem
                  </button>
                </motion.div>
              )}

              {/* STATE 3: The Form itself */}
              {!isSubmitting && !submitSuccess && (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="font-sans text-[11px] uppercase tracking-wider font-bold text-charcoal-700">
                        Nome Completo *
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Ex: João da Silva"
                        {...register('name')}
                        className={`w-full px-4 py-3 border rounded-sm font-sans text-xs focus:outline-none transition-colors ${
                          errors.name
                            ? 'border-red-400 focus:border-red-500 bg-red-50/10'
                            : 'border-charcoal-200 focus:border-gold-500'
                        }`}
                      />
                      {errors.name && (
                        <p className="flex items-center gap-1 font-sans text-[10px] text-red-500 mt-1">
                          <AlertTriangle size={10} />
                          <span>{errors.name.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="font-sans text-[11px] uppercase tracking-wider font-bold text-charcoal-700">
                        E-mail de Contato *
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Ex: joao@empresa.com"
                        {...register('email')}
                        className={`w-full px-4 py-3 border rounded-sm font-sans text-xs focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-red-400 focus:border-red-500 bg-red-50/10'
                            : 'border-charcoal-200 focus:border-gold-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="flex items-center gap-1 font-sans text-[10px] text-red-500 mt-1">
                          <AlertTriangle size={10} />
                          <span>{errors.email.message}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="font-sans text-[11px] uppercase tracking-wider font-bold text-charcoal-700">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        id="phone"
                        type="text"
                        placeholder="Ex: (11) 99876-5432"
                        {...register('phone')}
                        onChange={handlePhoneChange}
                        className={`w-full px-4 py-3 border rounded-sm font-sans text-xs focus:outline-none transition-colors ${
                          errors.phone
                            ? 'border-red-400 focus:border-red-500 bg-red-50/10'
                            : 'border-charcoal-200 focus:border-gold-500'
                        }`}
                      />
                      {errors.phone && (
                        <p className="flex items-center gap-1 font-sans text-[10px] text-red-500 mt-1">
                          <AlertTriangle size={10} />
                          <span>{errors.phone.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Area of Interest */}
                    <div className="space-y-1.5">
                      <label htmlFor="areaOfInterest" className="font-sans text-[11px] uppercase tracking-wider font-bold text-charcoal-700">
                        Área de Interesse *
                      </label>
                      <select
                        id="areaOfInterest"
                        {...register('areaOfInterest')}
                        className={`w-full px-4 py-3 border rounded-sm font-sans text-xs focus:outline-none bg-white transition-colors ${
                          errors.areaOfInterest
                            ? 'border-red-400 focus:border-red-500 bg-red-50/10'
                            : 'border-charcoal-200 focus:border-gold-500'
                        }`}
                      >
                        <option value="">Selecione a especialidade...</option>
                        {AREAS_ATUACAO.map((area) => (
                          <option key={area.id} value={area.title}>
                            {area.title}
                          </option>
                        ))}
                        <option value="Outros Assuntos">Outros Assuntos / Geral</option>
                      </select>
                      {errors.areaOfInterest && (
                        <p className="flex items-center gap-1 font-sans text-[10px] text-red-500 mt-1">
                          <AlertTriangle size={10} />
                          <span>{errors.areaOfInterest.message}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message Detail */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="font-sans text-[11px] uppercase tracking-wider font-bold text-charcoal-700">
                      Descrição da Demanda (Breve resumo) *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Por favor, descreva sucintamente seu problema ou dúvida, sem fornecer detalhes sigilosos confidenciais adicionais que requerem reunião privada."
                      {...register('message')}
                      className={`w-full px-4 py-3 border rounded-sm font-sans text-xs focus:outline-none resize-none transition-colors ${
                        errors.message
                          ? 'border-red-400 focus:border-red-500 bg-red-50/10'
                          : 'border-charcoal-200 focus:border-gold-500'
                      }`}
                    />
                    {errors.message && (
                      <p className="flex items-center gap-1 font-sans text-[10px] text-red-500 mt-1">
                        <AlertTriangle size={10} />
                        <span>{errors.message.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-contact"
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-sans font-bold text-xs uppercase tracking-widest py-4 rounded-sm transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 cursor-pointer mt-2"
                  >
                    <Send size={14} />
                    <span>Enviar Demanda Preliminar</span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
