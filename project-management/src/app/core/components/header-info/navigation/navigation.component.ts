import { Component } from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isLoggedIn$: Observable<boolean>;
}
