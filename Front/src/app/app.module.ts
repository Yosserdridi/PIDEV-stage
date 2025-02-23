import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componment/front/home/home.component';
import { SubjectsComponent } from './componment/front/subjects/subjects.component';
import { PostulationsComponent } from './componment/front/postulations/postulations.component';
import { PfeIntershipsComponent } from './componment/front/pfe-interships/pfe-interships.component';
import { SummerIntershipsComponent } from './componment/front/summer-interships/summer-interships.component';
import { ForumComponent } from './componment/front/forum/forum.component';
import { ComplaintsComponent } from './componment/front/complaints/complaints.component';
import { LoginComponent } from './componment/front/login/login.component';
import { NavbarComponent } from './componment/front/navbar/navbar.component';
import { AdminComponent } from './componment/back/admin/admin.component';
import { NabradminComponent } from './componment/back/nabradmin/nabradmin.component';
 import { PfeAdminComponent } from './componment/back/pfe-admin/pfe-admin.component';
import { SummerAdminComponent } from './componment/back/summer-admin/summer-admin.component';
import { ForumAdminComponent } from './componment/back/forum-admin/forum-admin.component';
import { ComplaintsAdminComponent } from './componment/back/complaints-admin/complaints-admin.component';
import { LoginAdminComponent } from './componment/back/login-admin/login-admin.component';
import { CreateadminComponent } from './componment/back/subjectadmin/create/create.component';
import { ReadadminComponent } from './componment/back/subjectadmin/read/read.component';
import { UpdateadminComponent } from './componment/back/subjectadmin/update/update.component';
import { PostulationsSpComponent } from './componment/back/subjectadmin/postulations/postulations.component';
import { AllPostulationsComponent } from './componment/back/postulation-admin/allpostulations/allpostulations.component';
import { AddPComponent } from './componment/front/postulations/add/add.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubjectsComponent,
    PostulationsComponent,
    PfeIntershipsComponent,
    SummerIntershipsComponent,
    ForumComponent,
    ComplaintsComponent,
    LoginComponent,
    NavbarComponent,
    NabradminComponent,
    PfeAdminComponent,
    SummerAdminComponent,
    ForumAdminComponent,
    ComplaintsAdminComponent,
    LoginAdminComponent,
    AdminComponent,
    CreateadminComponent,
    ReadadminComponent,
    UpdateadminComponent,
    PostulationsSpComponent,
    AllPostulationsComponent,
    AddPComponent
    
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule 
  ],
  exports: [AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
