/**********************************************************************************************
Code generated with MKL Plug-in version: 3.6.2
Code generated at time stamp: 2019-06-05T06:41:33.812
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { AuthService } from './../security/auth.service';
import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../security/logout.service';
import { MessageHandlerService } from '../core/message-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  isMenuShowing = false;

  constructor(
	private authService: AuthService,
	private logoutService: LogoutService,
	private messageHandler: MessageHandlerService,
	private router: Router
  ) { }

  ngOnInit() {


  }

  getCurrentUserName() {
      if (this.authService.getCurrentUserName()) {
        return this.authService.getCurrentUserName();
      } else {
        return 'Desconhecido';
      }
  }

  getCurrentUserNameFirstLetter(): string {
    const name: string = this.getCurrentUserName();
    if (name) {
      return name.substr(0, 1).toUpperCase();
    }
  }

  logout() {
      this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.messageHandler.showError(error);
      });
  }

}

