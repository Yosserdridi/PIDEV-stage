import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ConventionService } from 'src/services/convention.service';

@Component({
  selector: 'app-statinvalid',
  templateUrl: './statinvalid.component.html',
  styleUrls: ['./statinvalid.component.css']
})
export class StatinvalidComponent implements OnInit {

  invalidChartLabels: string[] = [];
  invalidChartData: number[] = [];

  chartConfig: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: this.invalidChartLabels,  // Utilise les labels ici
      datasets: [
        {
          label: 'Conventions invalidées par mois',  // Mets à jour le titre
          data: this.invalidChartData,  // Utilise les données ici
          backgroundColor: '#f44336',  // Couleur rouge pour les conventions invalidées
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
          text: 'Statistiques mensuelles des conventions invalidées' // Mets à jour le titre
        }
      }
    }
  };

  constructor(private conventionService: ConventionService) { }

  ngOnInit(): void {
    this.conventionService.getInValidatedConventionsStatsByMonth().subscribe(data => {
      this.invalidChartLabels = Object.keys(data);  // Récupère les mois
      this.invalidChartData = Object.values(data);  // Récupère les données (comptage)
      this.chartConfig.data.labels = this.invalidChartLabels;  // Met à jour les labels
      this.chartConfig.data.datasets[0].data = this.invalidChartData;  // Met à jour les données
    });
  }
}
