import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AuthInterceptor } from './services/auth.interceptor';
import { ForgetpassComponent } from './components/User/forgetpass/forgetpass.component';

// Définition des routes
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'forgetpass', component: ForgetpassComponent }, // Ajoutez la route pour ForgetpassComponent
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
    HeaderComponent,
    BackNavbarComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    BackEntrepriseComponent,
    ForgetpassComponent, // Vérifiez que ce composant est bien importé
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes) // Utiliser les routes définies
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }