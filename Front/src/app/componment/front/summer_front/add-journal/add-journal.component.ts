import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Convention, TypeInternship } from 'src/model/convention';
import { FileModel } from 'src/model/file-model';
import { Summer } from 'src/model/summer';
import { JournalService } from 'src/services/service_journal/journal.service';

@Component({
  selector: 'app-add-journal',
  templateUrl: './add-journal.component.html',
  styleUrls: ['./add-journal.component.css']
})
export class AddJournalComponent implements OnInit {

  journalId !:number
  journalForm !: FormGroup;
  fileId!:number;
  summerId !: number;
  formSubmitted: boolean = false;


  internship: Summer = { id: 0,title: '', description: '',   duration: 0  };

  convention: Convention = {
    id: 0,
    companyName: '',
    companyAddress: '',
    companyContact: '',
    startDate: new Date(),  // Initialisation avec la date actuelle
    endDate: new Date(),    // Initialisation avec la date actuelle
    typeInternship: TypeInternship.INTERNSHIP_D_IMMERSION_EN_ENTREPRISE,
    isValid: false
  };
  file: FileModel ={ id: 0, report: '', internship_Certifcate: '', };

  
    constructor(
      private fb :FormBuilder,
      private journalService: JournalService,
      private router :Router,
      private route:ActivatedRoute,
    
    )
  
    {
          this.journalForm= this.fb.group({
            title: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\sàéèùêôïç]+$/)]],
     
         
          })
  
    }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.fileId = +params['id']; 

      this.getInternshipDetails(this.fileId);
    });
  }
  getInternshipDetails(fileId: number) {
    this.journalService.getInternshipWithrelation(fileId).subscribe(
      (data) => {
        console.log('Données reçues :', data);  // Ajoutez ce log pour vérifier les données
        this.internship = data.summerInternship;
        this.convention = data.internshipConvention;
        this.file = data.file;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du stage', error);
      }
    );
  }




  
    addJournal() {
      this.journalService.addJournal(this.fileId,this.journalForm.value).subscribe(
        (response) => {
          this.journalId = response.id;  // Assuming 'id' is the returned journalId
          console.log("Journal created with ID:", this.journalId);
          this.formSubmitted = true;
        },
        (error) => {
          console.error("Error adding summer", error);
        }
      );
    }

    goToAddTaskPage() {
      this.router.navigate(['/add-tasks', this.journalId]);  // Navigate to Add Tasks page with journalId
    }

    goToAddFiles(){
      this.router.navigate(['/add_files', this.journalId]);

    }
  

}
