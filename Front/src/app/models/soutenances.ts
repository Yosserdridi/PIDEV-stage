import { FormsModule } from '@angular/forms';
export interface Jury {
  id: number;
  name: string;
  disponibilites: { date: Date; heure: string }[]; // Liste des disponibilités
}

export class soutenances {
  id!: number;
  date_soutenance!: Date;
  heure_soutenance!: Date;
  salle_number!: number;
  bloc!: string;
  jurys: Jury[] = []; // Liste des jurys affectés

}
