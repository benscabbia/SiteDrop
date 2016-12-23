import { AuthService } from './../authentication/auth.service';
import { SiteService } from './site.service';
import { Site } from './site.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  sites: Site[];

  constructor(private siteService: SiteService, private authService: AuthService) { }

  ngOnInit() {

    console.log('INSIDE Dashboard Component -----------------');
    if (!this.authService.getProfileFromMemory()) {
      this.authService.getProfile().subscribe(
        profile => console.log('Profile Loaded in dashboard from db'),
        error => console.log('Error Loading Profile from db')
      );
    }else {
      console.log('Profile already loaded, using memory version');
    }

    // this.siteService.getSites().subscribe(
    //   (sites) => this.sites = sites,
    //   (error) => console.log(error)
    // );
  }

}
