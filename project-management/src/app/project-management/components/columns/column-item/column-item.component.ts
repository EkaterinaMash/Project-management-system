import {Component, OnInit} from '@angular/core';
import {Input} from "@angular/core";
import {Subject} from "rxjs";
import {ColumnType} from "../../../../shared/types/column-type.model";
import {GeneralState} from "../../../../store/state.model";
import {Store} from "@ngrx/store";
import {selectColumn} from "../../../../store/selectors/selectors";
import {Router} from "@angular/router";

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss']
})
export class ColumnItemComponent implements OnInit{
  //unsubscribe$ = new Subject<void>();

  @Input() columns: ColumnType[] | undefined;

  columns$ = this.store.select(selectColumn);

  constructor(private store: Store<GeneralState>,
              private router: Router) {
  }

  ngOnInit() {
    if (this.router.url.includes('columns')) {
      this.columns$.subscribe(columns => {
        if (columns)  {
          console.log(300, [...columns]);
          this.columns = [...columns];
          console.log('columns ' + JSON.stringify(this.columns));
        }
      });
    }
    console.log('columns ' + this.columns);
    }
}
