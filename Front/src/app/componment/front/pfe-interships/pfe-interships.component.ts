import { Component } from '@angular/core';
import { InternshipConventionService, InternshipConvention } from '../../../services/internship-convention.service';
import { TypeInternship } from 'src/app/models/type_internship.eunm';
@Component({
  selector: 'app-pfe-interships',
  templateUrl: './pfe-interships.component.html',
  styleUrls: ['./pfe-interships.component.css']
})
export class PfeIntershipsComponent {
  typeInternshipEnum = Object.values(TypeInternship); // Getting enum values
  internship: InternshipConvention = {
    companyName: '',
    startDate: new Date(),  // Initialize as Date object
    endDate: new Date(),    // Initialize as Date object
    companyAddress: '',
    companyContact: '',
    typeInternship: TypeInternship.INTERNSHIP_PFE, // Default to an enum value
  };

  constructor(private internshipService: InternshipConventionService) {}

  addInternship(): void {
    this.internshipService.addInternship(this.internship).subscribe(
      (response) => {
        console.log('Internship added successfully!', response);
        alert('Internship added successfully!');
      },
      (error) => {
        console.error('Error adding internship', error);
        alert('Error adding internship. Please try again later.');
      }
    );
  }
  
}
