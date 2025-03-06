import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InternshipPFE } from 'src/app/models/internship-pfe.model';
import { Teacher } from 'src/app/models/teacher.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-get-teacher-admin',
  templateUrl: './get-teacher-admin.component.html',
  styleUrls: ['./get-teacher-admin.component.css']
})
export class GetTeacherAdminComponent {
    teacherId: number | undefined;
    teacher!: Teacher ;
    internships: InternshipPFE[] = [];
    selectedInternshipId: number | null = null;
    selectedTeacherId: number | null = null;

  isPfeOpen = false;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private studentService: StudentService  // Inject the service
    ) {}


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.teacherId = +id;  // Convert the id to a number
      this.getTeacherDetails(this.teacherId);  // Fetch student details on init
    }
    this.loadUnassignedInternships();
  }

  getTeacherDetails(teacherId: number): void {
    this.studentService.getTeacherById(teacherId).subscribe(
      (teacher) => {
        this.teacher = teacher;  // Populate the teacher details
        console.log('Teacher details:', this.teacher);
      },
      (error) => {
        console.error('Error fetching teacher details', error);
      }
    );
  }


  loadUnassignedInternships(): void {
    this.studentService.getUnassignedInternships().subscribe((data) => {
      this.internships = data;
    });
  }


  assignInternshipToTeacher(): void {
    if (this.selectedInternshipId && this.teacher.id) {
      this.studentService.assignInternshipToTeacher(this.teacher.id, this.selectedInternshipId)
        .subscribe(
          (response) => {
            console.log('Internship assigned successfully:', response);
            alert('Internship assigned successfully!');
            this.getTeacherDetails(this.teacher.id);  // Refresh teacher data after assignment
          },
          (error) => {
            console.error('Error assigning internship:', error);
            alert('Internship assigned successfully');
            window.location.reload();
          }
        );
    } else {
      alert('Please select both a teacher and an internship.');
    }
  }


}
