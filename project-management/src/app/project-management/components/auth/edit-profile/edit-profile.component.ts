import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "../../../../shared/services/auth.service";
import {GeneralState} from "../../../../store/state.model";
import {select, Store} from "@ngrx/store";
import {UserType} from "../../../../shared/types/user-type.model";
import {getUsers} from "../../../../store/actions/users.actions";
import {selectUsers} from "../../../../store/selectors/selectors";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  login: string = localStorage.getItem('userLogin');
  user: UserType | undefined;
  userId: string = '';
  editMode: boolean = false;
  @Input() users: UserType[] = [];
  editForm!: FormGroup;

  constructor(private authService: AuthService,
              private userService: UserService,
              private store: Store<GeneralState>,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    if (this.router.url.includes('editProfile')) {

      this.store.pipe(select(selectUsers)).subscribe(value => {
        this.users = value;
      });

      this.user = this.users.find(user => user.login === this.login);
      this.userId = this.user._id;

      this.editForm = this.fb.group({
        name: [''],
        login: [''],
        password: ['']
      })
    }
  }

  editProfile() {
    this.editMode = true;
  }

  saveChanges() {
    this.userService
      .updateUser(this.userId, this.editForm.value).subscribe();
    localStorage.removeItem('userLogin');
    localStorage.setItem('userLogin', this.editForm.value.login);
  }
}
