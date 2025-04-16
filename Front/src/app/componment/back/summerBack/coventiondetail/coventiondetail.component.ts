import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entities } from 'src/model/entities';
import { ConventionService } from 'src/services/convention.service';
import { FilesService } from 'src/services/service_files/files.service';
import { JournalService } from 'src/services/service_journal/journal.service';

@Component({
  selector: 'app-coventiondetail',
  templateUrl: './coventiondetail.component.html',
  styleUrls: ['./coventiondetail.component.css']
})
export class CoventiondetailComponent implements OnInit {


  conventionId!: number;
  data!: Entities;
  selectedJournal: any = null;
  showJournalUpdateForm = false;

  constructor(
    private route: ActivatedRoute,
    private conventionService: ConventionService,
    private fileService:FilesService,
    private journalService: JournalService,
    private router :Router
  ) {}

  ngOnInit(): void {
    this.conventionId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadConventionDetails();
  }

  loadConventionDetails(): void {
    this.conventionService.getEntitiesByConventionId(this.conventionId).subscribe({
      next: (res) => this.data = res,
      error: (err) => console.error('Erreur lors du chargement des détails :', err)
    });
  }

  openJournalUpdateForm(journal: any): void {
    this.selectedJournal = { ...journal };
    this.showJournalUpdateForm = true;
  }

  closeJournalUpdateForm(): void {
    this.showJournalUpdateForm = false;
    this.selectedJournal = null;
  }

  updateJournal(): void {
    if (!this.selectedJournal) return;

    this.journalService.valideJournal(this.selectedJournal.id, this.selectedJournal).subscribe({
      next: (updatedJournal) => {
        this.data.journal = updatedJournal;
        this.showJournalUpdateForm = false;
      },
      error: (err) => console.error('Erreur lors de la mise à jour du journal :', err)
    });
  }

  // Bonus : Boutons direct (valide / non valide)
  validerJournal(): void {
    if (!this.data?.journal) return;

    const updated = { ...this.data.journal, isValide: true, remark: 'Validé par l\'admin' };
    this.updateJournalDirect(updated);
  }

  refuserJournal(): void {
    if (!this.data?.journal) return;

    const updated = { ...this.data.journal, isValide: false, remark: 'Refusé par l\'admin' };
    this.updateJournalDirect(updated);
  }

  private updateJournalDirect(updatedJournal: any): void {
    this.journalService.valideJournal(updatedJournal.id, updatedJournal).subscribe({
      next: (res) => {
        this.data.journal = res;
        alert('Journal mis à jour avec succès');
      },
      error: (err) => console.error('Erreur lors de la mise à jour directe du journal :', err)
    });
  }

  goToDetails(conventionId: number) {
    this.router.navigate(['/admin/coventiontasks', conventionId]);}

    downloadReport(fileName :string): void {
      this.fileService.downloadReport(fileName).subscribe((blob) => {
        const url =window.URL.createObjectURL(blob);
        const a =document.createElement('a');
  
        a.href =url;
        a.download =fileName;
        a.click();
        window.URL.revokeObjectURL(url)
      })
    }
}



