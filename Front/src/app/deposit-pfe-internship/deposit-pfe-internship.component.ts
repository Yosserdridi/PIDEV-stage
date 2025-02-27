import { Component } from '@angular/core';
import { PfeInternshipService } from '../services/pfe-internship.service';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';
import { InternshipConvention } from '../services/internship-convention.service';
import { TypeInternship } from '../models/type_internship.eunm';

@Component({
  selector: 'app-deposit-pfe-internship',
  templateUrl: './deposit-pfe-internship.component.html',
  styleUrls: ['./deposit-pfe-internship.component.css']
})
export class DepositPfeInternshipComponent {

  student!: Student;

  newInternshipPFE = {
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date()
  };

  file?: File ;

      typeInternshipEnum = Object.values(TypeInternship); // Getting enum values
      internship: InternshipConvention = {
        companyName: '',
        startDate: new Date(),  // Initialize as Date object
        endDate: new Date(),    // Initialize as Date object
        companyAddress: '',
        companyContact: '',
        typeInternship: TypeInternship.INTERNSHIP_PFE,
        studentFirstName : '' // Default to an enum value
      };

  internshipConventionId?: number;
  hasPFEInternship: boolean = false;



  constructor(private internshipService: PfeInternshipService, 
                      private studentService: StudentService
  ) {}

  ngOnInit() {
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
        this.file = input.files[0];  // Save the selected file
    }
}



  addInternshipPFE(): void {
    if (!this.newInternshipPFE) {
      console.error('No InternshipPFE data provided');
      alert('Please fill in the InternshipPFE details before submitting.');
      return;
    }
  
    this.internshipService.addInternshipPFE(this.newInternshipPFE, this.file).subscribe({
      next: (response) => {
        console.log('InternshipPFE added successfully:', response);
        alert('InternshipPFE added successfully!');
        // Optionally reset the form or navigate to another page
      },
      error: (err) => {
        console.error('Error adding InternshipPFE:', err);
        alert(`Error adding InternshipPFE: ${err.error?.message || 'Please try again later.'}`);
      }
    });
  }
  


  getStudent(): void {
    this.studentService.getStudentById().subscribe(
      (data) => {
        this.student = data;
        console.log(this.student);
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
  }

  selectedFile?: File;


  
  

}
