export interface Soutenance {
  id?: number;
  dateSoutenace: string;
  hourSoutence: string;
  salleNumber: number;
  bloc: string;
  files?: { id: number };
}
