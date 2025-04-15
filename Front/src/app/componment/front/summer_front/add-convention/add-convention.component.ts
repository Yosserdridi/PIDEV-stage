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
    this.conventionService.addInternshipConvention(this.conventionForm.value).subscribe({
      next: (response) => {
        // ✅ Si tu veux utiliser l'ID plus tard :
        // this.conventionId = response.id;
    
        this.router.navigate(['/valide_convention']);
      },
      error: (error) => {
        if (error.status === 409) {
          console.error("Une convention validée pour ce type existe déjà.");
          alert("Une convention validée pour ce type existe déjà.");
        } else {
          console.error("Erreur lors de la création de la convention :", error);
          alert("Erreur inattendue lors de la création de la convention.");
        }
      }
    });
    
  }


  goToAddTaskPage() {
    this.router.navigate(['/add-internship', this.conventionId]);  // Navigate to Add Tasks page with journalId
  }









}
