import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent {

  constructor(private router: Router) {
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['main']);
  }
}
