import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
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
import { HttpClientModule } from '@angular/common/http';
import { InternshipConventionComponent } from './internship-convention/internship-convention.component';
import { DepositPfeInternshipComponent } from './deposit-pfe-internship/deposit-pfe-internship.component';
import { StudentAdminComponent } from './componment/back/student-admin/student-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeacherAdminComponent } from './componment/back/teacher-admin/teacher-admin.component';
import { GetTeacherAdminComponent } from './componment/back/get-teacher-admin/get-teacher-admin.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ListConventionComponent } from './componment/back/summerBack/list-convention/list-convention.component';
import { AddConventionComponent } from './componment/front/summer_front/add-convention/add-convention.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddInternshipComponent } from './componment/front/summer_front/add-internship/add-internship.component';
import { ListInternshipComponent } from './componment/back/summerBack/list-internship/list-internship.component';
import { InternshipdetailComponent } from './componment/back/summerBack/internshipdetail/internshipdetail.component';
import { AddFileComponent } from './componment/front/summer_front/add-file/add-file.component';
import { ListReportsComponent } from './componment/back/summerBack/list-reports/list-reports.component';
import { AddTasksComponent } from './componment/front/summer_front/add-tasks/add-tasks.component';
import { AddJournalComponent } from './componment/front/summer_front/add-journal/add-journal.component';
import { ValidConevntionComponent } from './componment/front/summer_front/valid-conevntion/valid-conevntion.component';
import { CIFDetailsComponent } from './componment/front/summer_front/cif-details/cif-details.component';
import { ViewAllTasksComponent } from './componment/front/summer_front/view-all-tasks/view-all-tasks.component';
import { ConventionUserComponent } from './componment/front/summer_front/convention-user/convention-user.component';
import { ConventionDetailUserComponent } from './componment/front/summer_front/convention-detail-user/convention-detail-user.component';
import { UserAllTasksComponent } from './componment/front/summer_front/user-all-tasks/user-all-tasks.component';
import { CoventiondetailComponent } from './componment/back/summerBack/coventiondetail/coventiondetail.component';
import { TasksConventionComponent } from './componment/back/summerBack/tasks-convention/tasks-convention.component';
import { NgChartsModule } from 'ng2-charts';
import { StatistiqueComponent } from './componment/back/summerBack/statistique/statistique.component';
import { StatinvalidComponent } from './componment/back/summerBack/statinvalid/statinvalid.component';
import { AddPostComponent } from './add-post/add-post.component';

import { PostDetailsComponent } from './post-details/post-details.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { UpdatePostBackComponent } from './update-post-back/update-post-back.component';
import { AddPostBackComponent } from './add-post-back/add-post-back.component';
import { ListApprovedComponent } from './componment/back/list-approved/list-approved.component';
import { ListRejectedComponent } from './componment/back/list-rejected/list-rejected.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListArchivedComponent } from './componment/back/list-archived/list-archived.component';


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
    InternshipConventionComponent,
    DepositPfeInternshipComponent,
    StudentAdminComponent,
    TeacherAdminComponent,
    GetTeacherAdminComponent,
    CalendarComponent,
    ListConventionComponent,
    AddConventionComponent,
    AddInternshipComponent,
    ListInternshipComponent,
    InternshipdetailComponent,
    AddFileComponent,
    ListReportsComponent,
    AddTasksComponent,
    AddJournalComponent,
    ValidConevntionComponent,
    CIFDetailsComponent,
    ViewAllTasksComponent,
    ConventionUserComponent,
    ConventionDetailUserComponent,
    UserAllTasksComponent,
    CoventiondetailComponent,
    TasksConventionComponent,
    StatistiqueComponent,
    StatinvalidComponent,
    AddPostComponent,
  
    PostDetailsComponent,
        UpdatePostComponent,
        UpdatePostBackComponent,
        AddPostBackComponent,
        ListApprovedComponent,
        ListRejectedComponent,
        ListArchivedComponent,
   

    
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
    NgxPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { 
  
}
