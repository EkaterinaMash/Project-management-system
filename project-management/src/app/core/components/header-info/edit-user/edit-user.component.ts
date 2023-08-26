import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {getUsers} from "../../../../store/actions/users.actions";
import {GeneralState} from "../../../../store/state.model";
import {Store} from "@ngrx/store";
import {UserService} from "../../../../shared/services/user.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit{
  constructor(private router: Router,
              private store: Store<GeneralState>,
              private authService: AuthService,
              private userService: UserService) {
  }

  ngOnInit() {
  }
  openProfile() {
    this.userService
      .getUsers()
      .subscribe(users => {
        this.store.dispatch(getUsers({users}));
        this.router.navigate(['editProfile']);
      });
  }
}
