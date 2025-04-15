import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostulationService } from 'src/app/Services/postulation/postulation.service';
import { postulation } from 'src/app/models/postulation';
import { IntershipOfferService } from 'src/app/Services/IntershipOffer/intership-offer-services.service';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-postulations',
  templateUrl: './postulations.component.html',
  styleUrls: ['./postulations.component.css']
})
export class PostulationsSpComponent implements OnInit {

  postulations: postulation[] = [];
  filteredPostulations: postulation[] = [];  // Store filtered postulations
  paginatedPostulations: postulation[] = [];  // Store paginated postulations
  subjectTitle: string = '';  // Variable to hold the subject title
  idsujet: number | undefined;
  filterStatus: string = 'all';  // Default filter to 'all'

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 5;   
  totalPages: number = 1;

  studentFName: string = '';
  studentLName: string = '';

  constructor(
    private postulationService: PostulationService,
    private subjectService: IntershipOfferService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idsujet = Number(this.route.snapshot.paramMap.get('idsujet'));
    this.loadSubjectTitle();
    this.loadPostulations();
    this.fetchStudentDetails(1); 
    console.log("Student :",this.fetchStudentDetails(1));
 
  }

  loadSubjectTitle(): void {
    if (this.idsujet !== undefined) {
      this.subjectService.getOfferById(this.idsujet).subscribe(
        (data) => {
          this.subjectTitle = data.title;
        },
        (error) => {
          console.error('Error fetching subject title:', error);
        }
      );
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

  
  loadPostulations(): void {
    if (this.idsujet !== undefined) {
      this.postulationService.getPostulationsByIdsujet(this.idsujet).subscribe(
        (data) => {
          this.postulations = data;
          this.filteredPostulations = data;
          this.calculatePagination();
        },
        (error) => {
          console.error('Error fetching postulations:', error);
        }
      );
    } else {
      console.error('Idsujet is undefined');
    }
  }

  applyFilter(): void {
    if (this.filterStatus === 'all') {
      this.filteredPostulations = this.postulations;
    } else {
      this.filteredPostulations = this.postulations.filter(
        postulation => postulation.status.toString() === this.filterStatus
      );
    }
    this.calculatePagination();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredPostulations.length / this.itemsPerPage);
    this.paginatePostulations();
  }

  paginatePostulations(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPostulations = this.filteredPostulations.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginatePostulations();
    }
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

  acceptPostulation(postulationId: number): void {
    this.postulationService.acceptPostulation(postulationId).subscribe(
      () => {
        this.loadPostulations();
      },
      (error) => {
        console.error('Error accepting postulation:', error);
      }
    );
  }

  rejectPostulation(postulationId: number): void {
    this.postulationService.rejectPostulation(postulationId).subscribe(
      () => {
        this.loadPostulations();
      },
      (error) => {
        console.error('Error rejecting postulation:', error);
      }
    );
  }
}
