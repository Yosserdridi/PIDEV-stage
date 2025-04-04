import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
import { HttpClient } from '@angular/common/http'; // Import HttpClient if you're using it

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Ensure this path is correct
})
export class HomeComponent {
  constructor(private router: Router, private http: HttpClient) {}
  isconnect(){
    return localStorage.getItem("state") ? true :false;
  }
  // Example method for handling forgot password
  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}