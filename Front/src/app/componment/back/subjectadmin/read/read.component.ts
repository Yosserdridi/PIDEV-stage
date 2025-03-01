import { Component, OnInit } from '@angular/core';
import { IntershipOfferService } from 'src/app/Services/IntershipOffer/intership-offer-services.service';
import { intershipoffer, TypeInternship } from 'src/app/models/intershipoffer';
import { Router } from '@angular/router';

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

  // Mapping for internship types to user-friendly names
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
    this.sujetService.getAllOffers().subscribe(sujets => {
      console.log("Fetched sujets:", sujets); // Debugging
      // Sort the subjects by idsujet (descending order)
      this.sujets = sujets.sort((a, b) => b.idsujet - a.idsujet);
      this.filteredSujets = this.sujets;
    });
  }

  // Method to map internship type to user-friendly names
  mappedTypeInternship(type: TypeInternship): string {
    return this.typeInternshipMapping[type] || type;  // Default to the enum value if not found
  }

  filterSujets(): void {
    this.filteredSujets = this.sujets.filter(sujet =>
      sujet.companyname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      sujet.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  supprimerSujet(idSujet: number | undefined): void {
    if (idSujet === undefined) {
      console.error("Error: The subject ID is undefined.");
      return;
    }
    console.log("Deleting subject with ID:", idSujet);
    this.sujetService.deleteOffer(idSujet).subscribe(() => {
      this.message = "Suppression effectuée avec succès.";
      this.fetchSujets();
    });
  }

  afficherFormulaireModifier(sujet: intershipoffer): void {
    console.log("Editing sujet:", sujet); // Debugging
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
}
