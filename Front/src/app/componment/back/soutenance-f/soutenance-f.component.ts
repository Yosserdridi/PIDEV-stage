import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SoutenanceService } from 'src/app/Services/soutenance/Soutenanceserv';
import { SoutenanceDetails } from 'src/app/models/SoutenanceDetails.model';

@Component({
  selector: 'app-soutenance-f',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, MatPaginatorModule],
  templateUrl: './soutenance-f.component.html',
  styleUrls: ['./soutenance-f.component.css']
})
export class SoutenanceFComponent implements OnInit {
  soutenances: SoutenanceDetails[] = [];
  paginatedSoutenances: SoutenanceDetails[] = [];
  currentPage: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;
  salle_number: number[] = [101, 102, 201, 202, 301, 302];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private soutenanceService: SoutenanceService) {}

  ngOnInit(): void {
    this.loadSoutenances();
  }

  loadSoutenances(): void {
    this.soutenanceService.getAllSoutenanceDetails().subscribe(
      (data: SoutenanceDetails[]) => {
        this.soutenances = data;
        this.totalElements = data.length;
        this.updatePaginatedData();
      },
      (error) => {
        console.error('Erreur lors de la récupération des soutenances:', error);
      }
    );
  }

  updatePaginatedData(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedSoutenances = this.soutenances.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedData();
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette soutenance ?')) {
      this.soutenanceService.deleteSoutenance(id).subscribe(
        () => {
          this.soutenances = this.soutenances.filter(s => s.soutenanceId !== id);
          this.totalElements--;
          this.updatePaginatedData();
          alert('Soutenance supprimée avec succès!');
        },
        (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      );
    }
  }

  errorMessage = '';
  selectedSoutenance: SoutenanceDetails = {
    soutenanceId: 0,
    studentFirstName: '',
    studentLastName: '',
    branche: '',
    grade: '',
    note: 0,
    dateSoutenance: '',
    hourSoutenance: '',
    salleNumber: 0,
    bloc: ''
  };
  isModalOpen = false;

  openModifyModal(soutenance: SoutenanceDetails): void {
    this.selectedSoutenance = { ...soutenance };
    if (this.selectedSoutenance.dateSoutenance) {
      this.selectedSoutenance.dateSoutenance = new Date(this.selectedSoutenance.dateSoutenance)
        .toISOString()
        .split('T')[0];
    }
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  updateSoutenance(): void {
    const payload: any = { id: this.selectedSoutenance.soutenanceId };

    if (this.selectedSoutenance.dateSoutenance) {
      payload.dateSoutenace = this.selectedSoutenance.dateSoutenance;
    }
    if (this.selectedSoutenance.hourSoutenance) {
      payload.hourSoutence = this.selectedSoutenance.hourSoutenance;
    }
    if (this.selectedSoutenance.bloc) {
      payload.bloc = this.selectedSoutenance.bloc;
    }
    if (this.selectedSoutenance.salleNumber) {
      payload.salleNumber = this.selectedSoutenance.salleNumber;
    }

    this.soutenanceService.updateSoutenance(payload).subscribe(() => {
      alert('Soutenance mise à jour avec succès!');
      this.loadSoutenances();
      this.closeModal();
    }, err => {
      this.errorMessage = err.error.message;
    });
  }
}
