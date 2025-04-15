import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostulationService } from 'src/app/Services/postulation/postulation.service';
import { IntershipOfferService } from 'src/app/Services/IntershipOffer/intership-offer-services.service';
import { postulation } from 'src/app/models/postulation';
import { intershipoffer } from 'src/app/models/intershipoffer';
import { TypeInternship } from 'src/app/models/intershipoffer'; // Import the enum
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddPComponent implements OnInit {

  newPostulation: postulation = new postulation();
  errorMessage: string = '';
  successMessage: string = '';
  selectedFile: File | null = null;
  isLoading: boolean = false;
  isUploading: boolean = false;

   regions: string[] = [
    "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte", "Béja",
    "Jendouba", "Kef", "Siliana", "Sousse", "Monastir", "Mahdia", "Kairouan", "Kasserine",
    "Sidi Bouzid", "Sfax", "Gabès", "Medenine", "Tataouine", "Gafsa", "Tozeur", "Kebili"
  ];  
  subjectTitle: string = '';   

  constructor(
    private postulationService: PostulationService,
    private subjectService: IntershipOfferService,   
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

 
  private uploadPdf(postulationId: number): void {
    if (!this.selectedFile) return;

    this.isUploading = true;
    this.postulationService.updatePdf(postulationId, this.selectedFile, true).subscribe({
      next: (filename) => {
        console.log('PDF uploaded successfully:', filename);
        this.successMessage = 'Application and PDF submitted successfully!';
        this.navigateAfterDelay();
      },
      error: (error: HttpErrorResponse) => {
        console.error('PDF upload failed:', error);
        this.errorMessage = 'Application submitted but PDF upload failed. ' + 
                          (error.error?.message || 'Please try uploading again later.');
      },
      complete: () => {
        this.isLoading = false;
        this.isUploading = false;
      }
    });
  }

  private navigateAfterDelay(): void {
    setTimeout(() => {
      this.router.navigate(['/postulations']);
    }, 2000); // 2 seconds delay to show success message
  }


}
