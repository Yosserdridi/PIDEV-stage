import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplaintService, Complaint } from 'src/app/componment/front/complaints/services/complaint.service';

@Component({
  selector: 'app-complaint-form',
  templateUrl: './complaint-form.component.html',
  styleUrls: ['./complaint-form.component.css']
})
export class ComplaintFormComponent implements OnInit {
  complaint: Complaint = { title: '', content: '' };
  isEdit: boolean = false;

  constructor(
      private complaintService: ComplaintService,
      private route: ActivatedRoute,
      private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.complaintService.getComplaintById(+id).subscribe((data: Complaint) => {
        this.complaint = data;
      });
    }
  }


  submitForm() {
    if (this.isEdit) {
      this.complaintService.updateComplaint(this.complaint).subscribe(() => {
        this.router.navigate(['/complaints']);
      });
    } else {
      this.complaintService.addComplaint(this.complaint).subscribe(() => {
        this.router.navigate(['/complaints']);
      });
    }
  }
}
