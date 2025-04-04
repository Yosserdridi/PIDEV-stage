import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-back-navbar',
  templateUrl: './back-navbar.component.html',
  styleUrls: ['./back-navbar.component.css'] // Correction ici
})
export class BackNavbarComponent implements OnInit {
  userRole: string | null = 'Default'; // Default role
  userLogin: string | null = null;
  selectedLink: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Subscribe to route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateSelectedLink(event.urlAfterRedirects);
      }
    });
  }

  // Update the selected link based on the route
  updateSelectedLink(url: string): void {
    if (url.includes('/home')) {
      this.selectedLink = 'Home';
    } else if (url.includes('/register')) {
      this.selectedLink = 'Register';
    } else if (url.includes('/profile')) {
      this.selectedLink = 'Profile';
    } else {
      this.selectedLink = '';
    }
  }

  setSelectedLink(linkName: string) {
    this.selectedLink = linkName;
  }

  logout() {
    this.router.navigate(['/home']);
  }
}