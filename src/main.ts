import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module';
import { environment } from './app/environments/environment';

if (environment.production) enableProdMode();

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(BrowserModule, BrowserAnimationsModule, HttpClientModule),
  ],
}).catch(console.error);
