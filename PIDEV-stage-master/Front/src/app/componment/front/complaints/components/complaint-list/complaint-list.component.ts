import { Component, OnInit } from '@angular/core';
import { ComplaintService, Complaint } from '../../services/complaint.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.css']
})
export class ComplaintListComponent implements OnInit {
  complaints: Complaint[] = [];

  constructor(private complaintService: ComplaintService, private router: Router) {}

  ngOnInit(): void {
    this.getComplaints();
  }

  getComplaints(): void {
    this.complaintService.getAllComplaints().subscribe((data: Complaint[]) => {
      this.complaints = data;
    });
  }


  editComplaint(id: number): void {
    this.router.navigate(['/edit-complaint', id]);
  }

  deleteComplaint(id: number | undefined): void {
    this.complaintService.deleteComplaint(id).subscribe(() => {
      this.complaints = this.complaints.filter(c => c.id !== id);
    });
  }
}
