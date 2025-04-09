import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeInternship } from 'src/model/convention';
import { ConventionService } from 'src/services/convention.service';
import { dateGreaterThan } from './data.validators';


@Component({
  selector: 'app-add-convention',
  templateUrl: './add-convention.component.html',
  styleUrls: ['./add-convention.component.css']
})
export class AddConventionComponent {

  conventionId !:number;
  conventionForm!:FormGroup;
  TypeInternship = TypeInternship;
  

  constructor(
    private fb :FormBuilder,
    private conventionService:ConventionService,
    private router :Router
  ){

    this.conventionForm = this.fb.group({
      companyName: ['', [Validators.required]],
      companyAddress:['', [Validators.required]],
      companyContact: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required, dateGreaterThan('startDate')]],
      typeInternship: ['', Validators.required] 


    })

  }


  addConvention():void {
    this.conventionService.addInternshipConvention(this.conventionForm.value).subscribe(
      (response) => {
       // this.conventionId = response.id;  // Assuming 'id' is the returned journalId

        this.router.navigate(['/valide_convention']); 
      },
      (error) => {
        console.error("Error creating journal", error);
      }
    );
  }


  goToAddTaskPage() {
    this.router.navigate(['/add-internship', this.conventionId]);  // Navigate to Add Tasks page with journalId
  }









}
