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
  searchTerm: string = '';
  sujetIndexToEdit: number = -1;
  message: string = '';
  selectedSujet: intershipoffer | null = null;

  // Ensure the mapping is consistent with the enum values in 'intershipoffer'
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

  postulate(idsujet: number): void {
    const id = this.sujets[idsujet].idsujet;
    this.router.navigate(['/create/postulation', id]);
  }

  modifierSujet(sujet: intershipoffer): void {
    this.sujetService.updateOffer(sujet).subscribe(() => {
      this.sujetIndexToEdit = -1;
      this.selectedSujet = null;
      this.message = "Modification effectuée avec succès.";
      this.fetchSujets();
    });
  }

  ajouterSujet(): void {
    this.router.navigate(['/adminsujetcreate']);
  }

  displayPostulations(idsujet: number): void {
    this.router.navigate(['/postulationbysujet', idsujet]);
  }

  // Make sure the mapping is correct and the enum values match
  mappedTypeInternship(type: TypeInternship): string {
    return this.typeInternshipMapping[type] || type;
  }

  logSujetId(id: number | undefined): void {
    console.log("Deleting subject with ID:", id);
  }
}
