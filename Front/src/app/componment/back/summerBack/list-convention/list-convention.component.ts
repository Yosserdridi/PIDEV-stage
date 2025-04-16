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
  isLoading: boolean = false; // Pour le spinner
  page: number = 1;
  pageSize: number = 3;

  constructor(
    private conventionService: ConventionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.conventionService.getAllInternshipConventions().subscribe((data) => {
      this.conventions = data;
      this.filteredConventions = data;
    });
  }

  get paginatedConventions(): Convention[] {
    const startIndex = (this.page - 1) * this.pageSize;
    return this.filteredConventions.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredConventions.length / this.pageSize);
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
    this.page = 1; // Réinitialiser la pagination
  }

  toggleValidity(convention: Convention): void {
    this.isLoading = true;
    this.conventionService.toggleConventionValidity(convention.id, !convention.isValid).subscribe(
      () => {
        convention.isValid = !convention.isValid;
        this.isLoading = false;
        console.log('Convention updated:', convention.isValid ? 'validée' : 'refusée');
        this.ngOnInit();
      },
      (error) => {
        console.error('Échec de la mise à jour de la convention:', error);
        this.isLoading = false;
      }
    );
  }

  sendTestEmail(conevntionId :number): void {
    this.isLoading = true;
    this.conventionService.email(conevntionId).subscribe(
      (response) => {
        console.log('Test email sent successfully:', response);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error sending test email:', error);
        this.isLoading = false;
      }
    );
  }

  goToDetails(conventionId: number): void {
    this.router.navigate(['/admin/conventionDetail', conventionId]);
  }
}
