import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {BoardService} from "../../../../shared/services/board.service";
import {Store} from "@ngrx/store";
import {BoardType} from "../../../../shared/types/board-type.model";
import {BoardState} from "../../../../store/board-state.model";
import {BoardsActions} from "../../../../store/actions/board.action";

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent implements OnInit {
  createBoardForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private boardService: BoardService,
              private store: Store<BoardState>) {
  }

  ngOnInit(): void {
    this.createBoardForm =this.fb.group({
      title: ['', [Validators.required]],
      owner: ['', [Validators.required]],
      users: [[], [Validators.required]],
      //description: ['', [Validators.required]],
    })
  }

  onCreateBoard(){
    if (this.createBoardForm?.valid) {
      this.boardService
        .createBoard(this.createBoardForm.value)
        .subscribe((data: BoardType) => {
          this.store.dispatch(BoardsActions.addBoard({board: data as BoardType}));
        });

    }
  }

  get title() {
    return this.createBoardForm!.get('title');
  }

}
