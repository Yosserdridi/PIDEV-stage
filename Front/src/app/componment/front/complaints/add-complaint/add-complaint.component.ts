import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ComplaintService } from 'src/app/service/complaint.service';
import { Complaint } from 'src/app/models/complaint.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.css']
})
export class AddComplaintComponent implements OnInit {
  onDelete(arg0: any) {
    throw new Error('Method not implemented.');
  }

  onEdit(_t99: any) {
    throw new Error('Method not implemented.');
  }

  @ViewChild('complaintForm', {static: false}) complaintForm!: NgForm;
  errorMessage: string = '';
  selectedFile: File | null = null;
  complaints: any;
  newComplaint: any = {
    title: '',
    content: '',
    typeC: '',
    typeStatus: '',
    dateComplaint: '',
    user_Id:[1]
  };

  constructor(private complaintService: ComplaintService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (!this.newComplaint.title || !this.newComplaint.content || !this.newComplaint.typeC ) {
      this.errorMessage = 'Please fill all the required fields.';
      return;
    }

    const formData = new FormData();
    formData.append('title', this.newComplaint.title);
    formData.append('content', this.newComplaint.content);
    formData.append('typeC', this.newComplaint.typeC);
    formData.append('typeStatus', "Pending");

    // ➜ Formatage correct de la date locale
    const today = new Date();
    const localDate = today.toLocaleDateString('fr-CA'); // Format YYYY-MM-DD
    formData.append('dateComplaint', localDate);

    formData.append("userId", this.newComplaint.user_Id);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.complaintService.addComplaint(formData).subscribe({
      next: (response) => {
        console.log('Complaint added successfully', response);
        alert('Complaint submitted successfully');
        this.router.navigateByUrl("/complaints");
      },
      error: (error) => {
        console.error('Error submitting complaint:', error);
        this.errorMessage = 'Error submitting complaint. Please try again later.';
      }
    });
  }
}