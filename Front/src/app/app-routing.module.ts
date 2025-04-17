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

// Admin Components
import { AdminComponent } from './componment/back/admin/admin.component';
import { ComplaintsAdminComponent } from './componment/back/complaints-admin/complaints-admin.component';
import { ForumAdminComponent } from './componment/back/forum-admin/forum-admin.component';
import { PfeAdminComponent } from './componment/back/pfe-admin/pfe-admin.component';
import { PostulationAdminComponent } from './componment/back/postulation-admin/postulation-admin.component';
import { SubjectsAdminComponent } from './componment/back/subjects-admin/subjects-admin.component';
import { SummerAdminComponent } from './componment/back/summer-admin/summer-admin.component';
import { LoginAdminComponent } from './componment/back/login-admin/login-admin.component';
import { SoutenanceFComponent } from './componment/back/soutenance-f/soutenance-f.component';
import { SoutenanceComponent } from './componment/front/soutenance/soutenance.component';

// ✅ Removed `export` from `appRoutes`
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

  {
    path: 'admin',
    component: AdminComponent,  
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'complaintsadmin', component: ComplaintsAdminComponent },
      { path: 'forumadmin', component: ForumAdminComponent },
      { path: 'pfeadmin', component: PfeAdminComponent },
      { path: 'postulationsadmin', component: PostulationAdminComponent },
      { path: 'subjectsadmin', component: SubjectsAdminComponent },
      { path: 'summeradmin', component: SummerAdminComponent },
      { path: 'loginadmin', component: LoginAdminComponent },
      { path: 'soutenance-f', component: SoutenanceFComponent }
    ]
  },

  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
