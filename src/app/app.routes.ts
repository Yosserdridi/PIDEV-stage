import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/User/login/login.component';
import { RegisterComponent } from './components/User/register/register.component';
import { ForgotPasswordComponent } from './components/User/forgot-password/forgot-password.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/User/profile/profile.component';
import { BackEntrepriseComponent } from './components/back-entreprise/back-entreprise.component';
import { AuthGuard } from './services/auth.guard'; // Assurez-vous que le chemin est correct


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // Protégé par AuthGuard
  { path: 'entreprise', component: BackEntrepriseComponent },
  { path: '**', redirectTo: 'home' },
  { path: 'profile', component: ProfileComponent } // Add the Profile route here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }