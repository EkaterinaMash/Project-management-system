import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "../../../../shared/services/auth.service";
import {GeneralState} from "../../../../store/state.model";
import {select, Store} from "@ngrx/store";
import {UserType} from "../../../../shared/types/user-type.model";
import {selectUsers} from "../../../../store/selectors/selectors";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../shared/services/user.service";
import {Router} from "@angular/router";
import {ModalComponent} from "../../../../shared/components/modal/modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  login: string = localStorage.getItem('userLogin');
  user: UserType | undefined;
  currentUser: UserType | undefined;
  userId: string = '';
  editMode: boolean = false;
  delete: boolean = true;
  @Input() users: UserType[] = [];
  editForm!: FormGroup;

  constructor(private authService: AuthService,
              private userService: UserService,
              private store: Store<GeneralState>,
              private fb: FormBuilder,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    if (this.router.url.includes('editProfile')) {

      this.store.pipe(select(selectUsers)).subscribe(value => {
        this.users = value;
      });

      this.user = this.users.find(user => user.login === this.login);
      this.userId = this.user._id;
      this.currentUser = Object.assign({}, this.user);

      this.editForm = this.fb.group({
        name: ['',
          [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
        login: ['',
          [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
        password: ['',
          [Validators.required, Validators.minLength(7), Validators.maxLength(15)]]
      })
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    this.userService.updateUser(this.userId, this.editForm.value).subscribe();
    localStorage.removeItem('userLogin');
    localStorage.setItem('userLogin', this.editForm.value.login);
    this.currentUser.name = this.editForm.value.name;
    this.toggleEditMode();
  }

  deleteUser() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {title: this.user.name, item: 'user'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.delete = result.data;
      if (this.delete) {
        this.authService.logout();
        this.userService.deleteUser(this.user._id).subscribe()
      }
    })
  }
}
