import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComplaintService, Complaint } from 'src/app/componment/front/complaints/services/complaint.service';

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.css']
})
export class AddComplaintComponent implements OnInit {
  isEdit: boolean = false;
  complaint: any = {
    id: null,
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0], // Date du jour par défaut
    status: 'Ouvert'
  };

  constructor(
      private complaintService: ComplaintService,
      private router: Router,
      private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.complaintService.getComplaintById(+id).subscribe((data: any) => {
        this.complaint = data;
      });
    }
  }

  submitForm(): void {
    this.complaintService.addComplaint(this.complaint).subscribe({
      next: (response) => {
        console.log('Plainte ajoutée avec succès :', response);
        this.router.navigate(['/complaints']); // Redirection vers la liste des plaintes
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de la plainte :', err);
      }
    });
  }
}
