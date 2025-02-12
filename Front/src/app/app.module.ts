import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { AppComponent } from './app.component';
 import { FrontFooterComponent } from './components/front-footer/front-footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/User/login/login.component';
import { RegisterComponent } from './components/User/register/register.component';
import { ForgotPasswordComponent } from './components/User/forgot-password/forgot-password.component';
 import { FrontNavbarComponent } from './components/front-navbar/front-navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { BackNavbarComponent } from './components/back-navbar/back-navbar.component';
import { ProfileComponent } from './components/User/profile/profile.component';
import { BackEntrepriseComponent } from './components/back-entreprise/back-entreprise.component';



// Define your routes here
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'front', component: FrontNavbarComponent },  
  { path: 'back', component: BackNavbarComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'profile', component: ProfileComponent },
  {path : 'entreprise', component: BackEntrepriseComponent},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    FrontNavbarComponent,
    FrontFooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
     HeaderComponent,
     BackNavbarComponent,
     ProfileComponent,
     BackEntrepriseComponent

   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule, 
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
