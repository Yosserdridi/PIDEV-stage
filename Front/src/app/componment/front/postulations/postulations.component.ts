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
  pagedPostulations: postulation[] = [];
  selectedStatus: string = ''; // Default to "All"

  currentPage: number = 1;
  pageSize: number = 5;  
  totalPages: number = 0;

  constructor(private postulationService: PostulationService) {}

  ngOnInit(): void {
    this.loadPostulations();
  }

  loadPostulations(): void {
    this.postulationService.getAllPostulations().subscribe(
      (postulations) => {
        this.postulations = postulations.sort((a, b) =>
          new Date(b.postulationDate).getTime() - new Date(a.postulationDate).getTime()
        );
        this.filteredPostulations = [...this.postulations];
        this.updatePagination();
      },
      (error) => {
        console.error('Error fetching postulations:', error);
      }
    );
  }

  filterByStatus(status: string): void {
    this.selectedStatus = status;
  
    if (status === '') {
      // Reset the filtered list to all postulations when "All" is selected
      this.filteredPostulations = [...this.postulations];
      this.updatePagination(); // Call updatePagination after resetting the data
    } else {
      const statusNumber = +status;
      this.postulationService.getPostulationsByStatus(statusNumber).subscribe(
        (data) => {
          this.filteredPostulations = data;
          this.updatePagination(); // Call updatePagination after getting the filtered data
        },
        (error) => {
          console.error('Error filtering postulations by status:', error);
        }
      );
    }
  }
  


  getStatusImage(status: number): string {
    switch (status) {
      case 0: 
        return 'assets/images/load.png';  
      case 1: 
        return 'assets/images/accept.png'; 
      case 2: 
        return 'assets/images/forbidden.png';
      default:
        return ''; 
    }
  }
  
  getStatusClass(status: number): string {
    switch (status) {
      case 0: return 'pending';
      case 1: return 'accepted';
      case 2: return 'rejected';
      default: return '';
    }
  }
  


  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredPostulations.length / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages) || 1;
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedPostulations = this.filteredPostulations.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginate();
  }

  getStatusLabel(status: number): string {
    switch (status) {
      case 0: return 'Pending';
      case 1: return 'Accepted';
      case 2: return 'Rejected';
      default: return 'Unknown';
    }
  }

  deletePostulation(id: number): void {
    if (confirm('Are you sure you want to delete this postulation?')) {
      this.postulationService.deletePostulation(id).subscribe(
        () => {
          this.filteredPostulations = this.filteredPostulations.filter(post => post.id !== id);
          this.updatePagination();
        },
        (error) => {
          console.error('Error deleting postulation:', error);
        }
      );
    }
  }
}
