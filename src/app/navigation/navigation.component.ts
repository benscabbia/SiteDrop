import { AuthService } from './../authentication/auth.service';
import { AppSettings } from './../Shared/appSettings';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  title: string = AppSettings.APP_NAME;
  isAuthenticated = false;
  private subscription: Subscription;

  constructor(private authService: AuthService) {
    this.subscription = this.authService.isAuthenticated().subscribe(
      (authStatus) => this.isAuthenticated = authStatus
    );
  }

  ngOnInit() {
  }

  isAuth() {
    return this.isAuthenticated;
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
