import { Component, OnInit } from '@angular/core';
import {DomSanitizer ,SafeResourceUrl } from '@angular/platform-browser';
import { PostulationService } from 'src/app/Services/postulation/postulation.service';
import { UserService } from 'src/app/Services/user/user.service';
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

  studentFName: string = '';
  studentLName: string = '';
  loading = true;
  error: string | null = null;
  pdfUrls: { [key: number]: SafeResourceUrl | null } = {};
  pdfLoadingStates: { [key: number]: boolean } = {};
  pdfErrorStates: { [key: number]: string } = {};


  constructor(private postulationService: PostulationService , private userService: UserService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadPostulations();
    this.fetchStudentDetails(1); 

  }

  loadPostulations(): void {
    this.postulationService.getPostulationsByStudentId(1).subscribe(
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


  loadPdf(postulationId: number): void {
    this.pdfLoadingStates[postulationId] = true;
    this.pdfErrorStates[postulationId] = '';

    this.postulationService.getPdfBlob(postulationId).subscribe({
      next: (blob: Blob) => {
        this.pdfLoadingStates[postulationId] = false;
        if (blob.type === 'application/pdf' && blob.size > 0) {
          const url = window.URL.createObjectURL(blob);
          this.pdfUrls[postulationId] = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        } else {
          this.pdfErrorStates[postulationId] = 'Invalid or empty PDF file.';
          this.pdfUrls[postulationId] = null;
        }
      },
      error: (error: any) => {
        console.error('Error fetching PDF:', error);
        this.pdfLoadingStates[postulationId] = false;
        this.pdfErrorStates[postulationId] = 'Failed to load PDF';
        this.pdfUrls[postulationId] = null;
      }
    });
  }

  downloadPdf(postulationId: number): void {
    this.pdfLoadingStates[postulationId] = true;
    this.pdfErrorStates[postulationId] = '';

    this.postulationService.getPdfBlob(postulationId).subscribe({
      next: (blob: Blob) => {
        this.pdfLoadingStates[postulationId] = false;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `postulation_${postulationId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      error: (error: any) => {
        console.error('Error downloading PDF:', error);
        this.pdfLoadingStates[postulationId] = false;
        this.pdfErrorStates[postulationId] = 'Download failed';
      }
    });
  }

  
  fetchStudentDetails(id: number): void {
    this.userService.getStudentById(id).subscribe({
      next: (student) => {
        console.log('Fetched student:', student);
        this.studentFName = student.firstName ?? '';  
         this.studentLName = student.lastName ?? '';
      },
      error: (err) => {
        console.error('Error fetching student details:', err);  
        
      }
    });
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
  closePdf(postulationId: number): void {
    if (this.pdfUrls[postulationId]) {
      this.pdfUrls[postulationId] = null;
    }
  }
  
  
}
