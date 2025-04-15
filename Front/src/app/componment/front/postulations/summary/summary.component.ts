import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { PostulationService } from 'src/app/Services/postulation/postulation.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  postulations: any[] = [];

  chartLabels: string[] = ['Pending', 'Accepted', 'Rejected'];
  chartType: ChartType = 'doughnut';
  chartData: ChartData<'doughnut'> = {
    labels: this.chartLabels,
    datasets: [
      { data: [0, 0, 0], backgroundColor: ['#FFAF0D', '#4BAE4F', '#E53935'] }
    ]     
  };

  constructor(private postulationService: PostulationService) {}

  ngOnInit(): void {
    this.postulationService.getPostulationsByStudentId(1).subscribe((data: any[]) => {
      this.postulations = data;
      this.calculateStats();
    });
  }

  calculateStats(): void {
    const statusCount = [0, 0, 0]; // pending, accepted, rejected
    for (const post of this.postulations) {
      if (post.status !== undefined && post.status >= 0 && post.status <= 2) {
        statusCount[post.status]++;
      }
    }

    this.chartData = {
      labels: this.chartLabels,
      datasets: [
        {
          data: [...statusCount],
          backgroundColor: ['#FFAF0D', '#4BAE4F', '#E53935']
        }
      ]
    };
  }
}
