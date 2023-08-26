import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {BoardService} from "../../../../shared/services/board.service";
import {Store} from "@ngrx/store";
import {BoardType} from "../../../../shared/types/board-type.model";
import {BoardState} from "../../../../store/board-state.model";
import {addNewBoard} from "../../../../store/actions/board.action";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent implements OnInit {
  createBoardForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private boardService: BoardService,
              private store: Store<BoardState>,
              private dialogRef: MatDialogRef<CreateBoardComponent>) {
  }

  ngOnInit(): void {
    const user = localStorage.getItem('userLogin');

    this.createBoardForm = this.fb.group({
      title: ['',
        [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      owner: [user],
      users: [[user]],
    })
  }

  onSubmit() {
    if (this.createBoardForm?.valid) {
      this.boardService
        .createBoard(this.createBoardForm.value)
        .subscribe((data: BoardType) => {
          this.store.dispatch(addNewBoard({newBoard: data}));
        });
    }
    this.dialogRef.close();
  }
}
