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
    this.loadPostulations();
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

  // Delete postulation by ID
  deletePostulation(id: number): void {
    if (confirm('Are you sure you want to delete this postulation?')) {
      this.postulationService.deletePostulation(id).subscribe(
        () => {
          // Remove the deleted postulation from the array
          this.postulations = this.postulations.filter(post => post.id !== id);
        },
        (error) => {
          console.error('Error deleting postulation:', error);
        }
      );
    }
  }
}
