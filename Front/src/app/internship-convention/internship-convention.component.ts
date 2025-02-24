import { Component } from '@angular/core';
import { InternshipConvention, InternshipConventionService } from '../services/internship-convention.service';
import { TypeInternship } from '../models/type_internship.eunm';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-internship-convention',
  templateUrl: './internship-convention.component.html',
  styleUrls: ['./internship-convention.component.css']
})
export class InternshipConventionComponent {

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

    student!: Student;
  
    constructor(private internshipService: InternshipConventionService,
                        private studentService: StudentService
    ) {}
  
    addInternship(): void {
      this.internshipService.addInternship(this.internship).subscribe(
        (response) => {
          console.log('Internship added successfully!', response);
          alert('Internship added successfully!');
          window.location.reload();
        },
        (error) => {
          console.error('Error adding internship', error);
          alert('Error adding internship. Please try again later.');
        }
      );
    }

    ngOnInit(): void {
      this.getStudent(1); // Fetch student with ID 1
    }
  
    getStudent(id: number): void {
      this.studentService.getStudentById(id).subscribe(
        (data) => {
          this.student = data;
          console.log(this.student);
        },
        (error) => {
          console.error('Error fetching student data:', error);
        }
      );
    }
  
    

}
