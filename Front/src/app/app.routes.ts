import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/User/login/login.component';
import { RegisterComponent } from './components/User/register/register.component';
import { ForgotPasswordComponent } from './components/User/forgot-password/forgot-password.component';
 import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/User/profile/profile.component';
import { BackEntrepriseComponent } from './components/back-entreprise/back-entreprise.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  {path : 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent },
  {path : 'forgot', component: ForgotPasswordComponent},
  { path: 'header', component: HeaderComponent },
  { path: 'profile', component: ProfileComponent },
  {path : 'entreprise', component: BackEntrepriseComponent},
  { path: '**', redirectTo: 'home' }
];
