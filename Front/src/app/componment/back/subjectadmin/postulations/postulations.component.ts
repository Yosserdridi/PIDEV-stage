import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostulationService } from 'src/app/Services/postulation/postulation.service';
import { postulation } from 'src/app/models/postulation';

@Component({
  selector: 'app-postulations',
  templateUrl: './postulations.component.html',
  styleUrls: ['./postulations.component.css']
})
export class PostulationsSpComponent  implements OnInit {

  postulations: postulation[] = [];
  idsujet: number | undefined;

  constructor(
    private postulationService: PostulationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Retrieve the 'idsujet' from the route parameter
    this.idsujet = Number(this.route.snapshot.paramMap.get('idsujet'));
    this.loadPostulations();
  }

  // Load postulations based on idsujet
  loadPostulations(): void {
    if (this.idsujet !== undefined) {
      this.postulationService.getPostulationsByIdsujet(this.idsujet).subscribe(
        (data) => {
          this.postulations = data;
        },
        (error) => {
          console.error('Error fetching postulations:', error);
        }
      );
    } else {
      console.error('Idsujet is undefined');
    }
  }

  
  
}
