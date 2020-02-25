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
    private auth: AuthService
  ) {

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
