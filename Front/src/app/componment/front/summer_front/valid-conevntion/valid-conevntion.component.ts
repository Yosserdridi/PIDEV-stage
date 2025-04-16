import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Convention } from 'src/model/convention';
import { ConventionService } from 'src/services/convention.service';

@Component({
  selector: 'app-valid-conevntion',
  templateUrl: './valid-conevntion.component.html',
  styleUrls: ['./valid-conevntion.component.css']
})
export class ValidConevntionComponent {

  conventions: Convention[] = [];
  conventionId !: number;

  constructor(private cs: ConventionService,private router:Router) {}

  ngOnInit(): void {
    this.cs.getAllInternshipConventions().subscribe(data => {
      this.conventions = data;
    });
  }

  canProceed(convention: any): boolean {
    return convention.isValid;
  }

  proceed(convention: Convention): void {
    if (convention.isValid) {
      // Store conventionId and log it
      this.conventionId = convention.id;
      console.log("Convention created with ID:", this.conventionId);

      // Navigate to the next step (e.g., /add-internship with conventionId as a parameter)
      this.router.navigate(['/add-internship', this.conventionId]);
    } else {
      // Handle invalid convention case
      alert('Your convention is invalid. Please contact the admin.');
    }
  }




}
