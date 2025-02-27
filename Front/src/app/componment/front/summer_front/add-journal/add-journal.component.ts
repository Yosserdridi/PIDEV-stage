import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Summer } from 'src/model/summer';
import { JournalService } from 'src/services/service_journal/journal.service';

@Component({
  selector: 'app-add-journal',
  templateUrl: './add-journal.component.html',
  styleUrls: ['./add-journal.component.css']
})
export class AddJournalComponent {

  journalId !:number
  journalForm !: FormGroup;


  
    constructor(
      private fb :FormBuilder,
      private journalService: JournalService,
      private router :Router
    
    )
  
    {
          this.journalForm= this.fb.group({
            title: ['',Validators.required,],
     
         
          })
  
    }
  
    addJournal() {
      this.journalService.addJournal(this.journalForm.value).subscribe(
        (response) => {
          this.journalId = response.id;  // Assuming 'id' is the returned journalId
          console.log("Journal created with ID:", this.journalId);
        },
        (error) => {
          console.error("Error adding summer", error);
        }
      );
    }

    goToAddTaskPage() {
      this.router.navigate(['/add-tasks', this.journalId]);  // Navigate to Add Tasks page with journalId
    }
  

}
