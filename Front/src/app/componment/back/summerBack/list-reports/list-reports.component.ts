import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileModel } from 'src/model/file-model';
import { FilesService } from 'src/services/service_files/files.service';

@Component({
  selector: 'app-list-reports',
  templateUrl: './list-reports.component.html',
  styleUrls: ['./list-reports.component.css']
})
export class ListReportsComponent implements OnInit {
  reports:FileModel[] =[];

  constructor(private fileService:FilesService ,private route:Router){}

  ngOnInit(): void {

    this.fileService.getAllReport().subscribe ((data)=> {
      this.reports =data
    });
  
  }

  downloadReport(fileName :string): void {
    this.fileService.downloadReport(fileName).subscribe((blob) => {
      const url =window.URL.createObjectURL(blob);
      const a =document.createElement('a');

      a.href =url;
      a.download =fileName;
      a.click();
      window.URL.revokeObjectURL(url)
    })
  }

  
  

}
