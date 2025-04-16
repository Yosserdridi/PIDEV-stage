export enum TypeInternship {
  INTERNSHIP_PFE = 'INTERNSHIP_PFE',
  INTERNSHIP_FORMATION_HUMAINE_ET_SOCIALE = 'INTERNSHIP_FORMATION_HUMAINE_ET_SOCIALE',
  INTERNSHIP_D_IMMERSION_EN_ENTREPRISE = 'INTERNSHIP_D_IMMERSION_EN_ENTREPRISE',
  INTERNSHIP_INGENIEUR = 'INTERNSHIP_INGENIEUR'
}


export interface Convention {
  id: number;
  companyName: string;
  startDate: Date;
  endDate: Date;
  companyAddress: string;
  companyContact: string;
  typeInternship: TypeInternship;
  isValid:boolean

}

