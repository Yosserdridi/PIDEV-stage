import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileModel } from 'src/model/file-model';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private url="http://localhost:9091/stage";


  constructor(private http:HttpClient) {}

  uploadFiles(reportFile: File, certificateFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('report', reportFile); // Must match @RequestParam("report") in Spring Boot
    formData.append('certificate', certificateFile); // Must match @RequestParam("certificate")

    return this.http.post(`${this.url}/upload`, formData);
  }
  getAllReport(): Observable <FileModel[]> {
    return this.http.get<FileModel[]>(`${this.url}/getAllFiles`);
  }

  downloadReport(fileName :string) : Observable<Blob> {
    return this.http.get(`${this.url}/download/${fileName}`, { responseType: 'blob' });
  }

  
  



 }
