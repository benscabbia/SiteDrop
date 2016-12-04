import { SiteService } from './dashboard/site.service';
import { GithubService } from './github/github.service';
import { AngularFireModule } from 'angularfire2';

import { ConfigService } from './Shared/config.service';
import { AuthGuard } from './authentication/auth.guard';
import { AuthService } from './authentication/auth.service';
import { routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './authentication/login.component';
import { SignupComponent } from './authentication/signup.component';
import { ProfileComponent } from './authentication/profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateSiteComponent } from './dashboard/create-site/create-site.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    DashboardComponent,
    CreateSiteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(ConfigService.FIREBASE_CONFIG)
  ],
  providers: [AuthService, AuthGuard, GithubService, SiteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
