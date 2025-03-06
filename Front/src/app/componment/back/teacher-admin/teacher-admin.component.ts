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

  displayedTeachers: Teacher[] = [];  // Teachers to display on the current page
  filteredTeachers: Teacher[] = [];  // Filtered teachers after applying search

  searchTerm: string = '';  // Term used for search filter
  currentPage: number = 1;  // Current page for pagination
  pageSize: number = 6;  // Number of teachers per page
  totalPages: number = 1; 

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
        this.filteredTeachers = [...data];  // Initialize with all teachers
        this.totalPages = Math.ceil(this.filteredTeachers.length / this.pageSize);
        this.updateDisplayedTeachers();
      },
      error: (err) => {
        console.error('Error fetching teachers', err);
      }
    });
  }
  

  showTeacherDetails(teacherId: number): void {
    this.router.navigate(['/teacher', teacherId]);  // Navigate to the details page, passing the student ID
  }


  filterTeachers(): void {
    if (this.searchTerm) {
      this.filteredTeachers = this.teachers.filter(teacher =>
        teacher.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        teacher.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredTeachers = [...this.teachers];  // Reset if search is empty
    }
    this.currentPage = 1;  // Reset to first page
    this.totalPages = Math.ceil(this.filteredTeachers.length / this.pageSize);
    this.updateDisplayedTeachers();  // Update the displayed teachers
  }

  // Update displayed teachers for the current page
  updateDisplayedTeachers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedTeachers = this.filteredTeachers.slice(startIndex, endIndex);
  }

  // Go to previous page
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedTeachers();
    }
  }

  // Go to next page
  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedTeachers();
    }
  }




}
