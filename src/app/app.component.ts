/**********************************************************************************************
Code generated with MKL Plug-in version: 60.0.1
Copyright: Kerubin - kerubin.platform@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { Router, NavigationEnd } from '@angular/router';
import { Component } from '@angular/core';
import { AnalyticsService } from './analitycs/analytics.service';
import { AuthService } from './security/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Kerubin';
  urls = ['/home', '/login', '/newaccount', '/confirmaccount', '/forgotpassword', '/changepasswordforgotten'];
  constructor(
    private router: Router,
    private analitycs: AnalyticsService,
    private auth: AuthService
    ) {
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
    return !exists && this.auth.isLoginValid();
  }

  getRouterOutletCssClass(): string {
    let result = 'ui-g-12 ui-fluid ui-md-10';
    if (!this.canShowMenu()) {
      result = 'ui-g-12 ui-fluid ui-md-12';
    }

    return result;
  }

}

