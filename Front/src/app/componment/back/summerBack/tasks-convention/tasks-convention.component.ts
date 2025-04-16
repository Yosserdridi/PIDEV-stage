import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entities } from 'src/model/entities';
import { ConventionService } from 'src/services/convention.service';

@Component({
  selector: 'app-tasks-convention',
  templateUrl: './tasks-convention.component.html',
  styleUrls: ['./tasks-convention.component.css']
})
export class TasksConventionComponent {

    conventionId!: number;
    data!: Entities;
    selectedJournal: any = null;
    showJournalUpdateForm = false;
  
    constructor(
      private route: ActivatedRoute,
      private conventionService: ConventionService,
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
  



}
