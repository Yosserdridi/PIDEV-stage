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
    this.postulationService.getAllPostulations().subscribe(postulations => {
      console.log("Fetched postulations:", postulations); // Debugging
      // Sort the postulations by postulationDate (descending order)
      this.postulations = postulations.sort((a, b) => new Date(b.postulationDate).getTime() - new Date(a.postulationDate).getTime());
      this.filteredPostulations = this.postulations;  // Initially, display all postulations
    }, (error) => {
      console.error('Error fetching postulations:', error);
    });
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

  // Accept postulation and update status from 0 -> 1
  acceptPostulation(id: number): void {
    this.postulationService.acceptPostulation(id).subscribe(
      () => {
        console.log(`Postulation ${id} accepted`);
        this.loadPostulations();  // Refresh postulations after accepting
      },
      (error) => {
        console.error('Error accepting postulation:', error);
      }
    );
  }

  // Reject postulation and update status from 0 -> 2
  rejectPostulation(id: number): void {
    this.postulationService.rejectPostulation(id).subscribe(
      () => {
        console.log(`Postulation ${id} rejected`);
        this.loadPostulations();  // Refresh postulations after rejecting
      },
      (error) => {
        console.error('Error rejecting postulation:', error);
      }
    );
  }

  // Filter postulations by selected status
  applyFilter(): void {
    if (this.selectedStatus === '') {
      this.filteredPostulations = this.postulations;  // Show all postulations
    } else {
      this.filteredPostulations = this.postulations.filter(postulation => postulation.status === +this.selectedStatus);
    }
  }
}
