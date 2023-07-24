import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  logOut() {
    this.authService.logout();
  }
}
