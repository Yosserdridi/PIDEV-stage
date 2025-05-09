import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componment/front/home/home.component';
import { ComplaintsComponent } from './componment/front/complaints/complaints.component';
import { ForumComponent } from './componment/front/forum/forum.component';
import { PfeIntershipsComponent } from './componment/front/pfe-interships/pfe-interships.component';
import { PostulationsComponent } from './componment/front/postulations/postulations.component';
import { SubjectsComponent } from './componment/front/subjects/subjects.component';
import { SummerIntershipsComponent } from './componment/front/summer-interships/summer-interships.component';
import { LoginComponent } from './componment/front/login/login.component';
import { ComplaintsAdminComponent } from './componment/back/complaints-admin/complaints-admin.component';
import { ForumAdminComponent } from './componment/back/forum-admin/forum-admin.component';
import { PfeAdminComponent } from './componment/back/pfe-admin/pfe-admin.component';
import { AllPostulationsComponent } from './componment/back/postulation-admin/allpostulation.component';
import { SummerAdminComponent } from './componment/back/summer-admin/summer-admin.component';
import { LoginAdminComponent } from './componment/back/login-admin/login-admin.component';
import { AdminComponent } from './componment/back/admin/admin.component';
import { InternshipConventionComponent } from './internship-convention/internship-convention.component';
import { DepositPfeInternshipComponent } from './deposit-pfe-internship/deposit-pfe-internship.component';
import { StudentAdminComponent } from './componment/back/student-admin/student-admin.component';
import { TeacherAdminComponent } from './componment/back/teacher-admin/teacher-admin.component';
import { GetTeacherAdminComponent } from './componment/back/get-teacher-admin/get-teacher-admin.component';
import { InternshipdetailComponent } from './componment/back/summerBack/internshipdetail/internshipdetail.component';
import { AddTasksComponent } from './componment/front/summer_front/add-tasks/add-tasks.component';
import { AddInternshipComponent } from './componment/front/summer_front/add-internship/add-internship.component';
import { AddFileComponent } from './componment/front/summer_front/add-file/add-file.component';
import { ValidConevntionComponent } from './componment/front/summer_front/valid-conevntion/valid-conevntion.component';
import { AddJournalComponent } from './componment/front/summer_front/add-journal/add-journal.component';
import { AddConventionComponent } from './componment/front/summer_front/add-convention/add-convention.component';
import { CIFDetailsComponent } from './componment/front/summer_front/cif-details/cif-details.component';
import { ViewAllTasksComponent } from './componment/front/summer_front/view-all-tasks/view-all-tasks.component';
import { ConventionUserComponent } from './componment/front/summer_front/convention-user/convention-user.component';
import { ConventionDetailUserComponent } from './componment/front/summer_front/convention-detail-user/convention-detail-user.component';
import { UserAllTasksComponent } from './componment/front/summer_front/user-all-tasks/user-all-tasks.component';
import { CoventiondetailComponent } from './componment/back/summerBack/coventiondetail/coventiondetail.component';
import { TasksConventionComponent } from './componment/back/summerBack/tasks-convention/tasks-convention.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { UpdatePostBackComponent } from './update-post-back/update-post-back.component';
import { AddPostBackComponent } from './add-post-back/add-post-back.component';
import { ListApprovedComponent } from './componment/back/list-approved/list-approved.component';
import { ListRejectedComponent } from './componment/back/list-rejected/list-rejected.component';
import { ListArchivedComponent } from './componment/back/list-archived/list-archived.component';
import { AddComplaintComponent } from './componment/front/complaints/add-complaint/add-complaint.component';
import {CalendarComponent} from "./componment/back/calendar/calendar.component";
import { FullCalendarModule } from '@fullcalendar/angular';

import { ReadadminComponent } from './componment/back/subjectadmin/read/read.component';
import { CreateadminComponent } from './componment/back/subjectadmin/create/create.component';
import { UpdateadminComponent } from './componment/back/subjectadmin/update/update.component';
import { PostulationsSpComponent } from './componment/back/subjectadmin/postulations/postulations.component';
import { AddPComponent } from './componment/front/postulations/add/add.component';
import { SummaryComponent } from './componment/front/postulations/summary/summary.component';



const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'complaints', component: ComplaintsComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'postulations', component: PostulationsComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'summer', component: SummerIntershipsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'complaintsadmin', component: ComplaintsAdminComponent },
  { path: 'forumadmin', component: ForumAdminComponent},
  { path: 'pfeadmin', component: PfeAdminComponent},
  { path: 'summeradmin', component: SummerAdminComponent},
  { path: 'loginadmin', component: LoginAdminComponent},
  { path: 'admin', component: AdminComponent},



  { path: 'pfe', component:PfeIntershipsComponent  },
  { path: 'pfestudentadmin', component: PfeAdminComponent},
  { path: 'pfeteacheradmin', component: TeacherAdminComponent},
  { path: 'internship-convention', component: InternshipConventionComponent},
  { path: 'depoist-pfe-internship', component : DepositPfeInternshipComponent},
  { path: 'student/:id', component: StudentAdminComponent },
  { path: 'teacher/:id', component: GetTeacherAdminComponent },
  {path: 'forumadmin', component: ForumAdminComponent},
  {path: 'pfeadmin', component: PfeAdminComponent},
  {path: 'summeradmin', component: SummerAdminComponent},
  {path: 'loginadmin', component: LoginAdminComponent},
  {path: 'admin', component: AdminComponent},
  {path:  'internshipDetail/:id', component:InternshipdetailComponent},
  { path: 'add-tasks/:id', component: AddTasksComponent },
  { path: 'add-internship/:id', component: AddInternshipComponent },
  { path: 'add_files/:id', component: AddFileComponent },
  {path: 'valide_convention', component: ValidConevntionComponent},
  {path: 'add_journal/:id', component: AddJournalComponent},
  {path: 'add_convention', component: AddConventionComponent},
  {path:'entities/:id', component:CIFDetailsComponent},

  {path:'alltasks/:id',component:ViewAllTasksComponent},

  {path :'user_convention',component:ConventionUserComponent},

  { path: 'convention/user/details/:id', component:ConventionDetailUserComponent},
  {path: 'convention/user/tasks/:id',component:UserAllTasksComponent},

  {path: 'admin/conventionDetail/:id',component:CoventiondetailComponent},
  {path: 'admin/coventiontasks/:id',component:TasksConventionComponent},





  
  {path: 'add-post', component:AddPostComponent },
  { path: 'update-post/:id', component: UpdatePostComponent },
  { path: 'post-details/:id', component: PostDetailsComponent },
  { path: 'update-post-back/:id', component: UpdatePostBackComponent },
  {path: 'add-post-back', component:AddPostBackComponent },
  {path: 'list-approved', component:ListApprovedComponent },
  {path: 'list-rejected', component:ListRejectedComponent },
  {path: 'list-archived', component:ListArchivedComponent },
  { path: 'complaints', component: ComplaintsComponent },
  { path:'stat', component:CalendarComponent},


  { path: 'add-complaint', component: AddComplaintComponent },
  {path: 'admin', component: AdminComponent},

  
  { path: 'adminsujetread', component: ReadadminComponent },
  {path: 'adminsujetcreate', component: CreateadminComponent},
  {path: 'adminsujetedit/:id', component: UpdateadminComponent},
  { path: 'postulationbysujet/:idsujet', component: PostulationsSpComponent },
  {path: 'postulationsadmin', component: AllPostulationsComponent},
    {path: 'summary', component: SummaryComponent},

  {path: 'create/postulation/:idsujet', component: AddPComponent},

  { path: '', redirectTo: '/home', pathMatch: 'full' }
];











@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
