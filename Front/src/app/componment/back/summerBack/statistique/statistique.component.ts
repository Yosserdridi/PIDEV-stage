import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ConventionService } from 'src/services/convention.service';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {

  chartLabels: string[] = [];
  chartData: number[] = [];

  
  chartConfig: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: this.chartLabels,
      datasets: [
        {
          label: 'Conventions validées par mois',
          data: this.chartData,
          backgroundColor: '#4caf50',
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            precision: 0 // supprime les décimales
          }
        }
      },
      plugins: {
        legend: {
          display: true
        },
        title: {
          display: true,
          text: 'Statistiques mensuelles des conventions validées'
        }
      }
    }
  };
  

  constructor(private conventionService: ConventionService) {}




  ngOnInit(): void {
    this.conventionService.getValidatedConventionsStatsByMonth().subscribe(data => {
      this.chartLabels.push(...Object.keys(data));
      this.chartData.push(...Object.values(data));
    });
  }

}
