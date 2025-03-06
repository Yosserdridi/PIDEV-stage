import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {}


  /*onNavigate(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'upload') {
      this.router.navigate(['/upload']);
    }
  } 
    */

  showDropdown = false;

  toggleDropdown(event: Event) {
    event.preventDefault(); // Prevent page from jumping
    this.showDropdown = !this.showDropdown;
  }
}
