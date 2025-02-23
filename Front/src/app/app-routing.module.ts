import { NgModule } from '@angular/core';
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
import { AllPostulationsComponent } from './componment/back/postulation-admin/allpostulations/allpostulations.component';
import { SummerAdminComponent } from './componment/back/summer-admin/summer-admin.component';
import { LoginAdminComponent } from './componment/back/login-admin/login-admin.component';
import { AdminComponent } from './componment/back/admin/admin.component';
import { ReadadminComponent } from './componment/back/subjectadmin/read/read.component';
import { CreateadminComponent } from './componment/back/subjectadmin/create/create.component';
import { UpdateadminComponent } from './componment/back/subjectadmin/update/update.component';
import { PostulationsSpComponent } from './componment/back/subjectadmin/postulations/postulations.component';
import { AddPComponent } from './componment/front/postulations/add/add.component';

const routes: Routes = [

  
  { path: 'home', component: HomeComponent },
  { path: 'complaints', component: ComplaintsComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'pfe', component:PfeIntershipsComponent  },
  { path: 'postulations', component: PostulationsComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'summer', component: SummerIntershipsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'complaintsadmin', component: ComplaintsAdminComponent },
  {path: 'forumadmin', component: ForumAdminComponent},
  {path: 'pfeadmin', component: PfeAdminComponent},
  {path: 'summeradmin', component: SummerAdminComponent},
  {path: 'loginadmin', component: LoginAdminComponent},
  {path: 'admin', component: AdminComponent},
  { path: 'adminsujetread', component: ReadadminComponent },
  {path: 'adminsujetcreate', component: CreateadminComponent},
  {path: 'adminsujetedit/:id', component: UpdateadminComponent},
  { path: 'postulationbysujet/:idsujet', component: PostulationsSpComponent },
  {path: 'postulationsadmin', component: AllPostulationsComponent},
 
  {path: 'create/postulation/:idsujet', component: AddPComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
