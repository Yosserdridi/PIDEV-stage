import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { SubjectsAdminComponent } from './componment/back/subjects-admin/subjects-admin.component';
import { PfeAdminComponent } from './componment/back/pfe-admin/pfe-admin.component';
import { PostulationAdminComponent } from './componment/back/postulation-admin/postulation-admin.component';
import { SummerAdminComponent } from './componment/back/summer-admin/summer-admin.component';
import { ForumAdminComponent } from './componment/back/forum-admin/forum-admin.component';
import { ComplaintsAdminComponent } from './componment/back/complaints-admin/complaints-admin.component';
import { LoginAdminComponent } from './componment/back/login-admin/login-admin.component';
import {HttpClientModule} from "@angular/common/http";
import { ComplaintFormComponent } from './componment/front/complaints/components/complaint-form/complaint-form.component';
import { ComplaintListComponent } from './componment/front/complaints/components/complaint-list/complaint-list.component';
import {FormsModule} from "@angular/forms";
import { ComplaintService, Complaint } from 'src/app/componment/front/complaints/services/complaint.service';
import {RouterModule} from "@angular/router";
import { AddComplaintComponent } from './componment/front/complaints/components/add-complaint/add-complaint.component';

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
    SubjectsAdminComponent,
    PostulationAdminComponent,
    PfeAdminComponent,
    SummerAdminComponent,
    ForumAdminComponent,
    ComplaintsAdminComponent,
    LoginAdminComponent,
    AdminComponent,
    ComplaintListComponent,
    ComplaintFormComponent,
    AddComplaintComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([])
  ],
  providers: [ComplaintService],
  bootstrap: [AppComponent,ComplaintListComponent,ComplaintFormComponent]
})
export class AppModule { }
