import { Component, ElementRef, ViewChild } from '@angular/core';
import { PfeInternshipService } from '../services/pfe-internship.service';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';
import { InternshipConvention } from '../services/internship-convention.service';
import { TypeInternship } from '../models/type_internship.eunm';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-deposit-pfe-internship',
  templateUrl: './deposit-pfe-internship.component.html',
  styleUrls: ['./deposit-pfe-internship.component.css']
})
export class DepositPfeInternshipComponent {

  @ViewChild('signaturePadCanvas') signaturePadElement!: ElementRef<HTMLCanvasElement>;
private signaturePad!: SignaturePad;
  student!: Student;

  newInternshipPFE = {
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date()
  };

  file?: File ;

      typeInternshipEnum = Object.values(TypeInternship); // Getting enum values
      internship: InternshipConvention = {
        companyName: '',
        startDate: new Date(),  // Initialize as Date object
        endDate: new Date(),    // Initialize as Date object
        companyAddress: '',
        companyContact: '',
        typeInternship: TypeInternship.INTERNSHIP_PFE,
        studentFirstName : '' // Default to an enum value
      };

  internshipConventionId?: number;
  hasPFEInternship: boolean = false;



  constructor(private internshipService: PfeInternshipService, 
                      private studentService: StudentService
  ) {}

  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
        this.file = input.files[0];  // Save the selected file
    }
}


addInternshipPFE(): void {
  if (!this.newInternshipPFE) {
    console.error('No InternshipPFE data provided');
    alert('Please fill in the InternshipPFE details before submitting.');
    return;
  }

  // 🖊️ Check if signature exists
  if (this.signaturePad.isEmpty()) {
    alert('Please sign before submitting.');
    return;
  }

  // 🎨 Convert signature to Blob
  const signatureDataUrl = this.signaturePad.toDataURL('image/png'); // Base64
  const byteString = atob(signatureDataUrl.split(',')[1]);
  const mimeString = signatureDataUrl.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const signatureBlob = new Blob([ab], { type: mimeString });

  // 📤 Send form data
  this.internshipService.addInternshipPFE(this.newInternshipPFE, this.file, signatureBlob).subscribe({
    next: (response) => {
      console.log('InternshipPFE added successfully:', response);
      alert('InternshipPFE added successfully!');
    },
    error: (err) => {
      console.error('Error adding InternshipPFE:', err);
      alert(`Error adding InternshipPFE: ${err.error?.message || 'Please try again later.'}`);
    }
  });
}



  getStudent(): void {
    this.studentService.getStudentById().subscribe(
      (data) => {
        this.student = data;
        console.log(this.student);
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
  }

  selectedFile?: File;

  clearSignature(): void {
    this.signaturePad.clear(); // Clear the signature pad
  }


  
  

}
