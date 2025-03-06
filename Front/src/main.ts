//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { AppRoutingModule } from './app/app-routing.module'; // Importez AppRoutingModule
//import { routes } from './app/app.routes'; // Import your routes
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { AppModule } from './app/app.module';


bootstrapApplication(AppComponent, {
  providers: [
    //provideRouter(AppRoutingModule), // Provide your routes
    importProvidersFrom(AppRoutingModule,HttpClientModule), // Import HttpClientModule
    // Add other providers here
  ]
}).catch(err => console.error(err));
