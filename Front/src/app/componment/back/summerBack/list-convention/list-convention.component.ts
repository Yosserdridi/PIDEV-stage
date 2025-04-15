import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Convention } from 'src/model/convention';
import { ConventionService } from 'src/services/convention.service';

@Component({
  selector: 'app-list-convention',
  templateUrl: './list-convention.component.html',
  styleUrls: ['./list-convention.component.css']
})
export class ListConventionComponent implements OnInit {


  conventions: Convention[] = [];
  filteredConventions: Convention[] = [];
  notFound: boolean = false;
  searchCompanyName: string = '';

  constructor(private conventionService: ConventionService, private router:Router) {}

  ngOnInit(): void {
    this.conventionService.getAllInternshipConventions().subscribe((data) => {
      this.conventions = data;
      this.filteredConventions = data;
    });
  }

  deleteConvention(id: number): void {
    this.conventionService.deleteConvention(id).subscribe(() => {
      this.ngOnInit();
    });
  }

  searchConvention(): void {
    this.filteredConventions = this.conventions.filter((convention) =>
      convention.companyName.toLowerCase().includes(this.searchCompanyName.toLowerCase())
    );
    this.notFound = this.filteredConventions.length === 0;
  }

  isLoading = false;  // variable pour gérer l'état de chargement

  toggleValidity(convention: Convention): void {
    // Bascule la validité de la convention
    this.isLoading = true; // Active le spinner
    this.conventionService.toggleConventionValidity(convention.id, !convention.isValid).subscribe(
      () => {
        convention.isValid = !convention.isValid;
        console.log('Convention updated:', convention.isValid ? 'validée' : 'refusée');
  
        // Validation de la convention (envoi de l'email)
   
      },
      error => {
        console.error('Échec de la mise à jour de la convention:', error);
        this.isLoading = false;  // Désactive le spinner
        window.location.reload();
      }
    );
  }

    sendTestEmail(): void {
      this.isLoading = true; // Show loading spinner
  
      this.conventionService.email(16) // You can pass any valid ID for testing purposes
        .subscribe(
          (response) => {
            console.log('Test email sent successfully:', response);
            this.isLoading = false; // Hide loading spinner
          },
          (error) => {
            console.error('Error sending test email:', error);
            this.isLoading = false; // Hide loading spinner
          }
        );
    }
    
    
  
  goToDetails(conventionId: number) {
    this.router.navigate(['/admin/conventionDetail', conventionId]);
  }




}
