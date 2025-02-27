import { Component, OnInit } from '@angular/core';
import { PostulationService } from 'src/app/Services/postulation/postulation.service';
import { postulation } from 'src/app/models/postulation';

@Component({
  selector: 'app-allpostulations',
  templateUrl: './allpostulations.component.html',
  styleUrls: ['./allpostulations.component.css']
})
export class AllPostulationsComponent implements OnInit {

  postulations: postulation[] = [];
  filteredPostulations: postulation[] = [];
  selectedStatus: number | string = '';  // Allow empty value for 'All'

  constructor(private postulationService: PostulationService) { }

  ngOnInit(): void {
    this.loadPostulations();  // Fetch all postulations when the component initializes
  }

  loadPostulations(): void {
    this.postulationService.getAllPostulations().subscribe(
      (data) => {
        this.postulations = data;
        this.filteredPostulations = data;  // Initially display all postulations
      },
      (error) => {
        console.error('Error fetching postulations:', error);
      }
    );
  }

  getStatusLabel(status: number): string {
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Accepted';
      case 2:
        return 'Rejected';
      default:
        return 'Unknown';
    }
  }

  acceptPostulation(id: number): void {
    // Add the accept postulation logic
    console.log(`Postulation ${id} accepted`);
  }

  rejectPostulation(id: number): void {
    // Add the reject postulation logic
    console.log(`Postulation ${id} rejected`);
  }

  filterByStatus(): void {
    if (this.selectedStatus === '') {
      this.filteredPostulations = this.postulations;  // Show all postulations
    } else {
      this.filteredPostulations = this.postulations.filter(postulation => postulation.status === +this.selectedStatus);
    }
  }
}
