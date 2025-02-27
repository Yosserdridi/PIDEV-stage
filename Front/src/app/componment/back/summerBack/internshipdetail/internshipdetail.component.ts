import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Summer } from 'src/model/summer';
import { SummerService } from 'src/services/service_summer/summer.service';

@Component({
  selector: 'app-internshipdetail',
  templateUrl: './internshipdetail.component.html',
  styleUrls: ['./internshipdetail.component.css']
})
export class InternshipdetailComponent implements OnInit {

  internship : Summer | null=null;

  constructor(
    private route:ActivatedRoute,
    private  internshipService: SummerService
  ){}


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.internshipService.getSummerInternship(+id).subscribe((data) => {
        this.internship = data;
      });
    }
  }
  
  


}
