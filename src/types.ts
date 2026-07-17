/**
 * Types representing law practice and portfolio elements
 */

export interface AreaAtuacao {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  iconName: string; // Lucide icon name
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  caseOutcome?: string;
}

export interface Differential {
  id: string;
  title: string;
  value: string;
  description: string;
  iconName: string;
}

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  areaOfInterest: string;
  message: string;
  createdAt: string;
  status: 'Novo' | 'Em Atendimento' | 'Arquivado';
}

export interface ContactFormInput {
  name: string;
  email: string;
  phone: string;
  areaOfInterest: string;
  message: string;
}
