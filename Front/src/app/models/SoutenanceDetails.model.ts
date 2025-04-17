export interface SoutenanceDetails {
  soutenanceId: number;
  studentFirstName: string;
  studentLastName: string;
  branche: string;
  grade: string;
  note: number;
  dateSoutenance: string;
  hourSoutenance: string;
  salleNumber: number;
  bloc: string;
  juryMembers?: string[];

}
