import { Component, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SoutenanceService } from 'src/app/Services/soutenance/Soutenanceserv';
import { soutenances } from 'src/app/models/soutenances';
 import { RangePipe } from 'src/app/range.pipe'; // Ensure this module exists or remove if not needed
 import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-soutenance-f',
  standalone: true,
  imports: [CommonModule, DatePipe, MatPaginatorModule], // Ensure this module exists or remove if not needed
  templateUrl: './soutenance-f.component.html',
  styleUrls: ['./soutenance-f.component.css']
})
export class SoutenanceFComponent {
  totalElements: number = 100;  // Add this property
  soutenances: soutenances[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  //totalPages: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private soutenanceService: SoutenanceService) { }

  ngOnInit(): void {
    this.loadSoutenances();
    /*this.soutenanceService.getAllsoutenances().subscribe(
      (data) => {
        console.log('Données reçues :', data); // Vérifier la réponse ici
        this.soutenances = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des soutenances :', error);
      }
    );*/
  }


  loadSoutenances(): void {
    this.soutenanceService.getAllsoutenances(this.currentPage, this.pageSize).subscribe((data: any) => {
      this.soutenances = data.content;
      this.totalElements = data.totalElements;
        });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadSoutenances();
  }

  // Supprimer une soutenance
  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this soutenance?')) {
      this.soutenanceService.deletesoutenances(id).subscribe(
        () => {
          this.soutenances = this.soutenances.filter((s) => s.id !== id); // Mettre à jour la liste
          alert('Soutenance deleted successfully!');
        },
        (error) => {
          console.error('Error deleting soutenance:', error);
        }
      );
    }
  }

  // Mettre à jour une soutenance (redirection ou ouverture d'un formulaire)
  onUpdate(soutenance: soutenances): void {
    console.log('Update soutenance:', soutenance);
    // Ajoutez ici la logique pour mettre à jour une soutenance
  }
  /*addSoutenance(): void {
    console.log('🚀 addSoutenance() a été appelée !'); // Vérification

    const newSoutenance: soutenances = {
      id: 0,
      date_soutenance: new Date(),
      heure_soutenance: new Date(),
      salle_number: 101,
      bloc: 'A',
    };

    this.soutenanceService.addsoutenances(newSoutenance).subscribe(
      (data) => {
        console.log(' Soutenance ajoutée avec succès:', data);
        this.loadSoutenances();
      },
      (err) => {
        console.error(' Erreur lors de l\'ajout:', err);
      }
    );
  }*/

}
