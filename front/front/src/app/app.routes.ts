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
import { ModifyPassComponent } from './components/User/modify-pass/modify-pass.component';
import { BackOfficeComponent } from './components/back-office/back-office.component';
import { UserComponent } from './components/back-office/user/user.component';
import { LayoutStaticComponent } from './components/back-office/layout-static/layout-static.component';
import { LayoutSidenavLightComponent } from './components/back-office/layout-sidenav-light/layout-sidenav-light.component';
import { ChatComponent } from './components/back-office/chat/chat.component';
import { SavepasswordComponent } from './components/User/savepassword/savepassword.component';
import { ForgetpasswordComponent } from './components/User/forgetpassword/forgetpassword.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'forgetpassword', component: ForgetpasswordComponent }, // Add the Profile route here

  { path: 'change-password', component: ModifyPassComponent },
  { path: 'savePassword/:reset', component: SavepasswordComponent },

  { path: 'modify-pass', component: ModifyPassComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, children:[
    {path:"", component:BackOfficeComponent},
    {path:"chatbot", component:ChatComponent},
    {path:"users", component:UserComponent},
  ]},
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // Protégé par AuthGuard
  { path: 'entreprise', component: BackEntrepriseComponent },
  { path: '**', redirectTo: 'home' },
  { path: 'profile', component: ProfileComponent } ,// Add the Profile route here


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
