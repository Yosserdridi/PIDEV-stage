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

  toggleValidity(convention: Convention): void {
    this.conventionService.toggleConventionValidity(convention.id, !convention.isValid).subscribe(
      () => {
        convention.isValid = !convention.isValid;

        const staticPhoneNumber = '+21629073477';
        const message = `Votre convention a été ${convention.isValid ? 'validée' : 'refusée'}.`;

        console.log('Preparing to send SMS:', message);

        this.conventionService.sendSms(staticPhoneNumber, message).subscribe(
          () => {
            console.log('SMS sent successfully');
            window.location.reload();
          },
          error => {
            console.error('SMS sending failed:', error);
            window.location.reload();
          }
        );
      },
      error => {
        console.error('Convention update failed:', error);
        window.location.reload();
      }
    );
  }

  goToDetails(conventionId: number) {
    this.router.navigate(['/admin/conventionDetail', conventionId]);
  }




}
