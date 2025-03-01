import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostulationService } from 'src/app/Services/postulation/postulation.service';
import { postulation } from 'src/app/models/postulation';
import { IntershipOfferService } from 'src/app/Services/IntershipOffer/intership-offer-services.service';
import { intershipoffer } from 'src/app/models/intershipoffer';

@Component({
  selector: 'app-postulations',
  templateUrl: './postulations.component.html',
  styleUrls: ['./postulations.component.css']
})
export class PostulationsSpComponent implements OnInit {

  postulations: postulation[] = [];
  filteredPostulations: postulation[] = [];  // Store filtered postulations
  subjectTitle: string = '';  // Variable to hold the subject title
  idsujet: number | undefined;
  filterStatus: string = 'all';  // Default filter to 'all'

  constructor(
    private postulationService: PostulationService,
    private subjectService: IntershipOfferService, // Inject SubjectService to get the subject title
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Retrieve the 'idsujet' from the route parameter
    this.idsujet = Number(this.route.snapshot.paramMap.get('idsujet'));
    this.loadSubjectTitle();
    this.loadPostulations();
  }

  // Fetch the subject title based on idsujet
  loadSubjectTitle(): void {
    if (this.idsujet !== undefined) {
      this.subjectService.getOfferById(this.idsujet).subscribe(
        (data) => {
          this.subjectTitle = data.title;  // Assuming the API returns a 'title' field
        },
        (error) => {
          console.error('Error fetching subject title:', error);
        }
      );
    }
  }

  // Load postulations based on idsujet
  loadPostulations(): void {
    if (this.idsujet !== undefined) {
      this.postulationService.getPostulationsByIdsujet(this.idsujet).subscribe(
        (data) => {
          this.postulations = data;
          this.filteredPostulations = data;  // Initially, all postulations are shown
        },
        (error) => {
          console.error('Error fetching postulations:', error);
        }
      );
    } else {
      console.error('Idsujet is undefined');
    }
  }

  // Apply filter to postulations based on selected status
  applyFilter(): void {
    if (this.filterStatus === 'all') {
      this.filteredPostulations = this.postulations;
    } else {
      this.filteredPostulations = this.postulations.filter(
        postulation => postulation.status.toString() === this.filterStatus
      );
    }
  }

  // Get status label based on the status number
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

  // Accept postulation
  acceptPostulation(postulationId: number): void {
    this.postulationService.acceptPostulation(postulationId).subscribe(
      () => {
        console.log('Postulation accepted:', postulationId);
        this.loadPostulations();  // Refresh the postulations after accepting
      },
      (error) => {
        console.error('Error accepting postulation:', error);
      }
    );
  }

  // Reject postulation
  rejectPostulation(postulationId: number): void {
    this.postulationService.rejectPostulation(postulationId).subscribe(
      () => {
        console.log('Postulation rejected:', postulationId);
        this.loadPostulations();  // Refresh the postulations after rejecting
      },
      (error) => {
        console.error('Error rejecting postulation:', error);
      }
    );
  }
}
