import { Component } from '@angular/core';
import { InternshipConventionService, InternshipConvention } from '../../../services/internship-convention.service';
import { TypeInternship } from 'src/app/models/type_internship.eunm';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PfeInternshipService } from 'src/app/services/pfe-internship.service';
import { Restitution } from 'src/app/models/restitution.model';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-pfe-interships',
  templateUrl: './pfe-interships.component.html',
  styleUrls: ['./pfe-interships.component.css']
})
export class PfeIntershipsComponent {

  student!: Student;

  pipelineSteps = [
    { label: 'Lancement Stage PFE', icon: '📝', active: false },
    { label: 'Demande Convention', icon: '📄', active: false },
    { label: 'Dépot de Stage', icon: '📂', active: false },
    { label: 'Lancement Restitution', icon: '🎤', active: false },
    { label: 'Dépot Rapport Final', icon: '📑', active: false }
  ];
  

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(): void {
    this.studentService.getStudentById().subscribe(
      (data) => {
        this.student = data;
        console.log(this.student);
        this.updatePipelineSteps();
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
  }

  updatePipelineSteps() {
    if (!this.student) return;
  
    // Step 1: Lancement Stage PFE (Always Active)
    this.pipelineSteps[0].active = true;
  
    // Step 2: Demande Convention (Active if the student has internship conventions)
    if (this.student.internshipConventions && this.student.internshipConventions.length > 0) {
      this.pipelineSteps[1].active = true;
    }
  
    // Step 3: Dépot de Stage (Active if at least one internship has a signed convention)
    const hasSignedConvention = this.student.internshipConventions?.some(
      internship => internship.internshipPFE?.signedConvention
    );
    if (hasSignedConvention) {
      this.pipelineSteps[2].active = true;
    }
  
    // Step 4: Lancement Restitution (Active if restitution exists)
    const hasRestitution = this.student.internshipConventions?.some(
      internship => internship.internshipPFE?.restitution
    );
    if (hasRestitution) {
      this.pipelineSteps[3].active = true;
    }
  

  }



  generatePDF() {
    const doc = new jsPDF();

    // Set font
    doc.setFont("helvetica", "bold");

    // Title: Student Name and Email
    doc.setFontSize(18);
    doc.text(`Student: ${this.student?.firstName} ${this.student?.lastName}`, 10, 15);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Email: ${this.student?.email}`, 10, 25);

    // Internship Conventions
    const internships = this.student?.internshipConventions || [];
    let yOffset = 40; // Initial Y position for internship details

    if (internships.length > 0) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text('Internship Conventions:', 10, yOffset);
        yOffset += 10; // Move down
        doc.setFont("helvetica", "normal");

        internships.forEach((internship: any, index: number) => {
            if (yOffset > 270) { // Check if we need a new page
                doc.addPage();
                yOffset = 20;
            }

            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            yOffset += 6;

            doc.setFont("helvetica", "normal");

            // Create a structured description
            const internshipDescription = `
                The student ${this.student?.firstName} ${this.student?.lastName} participated in an internship at 
                ${internship.companyName}, where the internship type was ${internship.typeInternship}. 
                This internship started on ${formatDate(internship.startDate, 'yyyy-MM-dd', 'en-US')} 
                and ended on ${formatDate(internship.endDate, 'yyyy-MM-dd', 'en-US')}.
            `;

            const wrappedText = doc.splitTextToSize(internshipDescription.trim(), 180);
            doc.text(wrappedText, 10, yOffset);
            yOffset += wrappedText.length * 6 + 5; // Adjust spacing
        });
    }

    // Footer with page numbers
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(`Page ${i} of ${pageCount}`, 10, doc.internal.pageSize.height - 10);
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

  

  

