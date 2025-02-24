import { Component } from '@angular/core';
import { InternshipConventionService, InternshipConvention } from '../../../services/internship-convention.service';
import { TypeInternship } from 'src/app/models/type_internship.eunm';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PfeInternshipService } from 'src/app/services/pfe-internship.service';
import { Restitution } from 'src/app/models/restitution.model';
@Component({
  selector: 'app-pfe-interships',
  templateUrl: './pfe-interships.component.html',
  styleUrls: ['./pfe-interships.component.css']
})
export class PfeIntershipsComponent {
  student!: Student;


  

  constructor(private studentService: StudentService) {}

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

  generatePDF() {
    const doc = new jsPDF();

    // Title: Student Name and Email
    doc.setFontSize(18);
    doc.text(`Student: ${this.student?.firstName} ${this.student?.lastName}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Email: ${this.student?.email}`, 10, 20);

    // Internship Conventions
    const internships = this.student?.internshipConventions || [];
    if (internships.length > 0) {
      doc.setFontSize(14);
      doc.text('Internship Conventions:', 10, 30);

      internships.forEach((internship: any, index: number) => {
        const yOffset = 40 + (index * 50); // Adjust position for each internship convention
        doc.setFontSize(12);
        
        // Create a formal descriptive paragraph for each internship
        const internshipDescription = `
          The student **${this.student?.firstName} ${this.student?.lastName}** participated in an internship at **${internship.companyName}**, 
          where the internship type was **${internship.typeInternship}**. 
          This internship commenced on **${internship.startDate}** and concluded on **${internship.endDate}**. 
          Throughout the internship, the student worked on key projects involving [brief description]. 
          The unique **Internship ID** for this engagement is **${internship.id}**.
        `;
        
        doc.text(internshipDescription, 10, yOffset);
      });
    }

    // Save the PDF
    doc.save('student_details.pdf');
  }
  selectedInternshipId: number | null = null;

  restitution: Restitution = { subject: '', task: '', technology: '' }; 

  toggleForm(internshipId: number | null): void {
    if (internshipId !== null) {
      // Show form for the selected internship
      this.selectedInternshipId = internshipId;
      // Ensure restitution is initialized when showing the form
      this.restitution = { subject: '', task: '', technology: '' };
    } else {
      // Hide form when canceling
      this.selectedInternshipId = null;
      this.restitution = { subject: '', task: '', technology: '' }; // Reset form values
    }
  }


  addRestitution(internshipId: number) {
    if (!this.restitution) {
      console.error("Restitution object is undefined!");
      this.restitution = { subject: '', task: '', technology: '' }; // ✅ Ensure it's initialized
    }

    const restitutionPayload = {
      subject: this.restitution.subject,
      task: this.restitution.task,
      technology: this.restitution.technology
    };

    console.log("Sending Restitution:", restitutionPayload); // Debugging

    this.studentService.addRestitution(internshipId, restitutionPayload).subscribe(
      (response) => {
        console.log('Restitution added successfully:', response);
        alert('Internship added successfully!');
        window.location.reload();
      },
      (error) => {
        console.error('Error adding restitution:', error);
      }
    );
  }
  

}
