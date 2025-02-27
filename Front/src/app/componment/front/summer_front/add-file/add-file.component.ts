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

  summerID !:number;


  constructor(private fileService: FilesService, private route:ActivatedRoute){}


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.summerID = +params['id'];  // Get the journalId from the route parameters
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

    this.fileService.uploadFiles(this.reportFile, this.certificateFile).subscribe(
      response => console.log('Upload successful', response),
      error => console.error('Upload failed', error)
    );
  }
}












