import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { IntershipOfferService } from 'src/app/Services/IntershipOffer/intership-offer-services.service';
import { intershipoffer, TypeInternship } from 'src/app/models/intershipoffer';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateadminComponent implements AfterViewInit {

  // New offer model
  newOffer: intershipoffer = new intershipoffer();
  
  // Available types of internship (enum values)
  internshipTypes = Object.values(TypeInternship);

  // Mapping for internship types to user-friendly names
  typeInternshipMapping: { [key in TypeInternship]: string } = {
    [TypeInternship.STAGE_FORMATION_HUMAINE_SOCIALE]: 'Formation Humaine et Sociale',
    [TypeInternship.STAGE_IMMERSION_ENTREPRISE]: 'Immersion en entreprise',
    [TypeInternship.STAGE_INGENIEUR]: 'Internship Ingénieur',
    [TypeInternship.STAGE_PFE]: 'Projet de Fin d\'Etudes',
  };

  // Error message property
  errorMessage: string = '';

  // ViewChild to get the form reference
  @ViewChild('createForm') createForm!: NgForm;

  constructor(
    private internshipOfferService: IntershipOfferService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    if (this.createForm) {
      console.log('Form initialized');
    }
  }

  // Method to map internship type to user-friendly names
  mappedTypeInternship(type: TypeInternship): string {
    return this.typeInternshipMapping[type] || type;  // Default to the enum value if not found
  }

  // Submit the form to create the internship offer
  onSubmit(): void {
    if (this.createForm?.valid) {
      if (this.newOffer.title && this.newOffer.description && this.newOffer.companymail) {
        this.internshipOfferService.addOffer(this.newOffer).subscribe({
          next: (response) => {
            console.log('Internship offer created successfully:', response);
            this.router.navigate(['/adminsujetread']);
          },
          error: (error) => {
            console.error('Error creating internship offer:', error);
            if (error.status === 409) { // Check for conflict (offer already exists)
              this.errorMessage = 'Offer exists already';
            } else {
              this.errorMessage = 'Offer exists already. Please try again.';
            }
          }
        });
      }
    } else {
      this.errorMessage = "Form is not valid. Please check all fields.";
      console.error(this.errorMessage);
    }
  }
}
