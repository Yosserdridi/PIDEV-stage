import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root'
})
export class PfeInternshipService {

    private PfeInternshipUrl = 'http://localhost:9091/stage/PfeInternship';
    private internshipsUrl = 'http://localhost:9091/stage/internships';
    private restitutionUrl = 'http://localhost:9091/stage/restitution';

    private studentId = 1 ;
    
    constructor(private http: HttpClient ,private studentService: StudentService) { }
    

    getInternshipConventionId(): Observable<number> {
      return this.http.get<number>(`${this.internshipsUrl}/pfe-id/${this.studentId}`);
    }

    addInternshipPFE(internshipPFE: any, file?: File, signatureBlob?: Blob): Observable<any> {
      const formData = new FormData();
    
      formData.append("title", internshipPFE.title);
      formData.append("description", internshipPFE.description);
      formData.append("startDate", internshipPFE.startDate);
      formData.append("endDate", internshipPFE.endDate);
    
      if (file) {
        formData.append("signedConvention", file);
      }
    
      if (signatureBlob) {
        formData.append("signature", signatureBlob, "signature.png"); // <-- send it as file
      }
    
      return this.http.post<any>(`${this.PfeInternshipUrl}/${this.studentId}/assign-internshipPFE`, formData);
    }
    
  

    /* addInternshipPFE(internshipPFE: any): Observable<any> {
      return this.http.post<any>(`${this.PfeInternshipUrl}/${this.studentId}/assign-internshipPFE`, internshipPFE);
    }
 */
    addRestitution(internshipId: number, restitution: any): Observable<any> {
      return this.http.post(`${this.restitutionUrl}/addRestitutionAndAssignToPFEInternship/${internshipId}`, restitution);
    }

    
}
