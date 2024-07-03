import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import { GridComponent } from './grid/grid.component';
import { CellComponent } from './grid/cell.component';
import { ContainerComponent } from './grid/container.component';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TableComponent } from './table/table.component';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    GridComponent,
    CellComponent,
    ContainerComponent,
    CashFlowComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CurrencyMaskModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [
    GridComponent,
    CellComponent,
    ContainerComponent,
    CashFlowComponent,
    TableComponent
  ]
})
export class BaseComponentsModule { }
