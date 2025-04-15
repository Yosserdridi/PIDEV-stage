import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IntershipOfferService } from 'src/app/Services/IntershipOffer/intership-offer-services.service';
import { intershipoffer, TypeInternship } from 'src/app/models/intershipoffer';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  sujets: intershipoffer[] = [];
  filteredSujets: intershipoffer[] = [];
  pagedSujets: intershipoffer[] = [];
  searchTerm: string = '';
  message: string = '';
  companyName: string = '';
  companyEmail: string = '';
  contact : string = '';

  currentPage: number = 1;
  pageSize: number = 9;
  totalPages: number = 0;
  selectedSujet: intershipoffer | null = null;

  typeInternshipMapping: { [key in TypeInternship]: string } = {
    [TypeInternship.STAGE_FORMATION_HUMAINE_SOCIALE]: 'Formation Humaine et Sociale',
    [TypeInternship.STAGE_IMMERSION_ENTREPRISE]: 'Immersion en entreprise',
    [TypeInternship.STAGE_INGENIEUR]: 'Internship Ingénieur',
    [TypeInternship.STAGE_PFE]: 'Projet de Fin d\'Etudes',
  };

  constructor(
    private sujetService: IntershipOfferService,
    private userService: UserService,
    private router: Router,
    private cdRef: ChangeDetectorRef

  ) {}

  ngOnInit(): void {
    this.fetchSujets();
    this.fetchCompanyDetails(1); 
  }

  fetchSujets(): void {
    this.sujetService.getAllOffers().subscribe({
      next: (sujets) => {
        console.log("Fetched sujets:", sujets);  // Debugging
        this.sujets = sujets.sort((a, b) => b.idsujet - a.idsujet);

        this.filteredSujets = [...this.sujets];
        this.updatePagination();
        this.loadImages(); // Load images after fetching
      },
      error: () => {
        this.message = "Failed to load internship offers.";
      }
    });
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
        if (err.status === 404) {
          alert('Company not found!');
        } else {
          alert('An error occurred while fetching company details.');
        }
      }
    });
  }
  
  
  
  

  loadImages(): void {
    this.filteredSujets.forEach(sujet => {
      if (sujet.idsujet) {
        this.sujetService.getImage(sujet.idsujet).subscribe({
          next: (imageBlob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              sujet.imageUrl = reader.result as string; // Convert Blob to base64 URL
            };
            reader.readAsDataURL(imageBlob);
          },
          error: () => {
            sujet.imageUrl = 'assets/default-image.png'; // Fallback to default image
          }
        });
      }
    });
  }

  filterSujets(): void { 
    this.filteredSujets = this.sujets.filter(sujet => 
      (sujet.requirements.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false) ||
      (sujet.title?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false)
    );
    this.updatePagination();
  }
  

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredSujets.length / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages) || 1;
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedSujets = this.filteredSujets.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginate();
  }

  postulate(idsujet: number): void {
    const id = idsujet;
    this.router.navigate(['/create/postulation', id]);
  }

  openModal(index: number): void {
    this.selectedSujet = this.pagedSujets[index];
    console.log("Selected Sujet:", this.selectedSujet); // Debugging
  }

  closeModal(): void {
    this.selectedSujet = null;
  }

  mappedTypeInternship(type: TypeInternship): string {
    return this.typeInternshipMapping[type] || type;
  }

  
}
