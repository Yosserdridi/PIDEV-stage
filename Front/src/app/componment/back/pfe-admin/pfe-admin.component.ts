import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { InternshipConvention, InternshipConventionService } from 'src/app/services/internship-convention.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-pfe-admin',
  templateUrl: './pfe-admin.component.html',
  styleUrls: ['./pfe-admin.component.css']
})
export class PfeAdminComponent {

  students: Student[] = [];

  filteredStudents: Student[] = [];
  displayedStudents: Student[] = [];
  searchTerm: string = '';


  notifications: any[] = [];
  showNotifications: boolean = false;

  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 1;

  isPfeOpen = false;

  pipelineSteps = [
    { label: '', icon: 'fa-graduation-cap', active: false, completed: false },
    { label: '', icon: 'fa-file-alt', active: false, completed: false },
    { label: '', icon: 'fa-upload', active: false, completed: false },
    { label: '', icon: 'fa-microphone', active: false, completed: false },
    { label: '', icon: 'fa-file-signature', active: false, completed: false }
  ];
  
  getStudentProgressWidth(student: any): string {
    const activeSteps = this.getActiveSteps(student).length;
    return `${(activeSteps / this.pipelineSteps.length) * 100}%`;
  }
  
  getActiveSteps(student: Student): any[] {
    const activeSteps = [];
  
    // Step 1: Internship PFE (Always Active and Completed)
    this.pipelineSteps[0].active = true;
    this.pipelineSteps[0].completed = true; // Assuming this step is always completed
    activeSteps.push(this.pipelineSteps[0]);
  
    // Step 2: Convention Request (Active if the student has internship conventions)
    if (student.internshipConventions && student.internshipConventions.length > 0) {
      this.pipelineSteps[1].active = true;
      this.pipelineSteps[1].completed = true; // Convention is requested
      activeSteps.push(this.pipelineSteps[1]);
    } else {
      this.pipelineSteps[1].completed = false;
      this.pipelineSteps[1].active = false;
    }
  
    // Step 3: Internship Submission (Active and Completed if at least one internship has a signed convention)
    const hasSignedConvention = student.internshipConventions?.some(
      internship => internship.internshipPFE?.signedConvention
    );
    if (hasSignedConvention) {
      this.pipelineSteps[2].active = true;
      this.pipelineSteps[2].completed = true; // Convention is signed
      activeSteps.push(this.pipelineSteps[2]);
    } else {
      this.pipelineSteps[2].completed = false;
      this.pipelineSteps[2].active = false;
    }
  
    // Step 4: Restitution Launch (Active and Completed if restitution exists)
    const hasRestitution = student.internshipConventions?.some(
      internship => internship.internshipPFE?.restitution
    );
    if (hasRestitution) {
      this.pipelineSteps[3].active = true;
      this.pipelineSteps[3].completed = true; // Restitution has been launched
      activeSteps.push(this.pipelineSteps[3]);
    } else {
      this.pipelineSteps[3].completed = false;
      this.pipelineSteps[3].active = false;
    }
  
    // Step 5: Final Report Submission (Active and Completed based on specific conditions)
    // Uncomment the code below and adjust it as needed
    // const hasFinalReport = student.finalReport;
    // if (hasFinalReport) {
    //   this.pipelineSteps[4].active = true;
    //   this.pipelineSteps[4].completed = true; // Report is submitted
    //   activeSteps.push(this.pipelineSteps[4]);
    // } else {
    //   this.pipelineSteps[4].completed = false;
    // }
  
    return activeSteps;
  }
  
  
  constructor(private conventionService: InternshipConventionService,
    private studentService: StudentService,
    private notificationService : NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.getAllStudents(); 
    this.loadNotifications();
    setInterval(() => this.loadNotifications(), 10000);

  }

  updateDisplayedStudents(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedStudents = this.filteredStudents.slice(startIndex, endIndex);
  }


  getAllStudents(): void {
    this.studentService.getAllStudents().subscribe(
      (data: Student[]) => {
        this.students = data;  // Store the fetched students in the students array
        this.filteredStudents = [...data]; // Ensure a new reference
        this.currentPage = 1;
        this.totalPages = Math.ceil(this.filteredStudents.length / this.pageSize);
        this.updateDisplayedStudents();
      },
      (error: any) => {
        console.error('Error fetching students:', error);
      }
    );
  }


  filterStudents(): void {
    if (this.searchTerm) {
      this.filteredStudents = this.students.filter(student =>
        student.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredStudents = this.students;  // If search is empty, show all students
    }
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredStudents.length / this.pageSize);
    this.updateDisplayedStudents();
  }

  showStudentDetails(studentId: number): void {
    this.router.navigate(['/student', studentId]);  // Navigate to the details page, passing the student ID
  }



  

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedStudents();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedStudents();
    }
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe(data => {
      this.notifications = data;
    });
  }
  
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
  
  clearAll() {
    this.notificationService.clearNotifications().subscribe(() => {
      this.notifications = [];
      this.showNotifications = false;
    });


  
}
}