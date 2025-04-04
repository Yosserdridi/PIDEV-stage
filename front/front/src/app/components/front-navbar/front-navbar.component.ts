import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-front-navbar',
  templateUrl: './front-navbar.component.html',
  styleUrls: ['./front-navbar.component.css']
})
export class FrontNavbarComponent implements OnInit {
  userRole: string | null = 'Default'; // Default role
  userLogin: string | null = null;
  selectedLink: string = '';
  isDropdownOpen = false;


  constructor(
    private router: Router,
   ) {}

   toggleDropdown(event: Event) {
    event.preventDefault(); // Prevent default behavior
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.dropdown')) {
      this.isDropdownOpen = false;
    }
  }
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
    }
     else {
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
