import {Component, OnInit} from '@angular/core';
import {Input} from "@angular/core";
import {Subject} from "rxjs";
import {ColumnType} from "../../../../shared/types/column-type.model";
import {GeneralState} from "../../../../store/state.model";
import {select, Store} from "@ngrx/store";
import {selectColumn} from "../../../../store/selectors/selectors";
import {Router} from "@angular/router";

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss']
})
export class ColumnItemComponent implements OnInit{

  constructor(private store: Store<GeneralState>,
              private router: Router) {
  }

  ngOnInit() {

    }
}
