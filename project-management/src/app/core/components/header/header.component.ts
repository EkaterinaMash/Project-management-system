import { Component } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  logged: boolean = false;
  burgerOpened: boolean = false;

  constructor(private authService: AuthService) {
  }
  checkUserLogged() : boolean {
    return this.authService.isLoggedIn;
  }

  burgerMenuToggle() {
    this.burgerOpened = !this.burgerOpened;
  }
}
