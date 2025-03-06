import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Teacher } from 'src/app/models/teacher.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-teacher-admin',
  templateUrl: './teacher-admin.component.html',
  styleUrls: ['./teacher-admin.component.css']
})
export class TeacherAdminComponent {
  isPfeOpen = false;

  teachers: Teacher[] = []; 

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private studentService: StudentService  // Inject the service
    ) {}

  ngOnInit(): void {
    this.fetchTeachers();
    
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
  

  showTeacherDetails(teacherId: number): void {
    this.router.navigate(['/teacher', teacherId]);  // Navigate to the details page, passing the student ID
  }




}
