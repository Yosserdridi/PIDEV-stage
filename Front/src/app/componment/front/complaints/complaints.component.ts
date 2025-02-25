import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/service/complaint.service';
import { Complaint } from 'src/app/models/complaint.model';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
onEdit(_t18: Complaint) {
throw new Error('Method not implemented.');
}
onDelete(arg0: number) {
throw new Error('Method not implemented.');
}

  complaints: Complaint[] = []; // Liste des plaintes

  constructor(private complaintService: ComplaintService) { }

  ngOnInit(): void {
    this.loadComplaints(); // Charger les plaintes au démarrage du composant
  }



  // Charger toutes les plaintes
  loadComplaints(): void {
    this.complaintService.getAllComplaints().subscribe(
      (data) => {
        this.complaints = data; // Mettre à jour la liste des plaintes
      },
      (error) => {
        console.error('Erreur lors du chargement des plaintes:', error);
      }
    );
  }

  // Convertir le statut de la plainte en texte lisible
  getStatusLabel(status: string): string {
    switch (status) {
      case 'Pending':
        return 'En attente';
      case 'Resolved':
        return 'Résolue';
      case 'Rejected':
        return 'Rejetée';
      default:
        return 'Inconnu';
    }
  }

  // Supprimer une plainte par ID
  deleteComplaint(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette plainte ?')) {
      this.complaintService.deleteComplaint(id).subscribe(
        () => {
          // Mettre à jour la liste après suppression
          this.complaints = this.complaints.filter(complaint => complaint.id !== id);
        },
        (error) => {
          console.error('Erreur lors de la suppression de la plainte:', error);
        }
      );
    }
  }
}