import { AnalyticsService } from './../analitycs/analytics.service';
import { AuthService } from './../security/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {


  constructor(
    private router: Router,
    private auth: AuthService,
    private analitycs: AnalyticsService
  ) {

  }
  goToFacebook() {
    this.analitycs.sendGTag('/goToFacebook');
    window.open('https://www.facebook.com/Kerubin-105876074403139', '_black');
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToNewAccount() {
    this.router.navigate(['/newaccount']);
  }

}
