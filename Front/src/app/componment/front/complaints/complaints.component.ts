import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/service/complaint.service';
import { Complaint } from 'src/app/models/complaint.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
getLocalDate(arg0: any) {
throw new Error('Method not implemented.');
}
  itemsPerPage: number = 6;
  p: number = 1;
  complaints: any[] = [];
  filteredComplaints: any[] = [];
  searchTerm: string = '';

  showUpdateForm: boolean = false;
  selectedComplaint: any = null;

  onEdit(_t18: Complaint) {
throw new Error('Method not implemented.');
}
onDelete(arg0: number) {
throw new Error('Method not implemented.');
}

  constructor(private complaintService: ComplaintService,
              private router:Router) { }

  ngOnInit(): void {
    this.loadComplaints(); // Charger les plaintes au démarrage du composant
  }
  goTo(){
    this.router.navigateByUrl("/add-complaint");
  }

  submitUpdate(): void {
    if (this.selectedComplaint) {
      console.log(this.selectedComplaint)
      this.complaintService.updateComplaint(this.selectedComplaint.id, this.selectedComplaint).subscribe(
        (data) => {
          console.log('Complaint successfully updated', data);
          this.closeUpdateForm();
          this.loadComplaints(); // Recharger les plaintes
        },
        (error) => {
          console.error('Error updating complaint', error);
        }
      );
    }
  }
  openUpdateForm(complaint: any): void {
    this.selectedComplaint = { ...complaint }; // Copier la plainte sélectionnée
    this.showUpdateForm = true;
  }

  // Fermer le formulaire de mise à jour
  closeUpdateForm(): void {
    this.showUpdateForm = false;
    this.selectedComplaint = null;
  }



  // Charger toutes les plaintes
  loadComplaints(): void {
    this.complaintService.getAllComplaints().subscribe(
      (data) => {
        this.complaints = data; // Mettre à jour la liste des plaintes
        this.filteredComplaints = data;
        console.log(this.complaints);
      },
      (error) => {
        console.error('Error loading complaints:', error);
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
    if (confirm('Are you sure you want to delete this complaint ?')) {
      this.complaintService.deleteComplaint(id).subscribe(
        () => {
          this.loadComplaints();
          // Mettre à jour la liste après suppression
          this.complaints = this.complaints.filter(complaint => complaint.id !== id);
        },
        (error) => {
          console.error('Erreur lors de la suppression de la plainte:', error);
        }
      );
    }
  }
  applyFilter(): void {
    if (!this.searchTerm) {
      this.filteredComplaints = this.complaints; // Si le terme de recherche est vide, afficher toutes les plaintes
    } else {
      const lowerCaseTerm = this.searchTerm.toLowerCase();
      this.filteredComplaints = this.complaints.filter(
        (complaint) =>
          complaint.typeC.toLowerCase().includes(lowerCaseTerm) || // Filtrer par type
          complaint.typeStatus.toLowerCase().includes(lowerCaseTerm) // Filtrer par statut
      );
    }
    this.p = 1; // Réinitialiser la pagination à la première page
  }
}