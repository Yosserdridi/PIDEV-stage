import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FileModel } from 'src/model/file-model';
import { FilesService } from 'src/services/service_files/files.service';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css']
})
export class AddFileComponent implements OnInit {

  reportFile?: File;
  certificateFile?: File;

  //summerID !:number;

  summerId !: number;
  fileId!:number;
  


  constructor(private fileService: FilesService, private route:ActivatedRoute , private r:Router){}


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.summerId = +params['id'];  // Get the journalId from the route parameters
    });
   
  }


  onFileSelected(event: any, fileType: string) {
    const file = event.target.files[0]; // Get selected file
    if (fileType === 'report') {
      this.reportFile = file;
    } else if (fileType === 'certificate') {
      this.certificateFile = file;
    }
  }


  onSubmit() {
    if (!this.reportFile || !this.certificateFile) {
      alert('Please select both files.');
      return;
    }

    this.fileService.uploadFiles(this.summerId,this.reportFile, this.certificateFile).subscribe(
      response => {
        if (response && response.fileId) {
            console.log('File uploaded successfully, ID:', response.fileId);
            this.fileId = response.fileId; 
           this.r.navigate(['/add_journal', response.fileId]);

           
             // Store or use the file ID as needed
        } else {
            console.error('File ID is missing in the response');
        }
    },
    error => {
        console.error('File upload failed', error);
    }
        );
  }
}












