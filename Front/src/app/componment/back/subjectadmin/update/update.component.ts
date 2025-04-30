import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IntershipOfferService } from 'src/services/service_postulation/intership-offer-services.service';
import { intershipoffer } from 'src/model/intershipoffer';
import { Location } from '@angular/common';
import { UserService } from 'src/services/service_postulation/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateadminComponent implements OnInit {
  sujets: intershipoffer[] = [];
  filteredSujets: intershipoffer[] = [];
  companyName: string = '';
  companyEmail: string = '';
  contact: string = '';
  offerToUpdate: intershipoffer = new intershipoffer();
  newImageFile: File | null = null;  
  imageUrl: string | null = null;    // Store the existing image URL separately for easy display

  constructor(
    private sujetService: IntershipOfferService,
    private route: ActivatedRoute,
    private internshipOfferService: IntershipOfferService,
    private userService: UserService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.getOffer(id);
    this.fetchCompanyDetails(1); 
  }

  fetchCompanyDetails(id: number): void {
    this.userService.getCompanyById(id).subscribe({
      next: (company) => {
        this.companyName = company.companyName ?? '';   
        this.companyEmail = company.mail ?? '';   
        this.contact = company.contact ?? '';   
      },
      error: () => {
        console.error('Failed to fetch company details');
      }
    });
  }

  getOffer(id: number): void {
    this.internshipOfferService.getOfferById(id).subscribe(
      offer => {
        this.offerToUpdate = offer;
        this.loadImage(offer.imageUrl);  // Load the image dynamically
      },
      error => console.error("Error fetching offer:", error)
    );
  }

  loadImage(imageUrl: string): void {
    if (imageUrl) {
      this.internshipOfferService.getImage(this.offerToUpdate.idsujet).subscribe({
        next: (imageBlob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.imageUrl = reader.result as string;  // Set image as base64 string
          };
          reader.readAsDataURL(imageBlob);
        },
        error: () => {
          this.imageUrl = 'assets/images/logo.png';  // Set a default image if failed
        }
      });
    }
  }

  onSubmit(): void {
    if (this.newImageFile) {
      this.updateImage();  
    } else {
      this.updateOffer();  
    }
  }

  updateOffer(): void {
    this.internshipOfferService.updateOffer(this.offerToUpdate).subscribe(
      () => {
        console.log('Offer updated successfully');
        this.router.navigate(['/adminsujetread']);
      },
      error => console.error('Error updating offer:', error)
    );
  }

  updateImage(): void {
    if (this.newImageFile) {
      this.internshipOfferService.uploadImage(this.offerToUpdate.idsujet, this.newImageFile).subscribe(
        (response) => {
          this.offerToUpdate.imageUrl = response.imageUrl;
          this.imageUrl = response.imageUrl;  // Update the displayed image
          this.updateOffer();
        },
        (error) => console.error('Error uploading image:', error)
      );
    }
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newImageFile = file;
    }
  }

  deleteImage(): void {
    if (this.offerToUpdate.imageUrl) {
      this.internshipOfferService.deleteImage(this.offerToUpdate.idsujet).subscribe(
        (response) => {
          console.log(response.message);
          this.offerToUpdate.imageUrl = "";
          this.imageUrl = null;  // Clear the displayed image
        },
        (error) => console.error('Error deleting image:', error)
      );
    } else {
      console.log('No image to delete.');
    }
  }

  goBack(): void {
    this.location.back();
  }
}
