import { Component } from '@angular/core';
import { PfeInternshipService } from '../services/pfe-internship.service';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';

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

  internshipConventionId?: number;
  hasPFEInternship: boolean = false;
  studentId: number = 1 ;


  constructor(private internshipService: PfeInternshipService, 
                      private studentService: StudentService
  ) {}

  ngOnInit() {
    this.fetchInternshipConventionId();
    this.getStudent(3);
  }

  checkPFEInternship(): void {
    this.studentService.getInternshipByStudentAndType(this.studentId)
      .subscribe(
        (internship) => {
          this.hasPFEInternship = !!internship;  // If internship exists, disable form
        },
        (error) => {
          this.hasPFEInternship = false; // If no internship found, allow form submission
        }
      );
  }

  fetchInternshipConventionId() {
    this.internshipService.getInternshipConventionId().subscribe({
      next: (id) => {
        this.internshipConventionId = id;
        console.log('InternshipConvention ID:', this.internshipConventionId);
      },
      error: (err) => {
        console.error('Error fetching InternshipConvention ID', err);
      }
    });
  }

  addInternshipPFE(): void {
    if (!this.newInternshipPFE) {
      console.error('No InternshipPFE data provided');
      alert('Please fill in the InternshipPFE details before submitting.');
      return;
    }
  
    this.internshipService.addInternshipPFE(this.newInternshipPFE).subscribe({
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
