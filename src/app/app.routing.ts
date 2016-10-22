import { LoginComponent } from './authentication/login.component';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';


const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },

];

export const routing = RouterModule.forRoot(APP_ROUTES);