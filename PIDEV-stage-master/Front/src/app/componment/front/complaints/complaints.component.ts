import { Component, OnInit } from '@angular/core';
import { Complaint, ComplaintService } from 'src/app/componment/front/complaints/services/complaint.service';

@Component({
    selector: 'app-complaints',
    templateUrl: './complaints.component.html',
    styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
    complaints: Complaint[] = []; // Correct type (tableau)

    constructor(private complaintService: ComplaintService) {}

    ngOnInit(): void {
        this.loadComplaints();
    }

    loadComplaints() {
        this.complaintService.getAllComplaints().subscribe(
            (data: Complaint[]) => {
                this.complaints = data;
            },
            (error: any) => {  // Correction du type de error
                console.error('Erreur lors du chargement des plaintes', error);
            }
        );
    }

    deleteComplaint(id: number | undefined) {
        if (id !== undefined && confirm('Êtes-vous sûr de vouloir supprimer cette plainte ?')) {
            this.complaintService.deleteComplaint(id).subscribe(
                () => {
                    this.loadComplaints();
                },
                (error: any) => {
                    console.error('Erreur lors de la suppression', error);
                }
            );
        }
    }

}
