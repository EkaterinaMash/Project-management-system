import {Component, OnInit} from '@angular/core';
import {Input} from "@angular/core";
import {ColumnType} from "../../../../shared/types/column-type.model";
import {GeneralState} from "../../../../store/state.model";
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {setSelectedColumn} from "../../../../store/actions/column.actions";
import {ColumnService} from "../../../../shared/services/column.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../../../../shared/components/modal/modal.component";
import {CommonService} from "../../../../shared/services/common.service";

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss']
})
export class ColumnItemComponent implements OnInit {
  @Input() column: ColumnType | undefined;
  delete: boolean = false;

  constructor(private store: Store<GeneralState>,
              private router: Router,
              private columnService: ColumnService,
              private dialog: MatDialog,
              private commonService: CommonService) {
  }

  ngOnInit() {
  }

  deleteColumn() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {title: this.column.title, item: 'column'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.delete = result.data;
      if (this.delete) this.columnService.deleteColumn(this.column.boardId, this.column._id).subscribe();
    })
  }
}
