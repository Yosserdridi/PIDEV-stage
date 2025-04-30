import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PostulationService } from 'src/services/service_postulation/postulation.service';
import { UserService } from 'src/services/service_postulation/user.service';
import { postulation } from 'src/model/postulation';


@Component({
  selector: 'app-allpostulations',
  templateUrl: './allpostulation.component.html',
  styleUrls: ['./allpostulation.component.css']
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
  pdfUrls: { [key: number]: SafeResourceUrl | null } = {};
  pdfLoadingStates: { [key: number]: boolean } = {};
  pdfErrorStates: { [key: number]: string } = {};
  studentFName: string = '';
  studentLName: string = '';

  constructor(private postulationService: PostulationService,private sanitizer: DomSanitizer,  private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.loadPostulations();  // Fetch all postulations when the component initializes
    this.fetchStudentDetails(1); 
    console.log("Student :",this.fetchStudentDetails(1));
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

  closePdf(postulationId: number): void {
    if (this.pdfUrls[postulationId]) {
      this.pdfUrls[postulationId] = null;
    }
  }
  

}
