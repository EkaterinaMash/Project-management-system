import { Component, Input } from '@angular/core';
import {ColumnItem} from "../../intefaces/interfaces";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-columns-list',
  templateUrl: './columns-list.component.html',
  styleUrls: ['./columns-list.component.scss'],
})
export class ColumnsListComponent {
  @Input() columnList: ColumnItem[] | null = []

  constructor() {
  }

}
