
import { Component, OnInit } from '@angular/core';
import { IntershipOfferService } from 'src/app/Services/IntershipOffer/intership-offer-services.service';
import { intershipoffer, TypeInternship } from 'src/app/models/intershipoffer';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user/user.service';


@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadadminComponent implements OnInit {
  sujets: intershipoffer[] = [];
  filteredSujets: intershipoffer[] = [];
  searchTerm: string = '';
  message: string = '';
  companyName: string = '';
  companyEmail: string = '';
  contact : string = '';

  typeInternshipMapping: { [key in TypeInternship]: string } = {
    [TypeInternship.STAGE_FORMATION_HUMAINE_SOCIALE]: 'Formation Humaine et Sociale',
    [TypeInternship.STAGE_IMMERSION_ENTREPRISE]: 'Immersion en entreprise',
    [TypeInternship.STAGE_INGENIEUR]: 'Internship Ingénieur',
    [TypeInternship.STAGE_PFE]: 'Projet de Fin d\'Etudes',
  };


  constructor(
    private sujetService: IntershipOfferService,
    private userService: UserService,
     private router: Router) {}


  ngOnInit(): void {
    this.fetchSujets();
    this.fetchCompanyDetails(1); 
    console.log("Company :",this.fetchCompanyDetails(1));
  }


  fetchCompanyDetails(id: number): void {
    this.userService.getCompanyById(id).subscribe({
      next: (company) => {
        console.log('Fetched company:', company);
        this.companyName = company.companyName ?? '';   
        this.companyEmail = company.mail ?? '';   
        this.contact = company.contact ?? '';   
      },
      error: (err) => {
        console.error('Error fetching company details:', err);  
        
      }
    });
  }

  fetchSujets(): void {
    this.sujetService.getAllOffers().subscribe({
      next: (sujets) => {
        this.sujets = sujets.sort((a, b) => b.idsujet - a.idsujet);
        this.filteredSujets = this.sujets;
        this.loadImages(); // Load images and PDFs after fetching
      },
      error: () => {
        this.message = "Failed to load internship offers.";
      }
    });
  }


  mappedTypeInternship(type: TypeInternship): string {
    return this.typeInternshipMapping[type] || type;
  }


  filterSujets(): void {
    this.filteredSujets = this.sujets.filter(sujet =>
      sujet.requirements.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      sujet.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  supprimerSujet(idSujet: number | undefined): void {
    if (idSujet === undefined) return;
    this.sujetService.deleteOffer(idSujet).subscribe({
      next: () => {
        this.message = "Suppression effectuée avec succès.";
        this.fetchSujets();
      },
      error: () => {
        this.message = "Failed to delete internship offer.";
      }
    });
  }


  afficherFormulaireModifier(sujet: intershipoffer): void {
    if (sujet && sujet.idsujet !== undefined) {
      this.router.navigate(['/adminsujetedit', sujet.idsujet]);
    } else {
      console.error("Invalid sujet or ID missing:", sujet);
    }
  }


  ajouterSujet(): void {
    this.router.navigate(['/adminsujetcreate']);
  }


  displayPostulations(idsujet: number): void {
    this.router.navigate(['/postulationbysujet', idsujet]);
  }


  loadImages(): void {
    this.filteredSujets.forEach(sujet => {
      if (sujet.idsujet) {
        // Load image
        this.sujetService.getImage(sujet.idsujet).subscribe({
          next: (imageBlob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              // Convert Blob to base64 string
              sujet.imageUrl = reader.result as string;  // Now imageUrl is a string (base64)
            };
            reader.readAsDataURL(imageBlob);
          },
          error: () => {
            sujet.imageUrl = 'assets/images/logo.png';
          }
        });

 


       
      }
    });
  }

}
