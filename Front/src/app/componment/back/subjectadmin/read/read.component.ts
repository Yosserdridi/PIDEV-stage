import { Component, OnInit } from '@angular/core';
import { IntershipOfferService } from 'src/app/Services/IntershipOffer/intership-offer-services.service';
import { intershipoffer } from 'src/app/models/intershipoffer';
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
  sujetIndexToEdit: number = -1;
  message: string = '';
  selectedSujet: intershipoffer | null = null;

  constructor(private sujetService: IntershipOfferService, private router: Router) {}

  ngOnInit(): void {
    this.fetchSujets();
  }

  fetchSujets(): void {
    this.sujetService.getAllOffers().subscribe(sujets => {
      this.sujets = sujets;
      this.filteredSujets = sujets;  
      console.log(sujets);
    });
 
  }

  filterSujets(): void {
    this.filteredSujets = this.sujets.filter(sujet =>
      sujet.companyname.toLowerCase().includes(this.searchTerm.toLowerCase())
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
  

  afficherFormulaireModifier(index: number): void {
    const id = this.sujets[index].id;  
    this.router.navigate(['/adminsujetedit', id]);
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

     // Navigate to the postulations page with the corresponding idsujet
    displayPostulations(idsujet: number): void {
      this.router.navigate(['/postulationbysujet', idsujet]);
    }



  logSujetId(id: number | undefined): void {
    console.log("Deleting subject with ID:", id);
  }
  

}
