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
  newOffer: intershipoffer = new intershipoffer();
  internshipTypes = Object.values(TypeInternship);
  typeInternshipMapping: { [key in TypeInternship]: string } = {
    [TypeInternship.STAGE_FORMATION_HUMAINE_SOCIALE]: 'Formation Humaine et Sociale',
    [TypeInternship.STAGE_IMMERSION_ENTREPRISE]: 'Immersion en entreprise',
    [TypeInternship.STAGE_INGENIEUR]: 'Internship Ingénieur',
    [TypeInternship.STAGE_PFE]: 'Projet de Fin d\'Etudes',
  };
  errorMessage: string = '';
  selectedFile: File | null = null;
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


  mappedTypeInternship(type: TypeInternship): string {
    return this.typeInternshipMapping[type] || type;
  }


  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }


  onSubmit(): void {
    if (this.createForm?.valid) {
      if (this.newOffer.title && this.newOffer.description  && this.newOffer.typeInternship) {
        this.internshipOfferService.addOffer(this.newOffer).subscribe({
          next: (response) => {
            console.log('Internship offer created successfully:', response);
            // Check if an image file was selected
            if (this.selectedFile) {
              this.internshipOfferService.uploadImage(response.idsujet, this.selectedFile).subscribe({
                next: (uploadResponse) => {
                  if (uploadResponse && uploadResponse.imageUrl) {
                    console.log('Image uploaded successfully:', uploadResponse.imageUrl);
                    this.router.navigate(['/adminsujetread']);
                  } else {
                    console.error('No image URL returned from the server.');
                    this.errorMessage = 'Offer created, but image upload failed.';
                  }
                },
                error: (uploadError) => {
                  console.error('Error uploading image:', uploadError);
                  this.errorMessage = 'Offer created but image upload failed.';
                }
              });
            } else {
              this.router.navigate(['/adminsujetread']);
            }
          },
          error: (error) => {
            console.error('Error creating internship offer:', error);
            this.errorMessage = error.status === 409
              ? 'An offer with the same title and type already exists!'
              : 'An error occurred. Please try again.';
          }
        });
      } else {
        this.errorMessage = 'Please fill all the required fields.';
      }
    } else {
      this.errorMessage = "Form is not valid. Please check all fields.";
      console.error(this.errorMessage);
    }
  }
}

