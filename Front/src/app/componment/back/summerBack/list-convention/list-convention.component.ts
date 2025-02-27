import { Component, OnInit } from '@angular/core';
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

  // Search criteria for companyName
  searchCompanyName: string = '';

  constructor(private conventionService: ConventionService) {}

  ngOnInit(): void {
    // Fetch all conventions on initialization
    this.conventionService.getAllInternshipConventions().subscribe((data) => {
      this.conventions = data;
      this.filteredConventions = data; // Initially, show all conventions
    });
  }

  // Handle deleting a convention
  deleteConvention(id: number): void {
    this.conventionService.deleteConvention(id).subscribe(() => {
      this.ngOnInit(); // Reload the conventions after deletion
    });
  }

  // Filter conventions based on companyName dynamically
  searchConvention(): void {
    this.filteredConventions = this.conventions.filter((convention) => {
      return convention.companyName.toLowerCase().includes(this.searchCompanyName.toLowerCase());
    });
    this.notFound = this.filteredConventions.length === 0; // Set notFound to true if no results are found
  }


  toggleValidity(convention: Convention): void {
    this.conventionService.toggleConventionValidity(convention.id, !convention.isValid).subscribe(
      () => {
        convention.isValid = !convention.isValid;
        window.location.reload();
      },
      error => {
        window.location.reload();
     
      }
    );
  }
}
