import { Student } from './student.model';
import { InternshipPFE } from './internship-pfe.model';

export enum TypeInternship {
  INTERNSHIP_PFE = 'INTERNSHIP_PFE',
  FORMATION_HUMANITAIRE = 'FORMATION_HUMANITAIRE',
  IMMERSION_ENTREPRISE = 'IMMERSION_ENTREPRISE',
  INGENIEUR = 'INGENIEUR'
}

export interface InternshipConvention {
  id: number;
  companyName: string;
  startDate: Date;
  endDate: Date;
  companyAddress: string;
  comanyContact: string;
  typeInternship: TypeInternship;
  isValid: boolean;
  student?: Student;
  internshipPFE?: InternshipPFE;
}
