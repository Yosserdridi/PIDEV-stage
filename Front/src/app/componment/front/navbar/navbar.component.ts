import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showDropdown = false;

  toggleDropdown(event: Event) {
    event.preventDefault(); // Prevent page from jumping
    this.showDropdown = !this.showDropdown;
  }

}
