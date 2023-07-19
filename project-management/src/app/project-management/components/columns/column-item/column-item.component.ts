import { Component } from '@angular/core';
import {Input} from "@angular/core";
import {Subject} from "rxjs";
import {ColumnType} from "../../../../shared/types/column-type.model";
import {GeneralState} from "../../../../store/state.model";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss']
})
export class ColumnItemComponent {
  unsubscribe$ = new Subject<void>();

  @Input() column: ColumnType | undefined;

 // selectedBoardId$ = this.store.select(getSelectedBoardId);
  name = 'Title';
  boardId = '';

  constructor(private store: Store<GeneralState>) {
  }


}
