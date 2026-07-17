import { AreaAtuacao, Testimonial, Differential } from './types';

export const AREAS_ATUACAO: AreaAtuacao[] = [
  {
    id: 'civil',
    title: 'Direito Civil e Contratos',
    description: 'Assessoria jurídica estratégica na elaboração de contratos de alta complexidade, responsabilidade civil e contencioso.',
    detailedDescription: 'Garantimos a segurança jurídica do seu patrimônio e dos seus negócios por meio de consultoria preventiva e atuação incisiva no contencioso civil. Atuação em disputas de propriedade, cobranças, reparações de danos, planejamento sucessório e relações de consumo.',
    iconName: 'Scale'
  },
  {
    id: 'empresarial',
    title: 'Direito Empresarial e Societário',
    description: 'Blindagem jurídica, constituição de sociedades, assessoria em M&A e compliance para empresas em crescimento.',
    detailedDescription: 'Protegemos sua atividade empresarial com estratégias eficientes de blindagem patrimonial, governança corporativa, dissolução e fusão de sociedades, acordos de sócios e consultoria trabalhista empresarial preventiva.',
    iconName: 'Briefcase'
  },
  {
    id: 'familia',
    title: 'Direito de Família e Sucessões',
    description: 'Mediação humanizada e representação qualificada em inventários, divórcios e planejamentos sucessórios.',
    detailedDescription: 'Atendimento humanizado e focado na resolução pacífica ou contenciosa de questões delicadas, como inventários judiciais e extrajudiciais, divórcios, partilha de bens, planejamento de herança e governança familiar.',
    iconName: 'HeartHandshake'
  },
  {
    id: 'trabalhista',
    title: 'Direito Trabalhista Estratégico',
    description: 'Atuação na defesa patronal e assessoria de executivos para mitigação de riscos e processos complexos.',
    detailedDescription: 'Defesa incisiva de empresas contra passivos trabalhistas ocultos, e assessoria especializada para diretores e executivos de alto escalão em rescisões complexas, negociações sindicais e compliance de recursos humanos.',
    iconName: 'ShieldAlert'
  },
  {
    id: 'tributario',
    title: 'Direito Tributário e Fiscal',
    description: 'Planejamento tributário preventivo, recuperação de créditos fiscais e defesa em autuações administrativas.',
    detailedDescription: 'Estudo detalhado do regime fiscal das empresas para identificar oportunidades legais de redução da carga tributária (elisão fiscal), representação em defesas de autos de infração e proposição de ações de restituição de tributos pagos indevidamente.',
    iconName: 'Coins'
  },
  {
    id: 'defesa-penal',
    title: 'Defesa Penal Corporativa',
    description: 'Consultoria e atuação em crimes de colarinho branco, crimes financeiros e processos administrativos sancionadores.',
    detailedDescription: 'Representação de empresários e corporações em investigações policiais, inquéritos e ações penais relacionadas a crimes contra o sistema financeiro, crimes tributários, lavagem de dinheiro, corrupção e infrações ambientais corporativas.',
    iconName: 'Gavel'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Roberto Alencar',
    role: 'CEO da Alencar Holding S/A',
    content: 'O trabalho da Dra. Gabriela foi decisivo na reestruturação societária do nosso grupo. Sua abordagem pragmática, pautada em fatos e riscos milimetricamente calculados, nos poupou milhões de reais e blindou nossa governança corporativa.',
    caseOutcome: 'Sucesso em Reestruturação societária'
  },
  {
    id: 'test-2',
    name: 'Dra. Eliane Mendes',
    role: 'Diretora Clínica do Instituto Mendes',
    content: 'Em uma das maiores crises de responsabilidade civil que nossa clínica enfrentou, a atuação rápida, calma e altamente especializada da Dra. Gabriela Silveira neutralizou a disputa com extrema ética e confidencialidade. Recomendo fortemente.',
    caseOutcome: 'Acordo extrajudicial favorável'
  },
  {
    id: 'test-3',
    name: 'Sandro Guimarães',
    role: 'Fundador da TechStart Solutions',
    content: 'Para nós, startups, ter um suporte jurídico que entende o dinamismo das novas economias e o Direito Tributário é fundamental. O planejamento fiscal desenhado pelo escritório nos deu a estabilidade que precisávamos para crescer de forma segura.',
    caseOutcome: 'Recuperação de R$ 450 mil em créditos'
  },
  {
    id: 'test-4',
    name: 'Cláudia Regina de Souza',
    role: 'Herdeira e Administradora de Bens',
    content: 'A sensibilidade e a precisão técnica na condução do inventário da nossa família trouxeram paz num momento tão difícil. A partilha foi feita sem atritos em tempo recorde extrajudicialmente, poupando desgaste de anos de processo.',
    caseOutcome: 'Inventário extrajudicial finalizado em 3 meses'
  }
];

export const DIFFERENTIALS: Differential[] = [
  {
    id: 'diff-1',
    title: 'Casos Resolvidos',
    value: '+500',
    description: 'Processos judiciais e acordos resolvidos com êxito em âmbito nacional.',
    iconName: 'FileCheck2'
  },
  {
    id: 'diff-2',
    title: 'Anos de Prática',
    value: '15',
    description: 'Mais de uma década e meia de atuação exclusiva de alta complexidade jurídica.',
    iconName: 'Award'
  },
  {
    id: 'diff-3',
    title: 'Clientes Corporativos',
    value: '+80',
    description: 'Empresas nacionais e internacionais blindadas e assessoradas continuamente.',
    iconName: 'Building2'
  },
  {
    id: 'diff-4',
    title: 'Índice de Acordos',
    value: '87%',
    description: 'Taxa extraordinária de resoluções de conflitos sem necessidade de vias judiciais prolongadas.',
    iconName: 'CheckCircle'
  }
];

export const OFFICE_INFO = {
  name: 'Gabriela Silveira Advocacia',
  owner: 'Dra. Gabriela Silveira',
  oab: 'OAB/SP 312.456',
  email: 'contato@gabrielasilveira.adv.br',
  phone: '+55 (11) 99876-5432',
  phoneDisplay: '(11) 99876-5432',
  whatsappLink: 'https://wa.me/5511998765432?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20jur%C3%ADdica%20com%20a%20Dra.%20Gabriela.',
  address: 'Av. Brigadeiro Faria Lima, 3477 - 14º Andar - Itaim Bibi, São Paulo - SP, 04538-133',
  gmapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.3268875560127!2d-46.68536102377312!3d-23.592576162310113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce57422960fcdb%3A0x7d6a5c1e330089e0!2sAv.%20Brigadeiro%20Faria%20Lima%2C%203477%20-%20Itaim%20Bibi%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004538-133!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr',
  ethicsDisclaimer: 'Este site foi desenvolvido em estrita conformidade com o Código de Ética e Disciplina da OAB (Provimento 205/2021), possuindo caráter puramente informativo, vedada a mercantilização da profissão ou captação indevida de clientela.'
};
