import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostulationService } from 'src/app/Services/postulation/postulation.service';
import { IntershipOfferService } from 'src/app/Services/IntershipOffer/intership-offer-services.service';
import { postulation } from 'src/app/models/postulation';
import { intershipoffer } from 'src/app/models/intershipoffer';
import { TypeInternship } from 'src/app/models/intershipoffer'; // Import the enum

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddPComponent implements OnInit {

  newPostulation: postulation = new postulation();
  errorMessage: string = '';
  selectedFile: File | null = null;
  regions: string[] = [
    "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte", "Béja",
    "Jendouba", "Kef", "Siliana", "Sousse", "Monastir", "Mahdia", "Kairouan", "Kasserine",
    "Sidi Bouzid", "Sfax", "Gabès", "Medenine", "Tataouine", "Gafsa", "Tozeur", "Kebili"
  ];  
  subjectTitle: string = '';  // Store the subject title

  constructor(
    private postulationService: PostulationService,
    private subjectService: IntershipOfferService,  // Inject subject service
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idsujet = Number(params.get('idsujet'));
      if (!isNaN(idsujet)) {
        this.newPostulation.idsujet = idsujet;
        this.loadSubjectTitle(idsujet);  // Fetch the subject title
      }
    });

    // Set system date for PostulationDate
    this.newPostulation.postulationDate = new Date();
  }

  loadSubjectTitle(idsujet: number): void {
    this.subjectService.getOfferById(idsujet).subscribe({
      next: (subjectData: intershipoffer) => {
        this.subjectTitle = subjectData.title;   
      },
      error: (error) => {
        console.error('Error fetching subject:', error);
      }
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.newPostulation.titrecandidature && this.newPostulation.lettremotivation && this.newPostulation.region) {
      this.postulationService.addPostulation(this.newPostulation, this.newPostulation.idsujet).subscribe({
        next: (createdPostulation) => {
          console.log('Postulation created successfully');
          if (this.selectedFile) {
            this.uploadPdf(createdPostulation.id);
          } else {
            this.router.navigate(['/postulations']);
          }
        },
        error: (error) => {
          console.error('Error creating postulation:', error);
          this.errorMessage = 'Error submitting postulation. Please try again.';
        }
      });
    } else {
      this.errorMessage = "Form is not valid. Please check all fields.";
    }
  }

  uploadPdf(postulationId: number): void {
    if (this.selectedFile) {
      this.postulationService.uploadPdf(postulationId, this.selectedFile).subscribe({
        next: () => {
          console.log('PDF uploaded successfully');
          this.router.navigate(['/postulations']);
        },
        error: (error) => {
          console.error('Error uploading PDF:', error);
          this.errorMessage = 'Error uploading PDF. Please try again.';
        }
      });
    }
  }
}
