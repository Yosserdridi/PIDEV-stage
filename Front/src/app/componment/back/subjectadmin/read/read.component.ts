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
  message: string = '';

  constructor(private sujetService: IntershipOfferService, private router: Router) {}

  ngOnInit(): void {
    this.fetchSujets();
  }
  fetchSujets(): void {
    this.sujetService.getAllOffers().subscribe(sujets => {
      console.log("Fetched sujets:", sujets); // Debugging
      this.sujets = sujets;
      this.filteredSujets = sujets;  
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
