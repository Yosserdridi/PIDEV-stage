import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Correction ici
})
export class HeaderComponent {
  constructor(private route:Router){}
  // Code du composant
  logout(){
    localStorage.clear()
    this.route.navigateByUrl("/")
  }
  isconnect(){
    return localStorage.getItem("state") ? true :false;
  }
}