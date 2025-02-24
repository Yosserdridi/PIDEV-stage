import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-admin',
  templateUrl: './student-admin.component.html',
  styleUrls: ['./student-admin.component.css']
})
export class StudentAdminComponent {

  studentId: number | undefined;
  student!: Student ;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService  // Inject the service
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentId = +id;  // Convert the id to a number
      this.getStudentDetails(this.studentId);  // Fetch student details on init
    }
  }

  getStudentDetails(id: number): void {
    this.studentService.getStudentById(id).subscribe(
      (student) => {
        this.student = student;
        console.log('Student details:', this.student);
      },
      (error) => {
        console.error('Error fetching student details', error);
      }
    );

}

goBack(): void {
  this.router.navigate(['/pfeadmin']);  // Navigate to the /pfeadmin route
}
}
