import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IntershipOfferService } from 'src/app/Services/IntershipOffer/intership-offer-services.service';
import { intershipoffer } from 'src/app/models/intershipoffer';
import { Location } from '@angular/common';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateadminComponent implements OnInit {


  companyName: string = '';
  companyEmail: string = '';
  contact : string = '';


     offerToUpdate: intershipoffer = new intershipoffer();
  
    constructor(
      private route: ActivatedRoute,
      private internshipOfferService: IntershipOfferService,
      private userService: UserService,
      private router: Router,
      private location: Location
    ) {}

    
  
    ngOnInit(): void {
      const id = +this.route.snapshot.paramMap.get('id')!;  // Get the 'id' from the URL
      this.getOffer(id);  // Fetch the offer to be updated
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
  
    
    // Fetch the offer details
    getOffer(id: number): void {
      this.internshipOfferService.getOfferById(id).subscribe(
        offer => {
          this.offerToUpdate = offer;
        },
        error => console.error("Error fetching offer:", error)
      );
    }
  
    // Handle form submission to update the offer
    onSubmit(): void {
      this.internshipOfferService.updateOffer(this.offerToUpdate).subscribe(
        () => {
          console.log('Offer updated successfully');
          this.router.navigate(['/adminsujetread']);  // Redirect to the listing page
        },
        error => {
          console.error('Error updating offer:', error);
        }
      );
    }
  
    // Go back to the previous page
    goBack(): void {
      this.location.back();
    }
  }
  