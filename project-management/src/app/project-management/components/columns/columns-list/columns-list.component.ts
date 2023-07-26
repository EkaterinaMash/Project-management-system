import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ColumnType} from "../../../../shared/types/column-type.model";
import {GeneralState} from "../../../../store/state.model";
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {ColumnService} from "../../../../shared/services/column.service";
import {getColumns} from "../../../../store/actions/column.actions";
import {selectBoardColumns} from "../../../../store/selectors/selectors";
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-columns-list',
  templateUrl: './columns-list.component.html',
  styleUrls: ['./columns-list.component.scss'],
})
export class ColumnsListComponent implements OnInit, OnDestroy {
  @Input() boardId: string
  serviceSub: Subscription;
  columns: ColumnType[] = []
  draggedColumns: ColumnType[] = [];
  dragged: boolean = false;
  columnBody: ColumnType[] = [];

  constructor(private store: Store<GeneralState>,
              private router: Router,
              private columnService: ColumnService) {

  }

  ngOnInit() {
    this.serviceSub = this.columnService
      .getColumns(this.boardId)
      .subscribe((columns) => {
        this.store.dispatch(getColumns({columns}));
        this.store
          .pipe(select(selectBoardColumns))
          .subscribe(value => {
            this.columns = value
          });
        this.draggedColumns = this.columns.slice().sort((a, b) => a.order - b.order);
      });
  }

  deleteColumn(deletedColumn: ColumnType) {
    const columnIndex = this.draggedColumns.indexOf(deletedColumn);
    this.draggedColumns.splice(columnIndex, 1);
  }

  drop(event: CdkDragDrop<ColumnType[]>) {
    moveItemInArray(this.draggedColumns, event.previousIndex, event.currentIndex);
    this.dragged = true;
  }

  ngOnDestroy() {
    if (this.serviceSub) {
      if (this.dragged && this.draggedColumns.length) {
        this.draggedColumns.forEach((column, index) => {
          let currentColumn : ColumnType = {};
          currentColumn.order = index;
          currentColumn._id = column._id;
          this.columnBody.push(currentColumn);
        });
        this.columnService.updateColumnsSet(this.columnBody).subscribe();
      }
      this.serviceSub.unsubscribe();
    }
  }
}
