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
  
  // Available types of internship
  internshipTypes = Object.values(TypeInternship);

  // Error message property
  errorMessage: string = '';  // Add this property to store the error message

  // ViewChild to get the form reference
  @ViewChild('createForm') createForm!: NgForm;

  constructor(
    private internshipOfferService: IntershipOfferService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    // To prevent the error when accessing ViewChild immediately after constructor
    if (this.createForm) {
      console.log('Form initialized');
    }
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
