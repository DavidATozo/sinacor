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
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DialogEditCashFlowComponent } from './dialog-edit-cash-flow/dialog-edit-cash-flow.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    GridComponent,
    CellComponent,
    ContainerComponent,
    CashFlowComponent,
    DialogEditCashFlowComponent,
    SnackBarComponent,
    DateFilterComponent
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
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    GridComponent,
    CellComponent,
    ContainerComponent,
    CashFlowComponent,
    DialogEditCashFlowComponent,
    SnackBarComponent,
    DateFilterComponent
  ]
})
export class BaseComponentsModule { }
