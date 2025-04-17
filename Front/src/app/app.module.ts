import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FullCalendarModule } from '@fullcalendar/angular'; // FullCalendar Angular wrapper
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componment/front/home/home.component';
import { SubjectsComponent } from './componment/front/subjects/subjects.component';
import { PostulationsComponent } from './componment/front/postulations/postulations.component';
import { PfeIntershipsComponent } from './componment/front/pfe-interships/pfe-interships.component';
import { SummerIntershipsComponent } from './componment/front/summer-interships/summer-interships.component';
import { ForumComponent } from './componment/front/forum/forum.component';
import { SoutenanceComponent } from './componment/front/soutenance/soutenance.component';
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
import { SoutenanceService } from './Services/soutenance/Soutenanceserv';
import { SoutenanceFComponent } from './componment/back/soutenance-f/soutenance-f.component';
import { FormsModule } from '@angular/forms';
import { RangePipe } from './range.pipe';
import { RouterModule, Routes } from '@angular/router';

// Define your routes
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'complaints', component: ComplaintsComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'pfe', component: PfeIntershipsComponent },
  { path: 'postulations', component: PostulationsComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'summer', component: SummerIntershipsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'soutenance', component: SoutenanceComponent },
  { path: 'soutenance-f', component: SoutenanceFComponent },
  { path: 'complaintsadmin', component: ComplaintsAdminComponent },
  { path: 'forumadmin', component: ForumAdminComponent },
  { path: 'pfeadmin', component: PfeAdminComponent },
  { path: 'postulationsadmin', component: PostulationAdminComponent },
  { path: 'subjectsadmin', component: SubjectsAdminComponent },
  { path: 'summeradmin', component: SummerAdminComponent },
  { path: 'loginadmin', component: LoginAdminComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  declarations: [
 //   AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FullCalendarModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    SubjectsComponent,
    PostulationsComponent,
    PfeIntershipsComponent,
    SummerIntershipsComponent,
    ForumComponent,
    SoutenanceComponent,
    ComplaintsComponent,
    LoginComponent,
    NavbarComponent,
    AdminComponent,
    NabradminComponent,
    SubjectsAdminComponent,
    PfeAdminComponent,
    PostulationAdminComponent,
    SummerAdminComponent,
    ForumAdminComponent,
    ComplaintsAdminComponent,
    LoginAdminComponent,
    SoutenanceFComponent,
    RangePipe,
  ],
  providers: [
    provideHttpClient(),
    SoutenanceService,
  ],
  //bootstrap: [AppComponent],
})
export class AppModule {}
