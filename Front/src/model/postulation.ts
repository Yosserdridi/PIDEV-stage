import { intershipoffer } from "./intershipoffer";
import { Student } from "./Student";


export class postulation {
  id!: number;
  status!: number;
  postulationDate!: Date;
  comment!: string;
  titrecandidature!: string;
  lettremotivation !: string; 
  region!: string;
  pdfUrl!: string;

  idsujet!: number;
  intershipOffer?: intershipoffer;

  studentid!: number;
 }
