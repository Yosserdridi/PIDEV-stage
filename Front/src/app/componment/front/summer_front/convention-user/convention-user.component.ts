import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Entities } from 'src/model/entities';
import { ConventionService } from 'src/services/convention.service';

@Component({
  selector: 'app-convention-user',
  templateUrl: './convention-user.component.html',
  styleUrls: ['./convention-user.component.css']
})
export class ConventionUserComponent {


  studentId = 1; // or get dynamically
  conventionDetails: Entities[] = [];
  error: string | null = null;



  constructor(private conventionService: ConventionService , private router:Router) {}

  ngOnInit(): void {
    this.getConventions();
 
  }

  
  getConventions(): void {
    this.conventionService.getConventionsByStudentId(this.studentId).subscribe({
      next: (data) => {
        this.conventionDetails = data;
      },
      error: (err) => {
        this.error = err.error?.error || 'Something went wrong!';
      }
    });
  }
  
  goToDetails() {
    this.router.navigate(['/valide_convention']);
    }


}
