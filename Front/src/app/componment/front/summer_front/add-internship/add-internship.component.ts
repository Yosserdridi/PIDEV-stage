import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Summer } from 'src/model/summer';
import { SummerService } from 'src/services/service_summer/summer.service';

@Component({
  selector: 'app-add-internship',
  templateUrl: './add-internship.component.html',
  styleUrls: ['./add-internship.component.css']
})
export class AddInternshipComponent implements OnInit {

  internshipForm !: FormGroup;
  conventionId !:number;

  durationOptions: number[] = Array.from({ length: 12 }, (_, i) => i + 1); // Generates an array [1, 2, ..., 12]





  constructor(
    private fb : FormBuilder,
    private summerSevice: SummerService,
    private route:ActivatedRoute,
    private r:Router
     
  
  )

  {
        this.internshipForm= this.fb.group({
          title: ['',Validators.required,],
          description: ['',Validators.required,],
          duration: ['', Validators.required, ],
      
       
        })

  }
  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.conventionId = +params['id'];  // Get the journalId from the route parameters
    });
   
  }

  addInternship(): void {
    this.summerSevice.addconevntionToSummer(this.conventionId, this.internshipForm.value).subscribe(
      (response) => {
        console.log('Response from backend:', response);  // Vérifie la réponse complète
        if (response && response.id) {
          this.r.navigate(['/add_files', response.id]);  // Assure-toi que response.id est bien là
        } else {
          console.error('ID is missing in the response');
          alert('ID is missing in the response. Please try again!');
        }
      },
      (error) => {
        console.error("Error creating internship", error);
        alert("Error adding internship. Please try again!"); // Afficher un message d'erreur
      }
    );
  }
  
  

  

  

}
