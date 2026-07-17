import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, User, Phone, Mail, BookOpen, Clock, ShieldCheck, Trash2, Eye } from 'lucide-react';
import { ContactLead } from '../types';

interface LeadManagementProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadManagement({ isOpen, onClose }: LeadManagementProps) {
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [selectedLead, setSelectedLead] = useState<ContactLead | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const fetchLeads = () => {
    const raw = localStorage.getItem('advogado_contact_leads');
    if (raw) {
      setLeads(JSON.parse(raw));
    } else {
      setLeads([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLeads();
    }
  }, [isOpen]);

  // Listen for newly added leads
  useEffect(() => {
    const handleLeadAdded = () => {
      fetchLeads();
    };
    window.addEventListener('advogado_lead_added', handleLeadAdded);
    return () => window.removeEventListener('advogado_lead_added', handleLeadAdded);
  }, []);

  const handleUpdateStatus = (leadId: string, newStatus: 'Novo' | 'Em Atendimento' | 'Arquivado') => {
    const updated = leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l);
    localStorage.setItem('advogado_contact_leads', JSON.stringify(updated));
    setLeads(updated);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleDeleteLead = (leadId: string) => {
    if (window.confirm('Deseja realmente excluir este lead de forma permanente?')) {
      const filtered = leads.filter(l => l.id !== leadId);
      localStorage.setItem('advogado_contact_leads', JSON.stringify(filtered));
      setLeads(filtered);
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(null);
      }
    }
  };

  if (!isOpen) return null;

  const filteredLeads = statusFilter === 'all' 
    ? leads 
    : leads.filter(l => l.status === statusFilter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-charcoal-950/65 backdrop-blur-sm"
      />

      {/* Drawer content panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-4xl h-full bg-charcoal-900 border-l border-gold-500/20 text-white flex flex-col z-10 shadow-2xl"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-charcoal-800 flex items-center justify-between bg-charcoal-950">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gold-500/10 border border-gold-400 rounded-sm flex items-center justify-center text-gold-400">
              <ShieldCheck size={16} />
            </div>
            <div>
              <h2 className="font-serif text-md font-bold text-white tracking-wide">Painel de Leads Recebidos (Demonstrativo)</h2>
              <p className="font-sans text-[10px] text-charcoal-400 uppercase tracking-wider">Gestão interna de consultas de clientes</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-charcoal-400 hover:text-white transition-colors"
            aria-label="Fechar painel administrativo"
          >
            <X size={20} />
          </button>
        </div>

        {/* Outer Split Layout */}
        <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Column: Leads List */}
          <div className="w-full md:w-1/2 border-r border-charcoal-800 flex flex-col overflow-y-auto">
            
            {/* Filter bar */}
            <div className="p-4 bg-charcoal-950/40 border-b border-charcoal-800 flex items-center justify-between gap-4">
              <span className="font-sans text-[10px] text-charcoal-400 uppercase tracking-widest font-bold shrink-0">Filtrar status</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="font-sans text-xs bg-charcoal-900 border border-charcoal-800 rounded-sm px-3 py-1.5 text-white focus:outline-none focus:border-gold-500"
              >
                <option value="all">Todos os Leads ({leads.length})</option>
                <option value="Novo">Novos</option>
                <option value="Em Atendimento">Em Atendimento</option>
                <option value="Arquivado">Arquivados</option>
              </select>
            </div>

            {/* List */}
            <div className="flex-grow divide-y divide-charcoal-800">
              {filteredLeads.length === 0 ? (
                <div className="p-12 text-center text-charcoal-500 font-sans text-xs">
                  Nenhum lead encontrado com o filtro selecionado. Preencha o formulário para simular!
                </div>
              ) : (
                filteredLeads.map((lead) => {
                  const date = new Date(lead.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <div 
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className={`p-5 transition-colors cursor-pointer relative hover:bg-charcoal-800/40 ${
                        selectedLead?.id === lead.id ? 'bg-charcoal-800/60 border-l-2 border-gold-500' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <span className="font-serif text-sm font-bold text-white tracking-tight">{lead.name}</span>
                        {/* Status chip */}
                        <span className={`text-[9px] font-sans font-bold px-2 py-0.5 rounded-full ${
                          lead.status === 'Novo' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          lead.status === 'Em Atendimento' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-charcoal-500/20 text-charcoal-400 border border-charcoal-600'
                        }`}>
                          {lead.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-sans text-charcoal-400">
                        <span className="truncate">{lead.areaOfInterest}</span>
                        <span className="shrink-0 flex items-center gap-1">
                          <Clock size={10} />
                          {date}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Lead Detail details */}
          <div className="w-full md:w-1/2 bg-charcoal-950/30 flex flex-col overflow-y-auto p-6 md:p-8">
            {selectedLead ? (
              <div className="space-y-6">
                
                {/* Detail Header */}
                <div className="border-b border-charcoal-800 pb-5">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white">{selectedLead.name}</h3>
                      <p className="font-sans text-[10px] text-charcoal-400 mt-1">Registrado em {new Date(selectedLead.createdAt).toLocaleString('pt-BR')}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteLead(selectedLead.id)}
                      className="p-1.5 hover:bg-red-500/10 text-charcoal-400 hover:text-red-400 border border-transparent hover:border-red-500/20 rounded-sm transition-all"
                      title="Excluir Lead permanentemente"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Coordinates grid */}
                <div className="grid grid-cols-1 gap-4 font-sans text-xs">
                  
                  <div className="bg-charcoal-900 border border-charcoal-800 p-3 rounded-sm flex items-center gap-3">
                    <BookOpen size={14} className="text-gold-400 shrink-0" />
                    <div>
                      <span className="text-[9px] text-charcoal-500 block">ÁREA JURÍDICA</span>
                      <span className="font-semibold text-white">{selectedLead.areaOfInterest}</span>
                    </div>
                  </div>

                  <div className="bg-charcoal-900 border border-charcoal-800 p-3 rounded-sm flex items-center gap-3">
                    <Phone size={14} className="text-gold-400 shrink-0" />
                    <div>
                      <span className="text-[9px] text-charcoal-500 block">TELEFONE / WHATSAPP</span>
                      <a href={`https://wa.me/55${selectedLead.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:text-gold-400 underline">
                        {selectedLead.phone} (Conversar)
                      </a>
                    </div>
                  </div>

                  <div className="bg-charcoal-900 border border-charcoal-800 p-3 rounded-sm flex items-center gap-3">
                    <Mail size={14} className="text-gold-400 shrink-0" />
                    <div>
                      <span className="text-[9px] text-charcoal-500 block">ENDEREÇO DE E-MAIL</span>
                      <a href={`mailto:${selectedLead.email}`} className="font-semibold text-white hover:text-gold-400 underline break-all">
                        {selectedLead.email}
                      </a>
                    </div>
                  </div>

                </div>

                {/* Case description box */}
                <div className="space-y-1.5">
                  <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-charcoal-400 block">Descrição da Demanda Jurídica</span>
                  <div className="bg-charcoal-900 border border-charcoal-800 p-4 rounded-sm font-sans text-xs text-charcoal-300 leading-relaxed min-h-[100px] whitespace-pre-wrap">
                    "{selectedLead.message}"
                  </div>
                </div>

                {/* Status Update Trigger Actions */}
                <div className="border-t border-charcoal-800 pt-6 space-y-3">
                  <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-charcoal-400 block">Alterar Status de Atendimento</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleUpdateStatus(selectedLead.id, 'Novo')}
                      className={`px-3 py-1.5 text-[10px] font-sans font-bold uppercase tracking-wider rounded-sm border transition-all duration-200 ${
                        selectedLead.status === 'Novo'
                          ? 'bg-emerald-500 text-charcoal-950 border-emerald-400'
                          : 'border-charcoal-800 text-charcoal-400 hover:border-emerald-500/40 hover:text-emerald-400'
                      }`}
                    >
                      Novo
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedLead.id, 'Em Atendimento')}
                      className={`px-3 py-1.5 text-[10px] font-sans font-bold uppercase tracking-wider rounded-sm border transition-all duration-200 ${
                        selectedLead.status === 'Em Atendimento'
                          ? 'bg-amber-500 text-charcoal-950 border-amber-400'
                          : 'border-charcoal-800 text-charcoal-400 hover:border-amber-500/40 hover:text-amber-400'
                      }`}
                    >
                      Em Atendimento
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedLead.id, 'Arquivado')}
                      className={`px-3 py-1.5 text-[10px] font-sans font-bold uppercase tracking-wider rounded-sm border transition-all duration-200 ${
                        selectedLead.status === 'Arquivado'
                          ? 'bg-charcoal-600 text-white border-charcoal-500'
                          : 'border-charcoal-800 text-charcoal-400 hover:border-charcoal-500 hover:text-white'
                      }`}
                    >
                      Arquivado
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-10 text-charcoal-500 font-sans space-y-2">
                <Eye size={24} />
                <p className="text-xs">Selecione um lead da lista ao lado para inspecionar os detalhes e alterar status de atendimento.</p>
              </div>
            )}
          </div>

        </div>

      </motion.div>
    </div>
  );
}
