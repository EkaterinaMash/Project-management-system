import {Component, Input, OnInit} from '@angular/core';
import {ColumnType} from "../../../../shared/types/column-type.model";
import {GeneralState} from "../../../../store/state.model";
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {ColumnService} from "../../../../shared/services/column.service";
import {getColumns} from "../../../../store/actions/column.actions";
import {selectBoardColumns, selectColumn} from "../../../../store/selectors/selectors";

@Component({
  selector: 'app-columns-list',
  templateUrl: './columns-list.component.html',
  styleUrls: ['./columns-list.component.scss'],
})
export class ColumnsListComponent implements OnInit {
  @Input() boardId: string
  columns: ColumnType[] = []

  constructor(private store: Store<GeneralState>,
              private router: Router,
              private columnService: ColumnService) {

  }

  ngOnInit() {
    this.columnService
      .getColumns(this.boardId)
      .subscribe((columns) => {
        this.store.dispatch(getColumns({columns}));
        this.recieveColumns();
        console.log(this.columns);
      });
  }

  recieveColumns() {
    this.store
      .pipe(select(selectBoardColumns))
      .subscribe(value => {this.columns = value});
  }
}
