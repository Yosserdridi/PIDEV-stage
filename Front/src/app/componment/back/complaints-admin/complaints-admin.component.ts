import {Component, OnInit} from '@angular/core';
import {Complaint} from "../../../models/complaint.model";
import {ComplaintService} from "../../../service/complaint.service";
import {ResponseModel} from "../../../models/response.model";
import {ResponseService} from "../../../service/response.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-complaints-admin',
  templateUrl: './complaints-admin.component.html',
  styleUrls: ['./complaints-admin.component.css']
})
export class ComplaintsAdminComponent implements OnInit{
[x: string]: any;


  itemsPerPage: number = 10;
  p: number = 1;
  complaints: any[] = [];
  filteredComplaints: any[] = [];
  searchTerm: string = '';
  showResponseForm: boolean = false;
  selectedComplaint: any = null;
  responseText: string = '';
  id:number = 0;
  isUpdateMode: boolean = false;
Complaint: any;

  onEdit(_t18: Complaint) {
    throw new Error('Method not implemented.');
  }
  onDelete(arg0: number) {
    throw new Error('Method not implemented.');
  }
  

  constructor(private complaintService: ComplaintService,
              private responseService:ResponseService,
              private router:Router) { }

  ngOnInit(): void {
    this.loadComplaints(); // Charger les plaintes au démarrage du composant
  }



  // Charger toutes les plaintes
  loadComplaints(): void {
    this.complaintService.getAllComplaints().subscribe(
      (data) => {
        this.complaints = data; // Mettre à jour la liste des plaintes
        this.filteredComplaints = data;
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
  // Ouvrir le formulaire de réponse
  openResponseForm(complaint: any, isUpdateMode: boolean): void {
    this.selectedComplaint = complaint;
    this.isUpdateMode = isUpdateMode;
    if (isUpdateMode && complaint.responses && complaint.responses.length > 0) {
      this.responseText = complaint.responses[0].response; // Pré-remplir le formulaire en mode mise à jour
    } else {
      this.responseText = ''; // Réinitialiser le texte de la réponse en mode ajout
    }
    this.showResponseForm = true;
  }


  // Fermer le formulaire de réponse
  closeResponseForm(): void {
    this.showResponseForm = false;
    this.selectedComplaint = null;
    this.responseText = '';
    this.isUpdateMode = false;
  }

  // Soumettre la réponse
  submitResponse(): void {
    if (this.selectedComplaint && this.responseText) {
      const response: ResponseModel = {
        response: this.responseText,
        complaint: this.selectedComplaint,
        dateResponse: new Date().toISOString()
      };

      console.log(this.id)
      if (this.isUpdateMode && this.selectedComplaint.responses && this.selectedComplaint.responses.length > 0) {
        // Mettre à jour la réponse existante
        this.responseService.updateResponse(this.selectedComplaint.responses[0].id ,response).subscribe(
          (data) => {
            console.log('Réponse mise à jour avec succès', data);
            this.selectedComplaint.typeStatus="Approved";
            this.submitStatus();
            this.closeResponseForm();

            this.loadComplaints(); // Recharger les plaintes
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de la réponse', error);
          }
        );
      } else {

        this.responseService.addResponse(response).subscribe(
          (data) => {
            console.log('Réponse envoyée avec succès', data);
            this.closeResponseForm();
          },
          (error) => {
            console.error('Erreur lors de l\'envoi de la réponse', error);
          }
        );
      }
    }
    }

  selectComplaint(complaint: any) {
    this.selectedComplaint = complaint;
    this.showResponseForm = false;
  }
  deleteResponse(id : number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réponse ?')) {
      this.responseService.deleteResponse(id).subscribe(
        () => {
          console.log('Réponse supprimée avec succès');
          this.loadComplaints(); // Recharger les plaintes
        },
        (error) => {
          console.error('Erreur lors de la suppression de la réponse', error);
        }
      );
    }
  }
  submitStatus(): void {
    if (this.selectedComplaint) {
      console.log(this.selectedComplaint)
      this.complaintService.updateComplaint(this.selectedComplaint.id, this.selectedComplaint).subscribe(
        (data) => {
          console.log('Plainte mise à jour avec succès', data);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la plainte', error);
        }
      );
    }
  }

  showStatistics() {
    this.router.navigate(['/stat']);
  }
  downloadExcel(): void {
    this.complaintService.exportComplaintsToExcel().subscribe(
      (data) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'reclamations.xlsx';
        link.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('❌ Erreur lors du téléchargement du fichier Excel :', error);
      }
    );
  }
  
}
