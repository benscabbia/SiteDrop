import { Observable } from 'rxjs/Rx';
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

  constructor(private siteService: SiteService) { }

  ngOnInit() {
    this.siteService.getSites().subscribe(
      (sites) => this.sites = sites,
      (error) => console.log(error)
    );
  }

}
