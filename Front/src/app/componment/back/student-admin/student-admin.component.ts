import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-admin',
  templateUrl: './student-admin.component.html',
  styleUrls: ['./student-admin.component.css']
})
export class StudentAdminComponent {

  studentId: number | undefined;
  student!: Student ;
  message: string = '';

  teachers: Teacher[] = []; 
  selectedTeacherId: number | null = null;

  isPfeOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService  // Inject the service
  ) {}

  ngOnInit(): void {
    this.fetchTeachers();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentId = +id;  // Convert the id to a number
      this.getStudentDetails(this.studentId);  // Fetch student details on init
    }
    
  }



  getStudentDetails(s: number ): void {
    this.studentService.getStudentById1(s).subscribe(
      (student) => {
        this.student = student;
        console.log('Student details:', this.student);
      },
      (error) => {
        console.error('Error fetching student details', error);
      }
    );

}

assignRestitutionToTeacher(teacherId: number, restitutionId: number): void {
  const teacherIdNum = Number(teacherId);
  const restitutionIdNum = Number(restitutionId);

  // Ensure the values are valid numbers before making the request
  if (isNaN(teacherIdNum) || isNaN(restitutionIdNum)) {
    this.message = 'Please enter valid numeric IDs.';
    alert(this.message);  // Alert message for invalid input
    return;
  }

  this.studentService.assignRestitution(teacherIdNum, restitutionIdNum).subscribe({
    next: (response) => {
      this.message = response;
      alert('Restitution assigned successfully!');  // Alert message on success
    },
    error: (error) => {
      this.message = 'Error: ' + (error.error || 'Failed to assign restitution.');
      alert('Restitution assigned successfully!');  // Alert message on error
    }
  });
}

fetchTeachers() {
  this.studentService.getAllTeachers().subscribe({
    next: (data) => {
      console.log('Teachers fetched:', data);
      this.teachers = data;
    },
    error: (err) => {
      console.error('Error fetching teachers', err);
    }
  });
}



goBack(): void {
  this.router.navigate(['/pfeadmin']);  // Navigate to the /pfeadmin route
}
}
