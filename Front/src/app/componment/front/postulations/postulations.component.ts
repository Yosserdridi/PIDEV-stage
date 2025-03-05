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
  filteredPostulations: postulation[] = [];
  selectedStatus: number = 0;  // Default to 'Pending' (status 0)

  constructor(private postulationService: PostulationService) { }

  ngOnInit(): void {
    this.loadPostulations();
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
  
  filterByStatus(): void {
    if (this.selectedStatus === 0) {
      // Show all postulations when "All" is selected
      this.filteredPostulations = [...this.postulations]; // Using spread operator to create a new reference
    } else {
      // Fetch postulations by selected status
      this.postulationService.getPostulationsByStatus(this.selectedStatus).subscribe(
        (data) => {
          this.filteredPostulations = data;
        },
        (error) => {
          console.error('Error filtering postulations by status:', error);
        }
      );
    }
  }
  


  getStatusLabel(status: number): string {
    switch (status) {
      case 0: return 'Pending';
      case 1: return 'Accepted';
      case 2: return 'Rejected';
      default: return 'Unknown';
    }
  }

  // Delete postulation by ID
  deletePostulation(id: number): void {
    if (confirm('Are you sure you want to delete this postulation?')) {
      this.postulationService.deletePostulation(id).subscribe(
        () => {
          this.filteredPostulations = this.filteredPostulations.filter(post => post.id !== id);
        },
        (error) => {
          console.error('Error deleting postulation:', error);
        }
      );
    }
  }
}
