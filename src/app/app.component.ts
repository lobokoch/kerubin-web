/**********************************************************************************************
Code generated with MKL Plug-in version: 60.0.1
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { Router, NavigationEnd, NavigationStart, NavigationCancel } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import { AnalyticsService } from './analitycs/analytics.service';
import { AuthService } from './security/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  loading = true;
  title = 'Kerubin';
  urls = ['/home', '/login', '/newaccount', '/confirmaccount', '/forgotpassword', '/changepasswordforgotten'];
  constructor(
    private router: Router,
    private analitycs: AnalyticsService,
    private auth: AuthService
    ) {
      this.loading = true;
		// For Google Analitycs
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				analitycs.sendGTag(event.urlAfterRedirects);
			}
		});
  }

  canShowMenu() {
    const url = this.router.url.toLowerCase();
    const exists = this.urls.some(it => url.includes(it));
    return !exists && this.auth.isLoggedIn();
  }

  getRouterOutletCssClass(): string {
    let result = 'ui-g-12 ui-fluid ui-md-10';
    if (!this.canShowMenu()) {
      result = 'ui-g-12 ui-fluid ui-md-12';
    }

    return result;
  }

  ngAfterViewInit() {
    this.router.events
        .subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.loading = true;
            } else if (
                event instanceof NavigationEnd ||
                event instanceof NavigationCancel
                ) {
                this.loading = false;
            }
        });
}

}

