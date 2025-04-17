import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuryService } from '../../../Services/soutenance/JuryService'; // Adjust the import path as necessary

/*@Component({
  selector: 'app-jury',
  standalone: true, // If using standalone components
  imports: [CommonModule],
  templateUrl: './jury.component.html',
  styleUrls: ['./jury.component.css']
})
export class JuryComponent implements OnInit {
  jurys: any[] = [];

  constructor(private juryService: JuryService) {}

  /*ngOnInit(): void {
    this.loadJurys();
  }

  loadJurys() {
    this.juryService.getAllJurys().subscribe(data => {
      this.jurys = data;
    });
  }*/

