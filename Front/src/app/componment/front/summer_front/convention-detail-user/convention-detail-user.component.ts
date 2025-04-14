import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entities } from 'src/model/entities';
import { ConventionService } from 'src/services/convention.service';

@Component({
  selector: 'app-convention-detail-user',
  templateUrl: './convention-detail-user.component.html',
  styleUrls: ['./convention-detail-user.component.css']
})
export class ConventionDetailUserComponent {


  conventionId!: number;
  details!: Entities;
  error: string | null = null;


  constructor(   private route: ActivatedRoute,
    private conventionService: ConventionService) {}

  ngOnInit(): void {
    this.conventionId = Number(this.route.snapshot.paramMap.get('id'));
    this.conventionService.getConventionsByStudentId(1).subscribe({
      next: (conventions) => {
        this.details = conventions.find(
          c => c.internshipConvention.id === this.conventionId
        )!;
      },
      error: (err) => {
        this.error = err.error?.error || 'Something went wrong!';
      }
    });
  }  
 
  }




