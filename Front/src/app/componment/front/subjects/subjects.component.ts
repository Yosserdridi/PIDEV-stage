import { Component, OnInit } from '@angular/core';
import { IntershipOfferService } from 'src/app/Services/IntershipOffer/intership-offer-services.service';
import { intershipoffer, TypeInternship } from 'src/app/models/intershipoffer';
import { Router } from '@angular/router';

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

  constructor(private sujetService: IntershipOfferService, private router: Router) {}

  ngOnInit(): void {
    this.fetchSujets();
  }

  fetchSujets(): void {
    this.sujetService.getAllOffers().subscribe({
      next: (sujets) => {
        console.log("Fetched sujets:", sujets);
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
      sujet.companyname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      sujet.title.toLowerCase().includes(this.searchTerm.toLowerCase())
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