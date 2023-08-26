import {Component} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  loggedOut: boolean = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  clickStart() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['boards']);
    } else {
      this.loggedOut = true;
    }
  }
}
