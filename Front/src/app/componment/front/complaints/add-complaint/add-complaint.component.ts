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
  @ViewChild('complaintForm', { static: false }) complaintForm!: NgForm;
  newComplaint: Complaint = new Complaint();
  errorMessage: string = '';
complaints: any;
  constructor(private complaintService: ComplaintService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('Formulaire valide:', this.complaintForm.value);
    if (this.complaintForm && this.complaintForm.valid) {
      
      console.log('Envoi de la plainte:', this.newComplaint);
      this.complaintService.addComplaint(this.newComplaint).subscribe(
        (response) => {
          console.log('Plainte ajoutée avec succès:', response);
          this.router.navigate(['/complaints']);
        },
        (error) => {
          this.errorMessage = 'Erreur lors de l\'envoi de la plainte. Veuillez réessayer.';
          console.error('Erreur:', error);
        }
      );
    } else {
      console.log("Le formulaire est invalide !");
    }
  }
}