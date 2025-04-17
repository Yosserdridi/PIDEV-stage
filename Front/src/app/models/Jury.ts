import { FormsModule } from '@angular/forms';

 export interface Jury {
  id: number;
  name: string;
  disponibilites: { date: Date; heure: string }[]; // Liste des disponibilités
}
