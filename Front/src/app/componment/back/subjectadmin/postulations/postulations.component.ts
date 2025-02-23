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
  subjectTitle: string = ''; // Variable to hold the subject title
  idsujet: number | undefined;

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
        },
        (error) => {
          console.error('Error fetching postulations:', error);
        }
      );
    } else {
      console.error('Idsujet is undefined');
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
    console.log('Accepting postulation with ID:', postulationId);
    // Logic for accepting postulation goes here
  }

  // Reject postulation
  rejectPostulation(postulationId: number): void {
    console.log('Rejecting postulation with ID:', postulationId);
    // Logic for rejecting postulation goes here
  }
}
