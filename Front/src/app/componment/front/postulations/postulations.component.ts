import { Component, OnInit } from '@angular/core';
import { PostulationService } from 'src/app/Services/postulation/postulation.service';
import { postulation } from 'src/app/models/postulation';
@Component({
  selector: 'app-postulations',
  templateUrl: './postulations.component.html',
  styleUrls: ['./postulations.component.css']
})
export class PostulationsComponent implements OnInit {

  postulations: postulation[] = [];

  constructor(private postulationService: PostulationService) { }

  ngOnInit(): void {
    this.loadPostulations();  // Fetch all postulations when the component initializes
  }

  loadPostulations(): void {
    this.postulationService.getAllPostulations().subscribe(
      (data) => {
        this.postulations = data;
      },
      (error) => {
        console.error('Error fetching postulations:', error);
      }
    );
    console.log(this.postulations);
  }
}
