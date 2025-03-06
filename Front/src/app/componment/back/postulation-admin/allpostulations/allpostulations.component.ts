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
  paginatedPostulations: postulation[] = [];
  selectedStatus: number | string = '';  // Allow empty value for 'All'

  // Pagination variables
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;

  constructor(private postulationService: PostulationService) { }

  ngOnInit(): void {
    this.loadPostulations();  // Fetch all postulations when the component initializes
  }

  loadPostulations(): void {
    this.postulationService.getAllPostulations().subscribe(postulations => {
      console.log("Fetched postulations:", postulations); // Debugging
      // Sort the postulations by postulationDate (descending order)
      this.postulations = postulations.sort((a, b) => new Date(b.postulationDate).getTime() - new Date(a.postulationDate).getTime());
      this.applyFilter();  // Apply filter and pagination when postulations are loaded
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

    // Calculate total pages
    this.totalPages = Math.ceil(this.filteredPostulations.length / this.pageSize);
    this.updatePageData();
  }

  // Update the paginated postulations based on current page
  updatePageData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPostulations = this.filteredPostulations.slice(startIndex, endIndex);
  }

  // Change the current page
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePageData();
  }
}
