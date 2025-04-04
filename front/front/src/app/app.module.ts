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
import { BackEntrepriseComponent } from './components/back-entreprise/back-entreprise.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { ModifyPassComponent } from './components/User/modify-pass/modify-pass.component';
import { ForgetpasswordComponent } from './components/User/forgetpassword/forgetpassword.component';
import { SavepasswordComponent } from './components/User/savepassword/savepassword.component';
import { AuthGuard } from './_helpers';
import { BackOfficeComponent } from './components/back-office/back-office.component';
import { UserComponent } from './components/back-office/user/user.component';
import { LayoutStaticComponent } from './components/back-office/layout-static/layout-static.component';
import { LayoutSidenavLightComponent } from './components/back-office/layout-sidenav-light/layout-sidenav-light.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ProfileComponent } from './components/User/profile/profile.component';
import { NavbarComponent } from './components/back-office/navbar/navbar.component';
import { routes } from './app.routes';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ChipsModule } from 'primeng/chips';
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';
import { ChatComponent } from './components/back-office/chat/chat.component';
import { MessageBubbleComponent } from './components/back-office/chat/message-bubble/message-bubble.component';
import { ConversationListComponent } from './components/back-office/chat/conversation-list/conversation-list.component';
import { MultiSelectModule } from 'primeng/multiselect';



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
    ModifyPassComponent,
    ForgetpasswordComponent,
    SavepasswordComponent,
    BackOfficeComponent,
    UserComponent,
    LayoutStaticComponent,
    LayoutSidenavLightComponent,
    NavbarComponent,
    ChatComponent,
    MessageBubbleComponent,
    ConversationListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ChipsModule,
    CardModule,
    ListboxModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    MultiSelectModule,
    ConfirmDialogModule,
    InputTextModule,
    RouterModule.forRoot(routes) // Utiliser les routes définies
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
   ConfirmationService,
   MessageService


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
