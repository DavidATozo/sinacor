import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() textEmpty = 'Nenhum registro encontrado';

  _dataSource: Array<any> = [];

  @Input()
  get dataSource(): Array<any> {
    return this._dataSource;
  }

  set dataSource(value: Array<any>) {
    this._dataSource = value || [];
  }

  @ContentChild('header', { static: false })
  headerTemplateRef!: TemplateRef<any>;

  @ContentChild('body', { static: false })
  bodyTemplateRef!: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
    console.log('dataSource: ', this.dataSource);
  }

}
