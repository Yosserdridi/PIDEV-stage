import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { InternshipConvention, InternshipConventionService } from 'src/app/services/internship-convention.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-pfe-admin',
  templateUrl: './pfe-admin.component.html',
  styleUrls: ['./pfe-admin.component.css']
})
export class PfeAdminComponent {

  students: Student[] = [];

  constructor(private conventionService: InternshipConventionService,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.getAllStudents(); 

  }

  getAllStudents(): void {
    this.studentService.getAllStudents().subscribe(
      (data: Student[]) => {
        this.students = data;  // Store the fetched students in the students array
      },
      (error: any) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  showStudentDetails(studentId: number): void {
    this.router.navigate(['/student', studentId]);  // Navigate to the details page, passing the student ID
  }
}
