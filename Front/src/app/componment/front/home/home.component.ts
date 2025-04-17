import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  //standalone: true,
  imports: [RouterModule], // Importez RouterModule pour utiliser routerLink
  template: `
    <h1>Welcome to the Home Page</h1>
    <a routerLink="/subjects">Go to Subjects</a>
  `,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
