import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ColumnType} from "../../../../shared/types/column-type.model";
import {GeneralState} from "../../../../store/state.model";
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {ColumnService} from "../../../../shared/services/column.service";
import {changeColumnsOrder, clearTasks, getColumns} from "../../../../store/actions/column.actions";
import {selectBoardColumns} from "../../../../store/selectors/selectors";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Subscription} from "rxjs";
import {CreateColumnComponent} from "../create-column/create-column.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-columns-list',
  templateUrl: './columns-list.component.html',
  styleUrls: ['./columns-list.component.scss'],
})
export class ColumnsListComponent implements OnInit, OnDestroy {
  @Input() boardId: string;
  columnsSubscription: Subscription;
  columns: ColumnType[] = [];
  columnsBody: ColumnType[] = [];
  dragged: boolean = false;

  constructor(private store: Store<GeneralState>,
              private router: Router,
              private columnService: ColumnService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.columnsSubscription = this.columnService
      .getColumns(this.boardId)
      .subscribe((columns) => {
        this.store.dispatch(getColumns({columns}));
        this.store
          .pipe(select(selectBoardColumns))
          .subscribe(value => {
            this.columns = value.slice().sort((a, b) => a.order - b.order);
          });
      });
  }

  formColumnsBody(column, index) {
    const currentColumn: ColumnType = {};
    currentColumn.order = index;
    currentColumn._id = column._id;
    this.columnsBody.push(currentColumn);
  }

  deleteColumn(deletedColumnOrder: number) {
    this.columns.splice(deletedColumnOrder, 1);
    if (deletedColumnOrder !== this.columns.length - 1) {
      for (let i = deletedColumnOrder; i < this.columns.length; i++) {
        this.formColumnsBody(this.columns[i], i);
      }
    }
    if (this.columnsBody.length) this.columnService.updateColumnsSet(this.columnsBody).subscribe();
    this.columnsBody = [];
  }

  dropColumn(event: CdkDragDrop<ColumnType[]>) {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);

    const changedColumns = JSON.parse(JSON.stringify(this.columns));
    if (previousIndex < currentIndex) {
      for (let i = previousIndex; i < changedColumns.length; i++) {
        changedColumns[i].order = i;
      }
    }
    if (currentIndex < previousIndex) {
      for (let i = currentIndex; i < changedColumns.length; i++) {
        changedColumns[i].order = i;
      }
    }
    this.store.dispatch(changeColumnsOrder({changedColumns}));
    this.dragged = true;
  }

  createColumn() {
    const dialogRef = this.dialog.open(CreateColumnComponent, {
      width: '300px',
      height: '300px',
      data: {boardId: this.boardId}
    });
    dialogRef.afterClosed().subscribe();
  }

  ngOnDestroy() {
    if (this.columnsSubscription) {
      if (this.dragged && this.columns.length) {
        this.columns.forEach((column, index) => {
          this.formColumnsBody(column, index);
        });
        this.columnService.updateColumnsSet(this.columnsBody).subscribe();
      }
      this.store.dispatch(clearTasks());
      this.columnsSubscription.unsubscribe();
    }
  }
}
