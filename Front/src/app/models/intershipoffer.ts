//import { Postulation } from "./postulation.model";

export enum TypeInternship {
  STAGE_FORMATION_HUMAINE_SOCIALE = '  INTERNSHIP_FORMATION_HUMAINE_ET_SOCIALE',
  STAGE_IMMERSION_ENTREPRISE = 'INTERNSHIP_D_IMMERSION_EN_ENTREPRISE',
  STAGE_INGENIEUR = 'INTERNSHIP_INGENIEUR',
  STAGE_PFE = 'INTERNSHIP_PFE' ,


}
export class intershipoffer {
  idsujet!: number;
  title!: string;
  description!: string;
  location!: string;
   duration!: number;
  numberOfStudents!: number;
  requirements!: string;
  companyname!: string;
  companymail!: string;
  typeInternship!: TypeInternship;
  creationDate!: string;


  imageUrl!: string;

  
 // postulationtSet!: Postulation[];
}
