import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  id: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(
      private router: Router
  ) {}

  onSubmit() {
  }
}
