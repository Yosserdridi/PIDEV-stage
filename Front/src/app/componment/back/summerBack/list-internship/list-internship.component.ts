import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Summer } from 'src/model/summer';
import { SummerService } from 'src/services/service_summer/summer.service';

@Component({
  selector: 'app-list-internship',
  templateUrl: './list-internship.component.html',
  styleUrls: ['./list-internship.component.css']
})
export class ListInternshipComponent implements OnInit{


  internships: Summer[] =[];

  constructor(private summerService : SummerService,
    private route:Router
  ){}


  ngOnInit(): void {

    this.summerService.getAllSummerInternships().subscribe((data) => {
      this.internships = data;
    });

  }

  deleteInternship(id: number): void {
    this.summerService.deleteSummerInternship(id).subscribe(() => {
      this.ngOnInit();
    });
  }


  viewDetails(id: number) {
    this.route.navigate(['/internshipDetail', id]);

    }
  }
    






